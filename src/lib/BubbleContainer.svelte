<script lang="ts">
  import { onMount } from "svelte";
  import Bubble from "./Bubble.svelte";
  import {
    messages,
    updateMessage,
    getLastMessage,
    createNewMessage,
  } from "./messagesStore";
  import { options } from "./optionsStore";

  onMount(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const lastMessage = getLastMessage();
      const lastMessageElement = event.target as HTMLDivElement;

      if (event.key === "Enter" && !event.shiftKey) {
        if (lastMessageElement.innerText.length <= 0) {
          event.preventDefault();
        } else if (lastMessage?.editing) {
          updateMessage(lastMessage.id, { editing: false });
          createNewMessage();
        }
        return;
      }

      if (event.key === "Backspace") {
        if (lastMessage?.editing && lastMessageElement.innerText.length <= 1) {
          updateMessage(lastMessage.id, { visible: false });
        }
        return;
      }

      if (event.key.length === 1) {
        if (!lastMessage?.editing) {
          createNewMessage();
        } else {
          updateMessage(lastMessage.id, { visible: true });
        }
      }
    };

    addEventListener("keydown", handleKeyDown);
    return () => {
      removeEventListener("keydown", handleKeyDown);
    };
  });
</script>

<div class="bubble-container" dir={$options.dir}>
  <div class="bubbles">
    {#each $messages as message (message.id)}
      <Bubble editable={message.editing} visible={message.visible} />
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
