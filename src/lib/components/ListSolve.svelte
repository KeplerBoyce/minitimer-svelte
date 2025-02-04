<script lang="ts">
  import type { Solve } from "$lib/types";
  import { msToString, avgOfN } from "$lib/helpers";
  import { sessions, chosenSession, pbSingles, pbAo5s } from "$lib/state";
  import DeductionPopover from "./DeductionPopover.svelte";
  import PbPopover from "./PbPopover.svelte";

  let {
    solve, // Solve object
    index, // Index inside solves array of chosen session
  }: {
    solve: Solve,
    index: number,
  } = $props();

  let ao5 = $derived(avgOfN($sessions[$chosenSession].solves, index, 5));
  let isPbSingle = $derived($pbSingles[index]);
  let isPbAo5 = $derived($pbAo5s[index]);

  const getPbs = () => {
    const pbs = [];
    if (isPbSingle) pbs.push(1);
    if (isPbAo5) pbs.push(5);
    return pbs;
  }
</script>

<button class="flex items-center">
  <div class="w-full flex justify-end hover:bg-slate-100 font-mono text-right text-lg rounded-lg">
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
