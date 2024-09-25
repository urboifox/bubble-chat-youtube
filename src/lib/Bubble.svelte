<script lang="ts">
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { shiftMessages } from "./messagesStore";

  export let editable: boolean = false;
  export let isLast: boolean = false;
  let bubble: HTMLDivElement;

  $: if (!editable) {
    setTimeout(() => {
      shiftMessages();
    }, 15000);
  }

  onMount(() => {
    bubble.focus();
  });
</script>

<div
  class="bubble"
  class:isLast
  out:fade
  in:slide
  contenteditable={editable}
  spellcheck={false}
  bind:this={bubble}
  on:blur={() => {
    bubble.focus();
  }}
  on:animationend={() => {
    bubble.style.minHeight = "1lh";
  }}
/>

<style>
  .bubble {
    background-color: #fff;
    color: #000;
    width: max-content;
    max-width: 500px;
    border-radius: 0.6rem;
    font-family: "Cairo", sans-serif;
    word-break: break-word;
    font-size: 1.5rem;
    font-weight: 400;
    border-bottom-left-radius: 0;
    padding: 0.4rem 0.8rem;
  }

  .bubble:focus {
    outline: none;
  }
</style>

