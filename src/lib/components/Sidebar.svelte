<script lang="ts">
  import { sessions, chosenSession, session, pbSingles, pbAo5s, popoverIndex, hoveredIndex } from "$lib/state";
  import { getAvgInfo, getPbAvgOfNSolves } from "$lib/helpers";
  import ListSolve from "$lib/components/ListSolve.svelte";
  import Popover from "./general/Popover.svelte";
  import SolveOptions from "./SolveOptions.svelte";

  let popoverHovered = $state(false);
  let sessionPbSingle = $derived(getPbAvgOfNSolves($session.solves, 1));
  let sessionPbAo5 = $derived(getPbAvgOfNSolves($session.solves, 5));
  let sessionPbAo12 = $derived(getPbAvgOfNSolves($session.solves, 12));

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
  <div class="flex flex-col gap-2 min-h-0">
    <div class="flex flex-col border border-black rounded-lg px-2 py-1">
      <div class="flex gap-2 justify-center items-center">
        <h3 class="font-bold">
          Session:
        </h3>
        <button class="bg-slate-200 rounded-lg px-2 py-1">
          {$session.name}
        </button>
      </div>

      <h4 class="font-bold text-sm">
        Solves
      </h4>
      <p class="mb-2">
        {$session.solves.length}
      </p>

      <h4 class="font-bold text-sm">
        PB Single
      </h4>
      <p class="mb-2">
        {sessionPbSingle ? `${sessionPbSingle.timeStr} (solve ${sessionPbSingle.index})` : "N/A"}
      </p>

      <h4 class="font-bold text-sm">
        PB Average of 5
      </h4>
      <p class="mb-2">
        {sessionPbAo5 ? `${sessionPbAo5.timeStr} (solve ${sessionPbAo5.index})` : "N/A"}
      </p>

      <h4 class="font-bold text-sm">
        PB Average of 12
      </h4>
      <p class="">
        {sessionPbAo12 ? `${sessionPbAo12.timeStr} (solve ${sessionPbAo12.index})` : "N/A"}
      </p>
    </div>

    <div class="flex min-h-0">
      <div class="grow border border-black rounded-lg flex flex-col shadow-lg min-h-0">
        <div class="flex font-bold text-right border-b border-black pr-2">
          <h3 class="min-w-10 mr-1">
            #
          </h3>
          <h3 class="min-w-20 mr-4">
            Ao5
          </h3>
          <h3 class="min-w-20">
            Time
          </h3>
        </div>

        <div class="overflow-y-auto pr-2">
          {#if $session.solves.length > 0}
            {#each $session.solves as _, i}
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
          <div class="absolute top-0 left-4 min-w-96 bg-white p-2 pt-1 z-[60] rounded-lg border border-black shadow-lg">
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
</div>

<svelte:window
  on:click={() => {
    if (!popoverHovered && $hoveredIndex === undefined) {
      $popoverIndex = undefined;
    }
  }}
/>
