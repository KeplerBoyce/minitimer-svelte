<script lang="ts">
  import type { Solve } from "$lib/types";
  import HoverPopover from "./general/HoverPopover.svelte";
  import { msToString } from "$lib/helpers";
  import MaterialSymbolsFlagOutline from "~icons/material-symbols/flag-outline";

  let {
    solve, // Solve object
  }: {
    solve: Solve,
  } = $props();
</script>

<HoverPopover>
  {#snippet button()}
    <div class="w-6 h-6 rounded-full border border-black flex justify-center items-center">
      <MaterialSymbolsFlagOutline style="color: #ef4444" />
    </div>
  {/snippet}
  {#snippet popover()}
    <div class="absolute top-0 left-7 z-40 bg-white border border-black rounded-lg whitespace-nowrap px-2 font-sans text-base">
      {#if solve.timeMod === "+2"}
        <p class="text-red-500 font-mono">
          {msToString(solve.time)}+2
        </p>
      {:else}
        <p class="text-red-500 font-mono">
          {msToString(solve.time)}
        </p>
      {/if}
    </div>
  {/snippet}
</HoverPopover>
