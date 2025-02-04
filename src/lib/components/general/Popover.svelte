<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    open,
    children,
  }: {
    open: boolean,
    children: Snippet,
  } = $props();
</script>

<div class="relative">
  {#if open}
    {@render children()}
  {/if}
</div>
