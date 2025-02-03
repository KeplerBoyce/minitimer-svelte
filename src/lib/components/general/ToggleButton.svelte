<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    content,
    defaultOn, // True = begins as on
    canDeselect, // True = allows us to click again to deselect
    callback,
  }: {
    content: Snippet<[boolean]>,
    defaultOn?: boolean,
    canDeselect?: boolean,
    callback: () => void,
  } = $props();

  let on = $state(defaultOn);

  // Call callback if we just turned the button on, only deselect if it is allowed
  const toggle = () => {
    if (!on) {
      on = true;
      callback();
    } else if (canDeselect) {
      on = false;
    }
  }

  // To allow some other component to deselect this button automatically
  export const clear = () => {
    on = false;
  }
</script>

<button
  class="rounded-lg overflow-hidden border border-black"
  onclick={toggle}
>
  {@render content(on)}
</button>
