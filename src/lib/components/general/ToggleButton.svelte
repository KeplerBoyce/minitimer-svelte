<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    content,
    on = false,
    canDeselect, // True = allows us to click again to deselect
    callback,
  }: {
    content: Snippet<[boolean]>,
    on: boolean,
    canDeselect?: boolean,
    callback: () => void,
  } = $props();

  // Call callback if we just turned the button on, only deselect if it is allowed
  const toggle = () => {
    if (!on) {
      on = true;
      callback();
    } else if (canDeselect) {
      on = false;
    }
  }
</script>

<button
  class="rounded-lg overflow-hidden border border-black"
  onclick={toggle}
  onkeydown={(e) => {e.preventDefault()}}
>
  {@render content(on)}
</button>
