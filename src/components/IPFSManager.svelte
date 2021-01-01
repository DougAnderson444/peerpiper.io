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
        console.info(cid);
        nodeId = (await ipfsNode.id()).id;
    };
</script>

{#if ipfsNode}<br />IPFS-core created{/if}
{#if ipfsNode}
    <br />NodeId:
    {#await nodeId then nodeId}{nodeId}{/await}
{/if}
