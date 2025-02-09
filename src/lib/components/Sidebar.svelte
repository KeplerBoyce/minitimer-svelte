<script lang="ts">
  import { sessions, chosenSession, session, pbSingles, pbAo5s, popoverIndex, hoveredIndex } from "$lib/state";
  import ListSolve from "$lib/components/ListSolve.svelte";
  import Popover from "./general/Popover.svelte";
  import SolveOptions from "./SolveOptions.svelte";
  import SessionBlock from "./SessionBlock.svelte";

  let popoverHovered = $state(false);

  const deleteSolve = (index: number) => {
    $popoverIndex = undefined;
    $sessions[$chosenSession].solves.splice(index, 1);
    $sessions = $sessions;
  }
</script>

<div class="w-min h-full flex flex-col rounded-xl border border-black shadow-xl p-2 pl-8 -translate-x-6">
  <div class="flex flex-col gap-2 min-h-0">
    <SessionBlock />

    <div class="flex min-h-0">
      <div class="grow border border-black rounded-lg flex flex-col min-h-0">
        <div class="flex font-bold text-right border-b border-black pr-2">
          <h3 class="min-w-10 mr-1">
            #
          </h3>
          <h3 class="min-w-20 mr-4">
            Ao5
          </h3>
          <h3 class="min-w-20 mr-1">
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
          <!-- svelte-ignore a11y_no_static_element_interactions, a11y_mouse_events_have_key_events -->
          <div
            class="absolute top-0 left-4 min-w-96 bg-white p-2 pt-1 z-[60] rounded-lg border border-black shadow-lg"
            onmouseenter={() => {
              popoverHovered = true;
            }}
            onmouseleave={() => {
              popoverHovered = false;
            }}
          >
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
