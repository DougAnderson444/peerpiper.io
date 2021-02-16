<script>
    import { onMount } from "svelte";
    import QRCode from "./QRCode.svelte";

    // stores
    import { hypnsNode, myInstance } from "../js/stores.js";

    let publicKey = "";
    let contacts = [];
    let recent = "";
    let newFaveColor = "";
    let lastEntry = "";

    $: !!$myInstance ? init() : null;

    fetch("https://geut-webrtc-signal-v3.herokuapp.com/", {
        method: "GET",
        mode: "no-cors",
    });

    const init = async () => {
        setupInstance($myInstance);
        if (!(await postIt()) && !!lastEntry)
            $myInstance.once("update", () => {
                postIt();
            });
    };

    const getInstance = async (publicKey) => {
        try {
            const inst = await $hypnsNode.open({ keypair: { publicKey } }); // works with or without a PublicKey
            await inst.ready();
            return inst;
        } catch (error) {
            console.error(error);
        }
    };

    function setupInstance(nameInstance) {
        console.log("Setting up", nameInstance.publicKey);
        const showLatest = (val) => {
            if (nameInstance.latest && nameInstance.latest.text) {
                lastEntry = nameInstance.latest.text;
                console.log("showLatest ", nameInstance.latest.text);
                recent += `<br/>${nameInstance.publicKey}: ${nameInstance.latest.text}`;
            }
        };

        contacts = [...contacts, nameInstance];
        console.log("Showing latest ", nameInstance.latest);
        showLatest(nameInstance.latest);
        nameInstance.on("update", showLatest);
    }

    const addPublicKey = async () => {
        console.log("addPublicKey", publicKey);
        try {
            const newFriend = await getInstance(publicKey);
            setupInstance(newFriend);
            publicKey = "";
        } catch (error) {
            console.error(error);
        }
    };

    function handleUpdate() {
        $myInstance.publish({ text: newFaveColor });
        lastEntry = newFaveColor;
        newFaveColor = "";
    }

    const postIt = async () => {
        const body = {
            rootKey: $myInstance.publicKey,
        };

        const data = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        };

        try {
            const res = await fetch("/api/post", data);
            if (res.ok) {
                const r = await res.json();
                console.log("Response from superpeer", r.latest);
                return r.latest && r.latest.text === lastEntry;
            } else {
                console.log("[FAIL] NOT posted to super peer");
                return false;
            }
        } catch (error) {
            console.log(error);
            console.log("[FAIL] NOT posted to super peer");
            return false;
        }
    };
</script>

<div>
    <br />
    <QRCode value={$myInstance.publicKey} />
    <hr />
    <div>
        <form class="form" on:submit|preventDefault={handleUpdate}>
            Enter anything here to share with your connections:
            <br />
            <input type="text" bind:value={newFaveColor} />
        </form>
    </div>
    <div>
        <form class="form" on:submit|preventDefault={addPublicKey}>
            Paste you're friend's publicKey below to follow updates:
            <br />
            <input type="text" bind:value={publicKey} />
            <br />
            {publicKey}
            <br />
        </form>
    </div>
    <br />
    <p>List of your contacts:</p>
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
