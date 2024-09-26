<script lang="ts">
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { shiftMessages } from "./messagesStore";
  import { options } from "./optionsStore";

  export let editable: boolean = false;
  export let visible: boolean = false;
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
  data-rtl={$options.dir === "rtl"}
  class="bubble"
  class:visible
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
    position: relative;
    color: #111;
    width: max-content;
    max-width: 500px;
    border-radius: 0.6rem;
    line-height: 1.5;
    word-break: break-word;
    font-size: 1.5rem;
    font-weight: 400;
    padding: 0.4rem 0.8rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-bottom-left-radius: 0;
  }

  .bubble[data-rtl="true"] {
    border-top-right-radius: 0;
    border-bottom-left-radius: 0.6rem;
  }

  .visible {
    opacity: 1;
  }

  .bubble:focus {
    outline: none;
  }
</style>
