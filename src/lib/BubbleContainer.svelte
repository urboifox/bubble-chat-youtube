<script lang="ts">
  import { onMount } from "svelte";
  import Bubble from "./Bubble.svelte";
  import {
    messages,
    updateMessage,
    getLastMessage,
    createNewMessage,
    removeLastMessage,
  } from "./messagesStore";
  import { options } from "./optionsStore";

  let bubbles: HTMLDivElement;

  onMount(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const lastMessage = getLastMessage();
      if (event.key === "Enter" && !event.shiftKey) {
        if (lastMessage?.editing) {
          updateMessage(lastMessage.id, { editing: false });
        }
        return;
      }

      if (event.key === "Escape") {
        if (lastMessage?.editing) {
          removeLastMessage();
        }
        return;
      }

      if (!lastMessage?.editing && event.key.length === 1) {
        createNewMessage();
      }
    };

    addEventListener("keydown", handleKeyDown);
    return () => {
      removeEventListener("keydown", handleKeyDown);
    };
  });
</script>

<div class="bubble-container" dir={$options.dir}>
  <div class="bubbles" bind:this={bubbles}>
    {#each $messages as message (message.id)}
      <Bubble editable={message.editing} />
    {/each}
  </div>
</div>

<style>
  .bubble-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    gap: 0.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .bubbles {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 2rem;
  }
</style>
