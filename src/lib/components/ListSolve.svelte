<script lang="ts">
  import { msToString, avgOfN } from "$lib/helpers";
  import { sessions, chosenSession, session, pbSingles, pbAo5s } from "$lib/state";
  import Popover from "./general/Popover.svelte";
  import DeductionPopover from "./DeductionPopover.svelte";
  import PbPopover from "./PbPopover.svelte";
  import SolveOptions from "./SolveOptions.svelte";

  let {
    index, // Index inside solves array of chosen session
  }: {
    index: number,
  } = $props();

  let solveHovered = $state(false); // True when this ListSolve is hovered
  let popoverHovered = $state(false); // True when this solve's info popover is hovered
  let popoverOpen = $state(false); // True when this solve's info popover is open

  let solve = $derived($session.solves[index]); // Solve object
  let ao5 = $derived(avgOfN($session.solves, index, 5)); // ao5 (ms)
  let isPbSingle = $derived($pbSingles[index]); // True if this is a PB single
  let isPbAo5 = $derived($pbAo5s[index]); // True if this is a PB Ao5

  // Used for setting pbs derived state
  const getPbs = () => {
    const pbs = [];
    if (isPbSingle) pbs.push(1);
    if (isPbAo5) pbs.push(5);
    return pbs;
  }

  let pbs = $derived(getPbs()); // Array of values of N for which this is a PB AoN

  const deleteSolve = () => {
    popoverOpen = false;
    $sessions[$chosenSession].solves.splice(index, 1);
    $sessions = $sessions;
  }
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div class="flex">
  <button
    class="flex items-center"
    onclick={() => {
      popoverOpen = !popoverOpen;
    }}
    onmouseover={() => {
      solveHovered = true;
    }}
    onmouseout={() => {
      solveHovered = false;
    }}
  >
    <div class={`w-full flex justify-end hover:bg-slate-100 ${popoverOpen ? "bg-slate-100" : ""} font-mono text-right text-lg rounded-lg`}>
      <p class={`min-w-20 mr-4 ${isPbAo5 ? "text-sky-500" : ""}`}>
        {ao5 ? msToString(ao5) : "-"}
      </p>
      <p class={`min-w-20 mr-1 ${isPbSingle ? "text-sky-500" : ""}`}>
        {solve.timeMod === "DNF" ? "DNF" : msToString(solve.time + (solve.timeMod === "+2" ? 2000 : 0))}
      </p>
    </div>
    <div class="relative">
      <div class="absolute -top-3 left-3 flex gap-1">
        {#if pbs.length > 0}
          <PbPopover pbs={pbs} />
        {/if}
        {#if solve.timeMod !== "None"}
          <DeductionPopover solve={solve} />
        {/if}
      </div>
    </div>
  </button>
  <Popover open={popoverOpen}>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="absolute -top-2 left-1 min-w-96 bg-white p-2 pt-1 z-[60] rounded-lg border border-black"
      onmouseover={() => {
        solveHovered = true;
      }}
      onmouseout={() => {
        solveHovered = false;
      }}
    >
      <SolveOptions
        index={index}
        isPbSingle={isPbSingle}
        isPbAo5={isPbAo5}
        deleteSolve={deleteSolve}
      />
    </div>
  </Popover>
</div>

<svelte:window
  on:click={() => {
    if (!solveHovered && !popoverHovered) {
      popoverOpen = false;
    }
  }}
/>
