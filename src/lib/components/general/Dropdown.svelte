<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    buttonContent, // Content inside of button to open dropdown
    dropdownContent, // Content inside the dropdown menu
  }: {
    buttonContent: Snippet<[boolean]>,
    dropdownContent: Snippet<[() => void]>,
  } = $props();

  let open = $state(false);
  let hovered = $state(false);
</script>

<div class="flex flex-col">
  <!-- svelte-ignore a11y_mouse_events_have_key_events -->
  <button
    class="w-full"
    onclick={() => {
      open = !open;
    }}
    onmouseover={() => {
      hovered = true;
    }}
    onmouseout={() => {
      hovered = false;
    }}
  >
    {@render buttonContent(open)}
  </button>
  <div class="relative">
    <div class="min-w-full absolute top-1 left-0">
      {#if open}
        {@render dropdownContent(() => {
          open = false;
        })}
      {/if}
    </div>
  </div>
</div>

<svelte:window
  on:click={() => {
    if (!hovered) {
      open = false;
    }
  }}
/>
