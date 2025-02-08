<script lang="ts">
  import { sessions, chosenSession, pbSingles, pbAo5s, popoverIndex, hoveredIndex } from "$lib/state";
  import ListSolve from "$lib/components/ListSolve.svelte";
  import { getAvgInfo } from "$lib/helpers";
  import Popover from "./general/Popover.svelte";
  import SolveOptions from "./SolveOptions.svelte";

  let popoverHovered = $state(false);

  const deleteSolve = (index: number) => {
    $popoverIndex = undefined;
    $sessions[$chosenSession].solves.splice(index, 1);
    $sessions = $sessions;
  }
</script>

<div class="w-min h-full flex flex-col rounded-xl border border-black shadow-xl p-2 pl-8 -translate-x-6">
  <h2 class="font-bold text-center text-xl mb-2">
    Solves
  </h2>
  <div class="flex min-h-0">
    <div class="grow border border-black rounded-lg flex flex-col">
      <div class="flex font-bold text-right border-b border-black pr-2">
        <h3 class="min-w-20 mr-4">
          Ao5
        </h3>
        <h3 class="min-w-20 mr-1">
          Time
        </h3>
      </div>
      <div class="overflow-y-auto pr-2">
        {#if $sessions[$chosenSession].solves.length > 0}
          {#each $sessions[$chosenSession].solves as _, i}
            <ListSolve index={i} />
          {/each}
        {:else}
          <p class="text-center italic">
            No solves yet!
          </p>
        {/if}
      </div>
    </div>
    <div class="relative">
      <Popover open={$popoverIndex !== undefined}>
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="absolute top-0 left-4 min-w-96 bg-white p-2 pt-1 z-[60] rounded-lg border border-black">
          <SolveOptions
            index={$popoverIndex}
            isPbSingle={$pbSingles[$popoverIndex]}
            isPbAo5={$pbAo5s[$popoverIndex]}
            deleteSolve={() => deleteSolve($popoverIndex)}
          />
        </div>
      </Popover>
    </div>
  </div>
</div>

<svelte:window
  on:click={() => {
    if (!popoverHovered && $hoveredIndex === undefined) {
      $popoverIndex = undefined;
    }
  }}
/>
