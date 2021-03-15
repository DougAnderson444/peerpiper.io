<script>
  import { fade } from "svelte/transition";
  import * as QRCode from "qrcode";
  export let value;

  let canvas;
  let visible = false;

  async function showQR() {
    if (!value || !canvas) return;
    QRCode.toCanvas(canvas, value); // Draws qr code symbol to canvas.
    visible = true;
  }
</script>

<span
  on:mouseover={() => {
    showQR();
  }}
>
  [Hover to show QR Code]
</span>
<br />

<canvas
  hidden={!visible}
  transition:fade
  on:mousemove={() => {
    visible = false;
  }}
  bind:this={canvas}
  width={32}
  height={32}
/>
<br />

<style>
  canvas {
    position: absolute;
    border: 1px solid black;
    z-index: 1;
  }
  span {
    display: inline-block;
  }
</style>
