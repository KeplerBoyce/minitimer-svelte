<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    button,
    popover,
  }: {
    button: Snippet,
    popover: Snippet,
  } = $props();

  let open = $state(false);
  let locked = $state(false);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions, a11y_mouse_events_have_key_events, a11y_click_events_have_key_events -->
<div class="relative">
  <div
    onmouseover={() => {
      open = true;
    }}
    onmouseout={() => {
      open = false;
    }}
    onclick={() => {
      if (open) {
        locked = true;
      }
    }}
  >
    {@render button()}
  </div>
  {#if open || locked}
    {@render popover()}
  {/if}
</div>
<svelte:window
  on:click={() => {
    if (!open) {
      locked = false;
    }
  }}
/>
