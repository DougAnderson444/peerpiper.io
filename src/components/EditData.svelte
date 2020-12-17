<script>
    import { onMount, onDestroy } from "svelte";
    import QRCode from "./QRCode.svelte";

    // bound to parent component, which means the value gets passed from upstream
    export var myInstance;
    export let hypnsNode;

    let publicKey;
    let contacts = [];
    let recent = "";
    let newFaveColor = "";
    let lastEntry = "";

    onMount(async () => {
        try {
            await fetch("http://geut-webrtc-signal-v3.herokuapp.com/", {
                method: "GET",
                mode: "no-cors",
            }); // wake it up in advance
        } catch (error) {}
        setupInstance(myInstance);
        if (!(await postIt()) && !!lastEntry) setTimeout(await postIt(), 10000);

        // postIt().then((res) => {
        //     console.log("2. Last Entry is:", lastEntry);
        //     console.log("POST Res is:", res);
        //     if (!!lastEntry && !res) setTimeout(postIt(), 10000);
        // });
    });

    const getInstance = async (publicKey) => {
        try {
            const inst = await hypnsNode.open({ keypair: { publicKey } }); // works with or without a PublicKey
            await inst.ready();
            return inst;
        } catch (error) {
            console.error(error);
        }
    };

    function setupInstance(nameInstance) {
        const showLatest = (val) => {
            if (nameInstance.latest) {
                lastEntry = nameInstance.latest.text;
                console.log("showLatest ", nameInstance.latest.text);
                recent += `<br/>${nameInstance.publicKey}: ${nameInstance.latest.text}`;
            }
        };

        contacts = [...contacts, nameInstance];
        showLatest(nameInstance.latest);
        nameInstance.on("update", showLatest);
    }

    const handleSubmit = async () => {
        console.log("handleSubmit", publicKey);
        try {
            const newFriend = await getInstance(publicKey);
            setupInstance(newFriend);
            publicKey = "";
        } catch (error) {
            console.error(error);
        }
    };

    function handleUpdate() {
        myInstance.publish({ text: newFaveColor });
        lastEntry = newFaveColor;
        newFaveColor = "";
    }

    const postIt = async () => {
        const body = {
            rootKey: myInstance.publicKey,
        };

        const data = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };

        console.log(`Sending`, data);

        const res = await fetch("/api/post", data);
        console.log("POST Response: ", res);
        if (res.ok) {
            const r = await res.json();
            console.log("Response from superpeer", r.latest);
            return r.latest && r.latest.text === lastEntry;
        } else {
            console.log("[FAIL] NOT posted to super peer");
            return false;
        }
    };
</script>

<div>
    Your PublicKey:
    <br />
    {myInstance.publicKey}
    <br />
    <br />
    <QRCode value={myInstance.publicKey} />
    <hr />
    <div>
        <form class="form" on:submit|preventDefault={handleUpdate}>
            Update your favorite color here:
            <br />
            <input type="text" bind:value={newFaveColor} />
        </form>
    </div>
    <hr />
    <div>
        <form class="form" on:submit|preventDefault={handleSubmit}>
            Paste you're friend's publicKey below:
            <br />
            <input type="text" bind:value={publicKey} />
            <br />
            {publicKey}
            <br />
        </form>
    </div>
    <hr />
    <br />
    <br />
    <p>List of contacts:</p>
    <p>
        {#if contacts && contacts.length > 0}
            <ul>
                {#each contacts as contact}
                    <li>{contact.publicKey}</li>
                {/each}
            </ul>
        {/if}
    </p>
    Recent Updates:<br />
    {@html recent}
</div>
