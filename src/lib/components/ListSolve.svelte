<script lang="ts">
  import { msToString, avgOfN } from "$lib/helpers";
  import { sessions, chosenSession, pbSingles, pbAo5s } from "$lib/state";
  import Popover from "./general/Popover.svelte";
  import DeductionPopover from "./DeductionPopover.svelte";
  import PbPopover from "./PbPopover.svelte";

  let {
    index, // Index inside solves array of chosen session
  }: {
    index: number,
  } = $props();

  let popoverOpen = $state(false);

  let solve = $derived($sessions[$chosenSession].solves[index]);
  let ao5 = $derived(avgOfN($sessions[$chosenSession].solves, index, 5));
  let isPbSingle = $derived($pbSingles[index]);
  let isPbAo5 = $derived($pbAo5s[index]);

  const getPbs = () => {
    const pbs = [];
    if (isPbSingle) pbs.push(1);
    if (isPbAo5) pbs.push(5);
    return pbs;
  }

  const deleteSolve = () => {
    popoverOpen = false;
    $sessions[$chosenSession].solves.splice(index, 1);
    $sessions = $sessions
  }
</script>

<div class="flex">
  <button
    class="flex items-center"
    onclick={() => {
      popoverOpen = !popoverOpen;
      console.log(popoverOpen)
    }}
  >
    <div class={`w-full flex justify-end hover:bg-slate-100 ${popoverOpen ? "bg-slate-100" : ""} font-mono text-right text-lg rounded-lg`}>
      <p class="min-w-20 mr-4">
        {ao5 ? msToString(ao5) : "-"}
      </p>
      <p class="min-w-20 mr-1">
        {solve.timeMod === "DNF" ? "DNF" : msToString(solve.time + (solve.timeMod === "+2" ? 2000 : 0))}
      </p>
    </div>
    <div class="relative">
      <div class="absolute -top-3 left-3 flex gap-1">
        {#if isPbAo5}
          <PbPopover pbs={getPbs()} />
        {/if}
        {#if solve.timeMod !== "None"}
          <DeductionPopover solve={solve} />
        {/if}
      </div>
    </div>
  </button>
  <Popover open={popoverOpen}>
    <div class="absolute -top-2 left-1 bg-white p-2 rounded-lg border border-black">
      <button
        class="whitespace-nowrap bg-red-500 text-white font-bold text-sm px-2 py-1 rounded-lg"
        onclick={deleteSolve}
      >
        Delete
      </button>
    </div>
  </Popover>
</div>
