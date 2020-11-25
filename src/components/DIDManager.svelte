<script>
    import { onMount } from "svelte";
    import { createWallet } from 'did-locker'

    export let hypnsNode; // sent from parent

    var mounted
    let wallet

    onMount(() => {
        mounted = true;
        console.log('DID Manager mounted')
        wallet = loadWallet()
        // wallet.didm.
    });

    const loadWallet = async() => {
        try {
            return await createWallet({ methods: { hyper: hypnsNode } });
        } catch (error) {
            throw error
        }
    }
</script>

<!-- {#if ipfsLoaded}
    <br />
    ipfsLoaded
    <br />
    <svelte:component this={IPFSComp} />
{/if} -->
