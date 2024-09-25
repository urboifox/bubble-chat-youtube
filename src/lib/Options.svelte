<script lang="ts">
  import { options, switchDirection } from "./optionsStore";
</script>

<div class="options">
  <div class="option">
    <h2>Direction</h2>
    <button on:click={() => switchDirection()}>
      {#if $options.dir === "ltr"}
        RTL
      {:else}
        LTR
      {/if}
    </button>
  </div>
</div>

<style>
  .options {
    position: fixed;
    top: 1rem;
    right: 1rem;
    gap: 1rem;
    padding: 2rem;
    display: flex;
    flex-flow: column-reverse wrap;
  }

  .option {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  button {
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    background-color: #fff;
    transition: background-color 0.2s ease-in-out;
    padding: 0.5rem 1rem;
  }

  button:hover {
    background-color: #eee;
  }
</style>
