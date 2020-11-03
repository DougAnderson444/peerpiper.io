<script>
    import { onMount, onDestroy } from "svelte";

    // bound to parent component, which means the value gets passed from upstream
    export var myInstance;
    export let hypnsNode;

    let publicKey;
    let contacts = [];
    let recent = "";
    let newFaveColor = "";

    onMount(() => {
        setupInstance(myInstance);
    });

    const getInstance = async (publicKey) => {
        const inst = await hypnsNode.open({ keypair: { publicKey } }); // works with or without a PublicKey
        await inst.ready();
        return inst;
    };

    function setupInstance(nameInstance) {
        contacts = [...contacts, nameInstance];
        nameInstance.on("update", (val) => {
            console.log("latest", nameInstance.latest.text);
            recent += `<br/>${nameInstance.publicKey}: ${nameInstance.latest.text}`;
        });
    }

    const handleSubmit = async () => {
        console.log("handleSubmit", publicKey);
        const newFriend = await getInstance(publicKey);
        setupInstance(newFriend);
        publicKey = "";
    };

    function handleUpdate() {
        const ret = myInstance.publish({
            text: "My favorite color is now " + newFaveColor,
        });
        newFaveColor = "";
    }
    const postIt = async () => {
        const body = {
            rootKey: myInstance.publicKey,
        };

        const res = await fetch("/api/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        console.log("POST Response: ", res);
        if (res.ok) {
            console.log("Posted to superpeer");
            return true;
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
    <button on:click|preventDefault={postIt}>
        Post to Super-peer Server
    </button>
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
