<script>
    import { onMount } from "svelte";

    let IPFS;
    let ipfsNode;
    let mounted;
    let nodeId;

    onMount(async () => {
        mounted = true;
        import(/* webpackChunkName: "ipfs-comp" */ "ipfs-core").then(
            (module) => {
                IPFS = module.default;
            }
        );
    });

    $: mounted && IPFS ? open() : null;

    const open = async () => {
        ipfsNode = await IPFS.create();
        const { cid } = await ipfsNode.add("Hello world");
        nodeId = (await ipfsNode.id()).id;
    };
</script>

<style>
    .status {
        font-size: smaller;
        padding: 1em;
        border: rgb(187, 177, 151) 0.01em solid;
        margin: 1em;
    }
</style>

{#if ipfsNode}
    <div class="status">
        <b>IPFS loaded</b>
        <br />NodeId:

        {#await nodeId then nodeId}{nodeId}{/await}
    </div>
{/if}
