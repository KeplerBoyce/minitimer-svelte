<script lang="ts">
  import { session } from "$lib/state";
  import { msToString, getNSolves, getAdjustedTime, dateToString } from "$lib/helpers";
  import DivideY from "./general/DivideY.svelte";
  import type { Solve, AoN } from "$lib/types";
  import ColoredTag from "./general/ColoredTag.svelte";

  let {
    index, // Index of this solve in current session solves array
    isPbSingle,
    isPbAo5,
    deleteSolve, // Callback to delete this solve
  }: {
    index: number,
    isPbSingle: boolean,
    isPbAo5: boolean,
    deleteSolve: () => void,
  } = $props();

  let solve = $derived($session.solves[index]);

  const getTimeString = () => {
    if (solve.timeMod === "None") {
      return msToString(solve.time);
    } else if (solve.timeMod === "+2") {
      return `${msToString(solve.time + 2000)} (${msToString(solve.time)} + 2)`;
    }
    return `DNF (${msToString(solve.time)})`;
  }

  // Gets N time objects for printing average of N info
  const getNTimes = (n: number) => {
    const nSolves = getNSolves($session.solves, index, n);
    if (!nSolves) {
      return {
        average: "",
        times: [],
      };
    }

    let minSoFar = Infinity;
    let minIndex = 0;
    let maxSoFar = -Infinity;
    let maxIndex = 0;

    for (let i = 0; i < n; i++) {
      const time = getAdjustedTime(nSolves[i]);
      if (time < minSoFar) {
        minSoFar = time;
        minIndex = i;
      }
      if (time > maxSoFar) {
        maxSoFar = time;
        maxIndex = i;
      }
    }

    let total = 0;
    for (let i = 0; i < n; i++) {
      if (i === minIndex || i === maxIndex) continue;
      total += getAdjustedTime(nSolves[i]);
    }

    return {
      average: msToString(total / (n - 2)),
      times: nSolves.map((x: Solve, i: number) => {
        const timeStr = msToString(getAdjustedTime(x));
        if (i === minIndex || i === maxIndex) {
          return {
            time: timeStr,
            outlier: true,
          };
        }
        return {
          time: timeStr,
          outlier: false,
        };
      }).reverse()
    };
  }

  let ao5Times = $derived<AoN>(getNTimes(5));
  let ao12Times = $derived<AoN>(getNTimes(12));
</script>

<div class="flex flex-wrap items-center gap-1">
  <h3 class="font-bold whitespace-nowrap mr-2">
    Solve {$session.solves.length - index}
  </h3>
  {#if isPbSingle}
    <ColoredTag
      color="bg-sky-500"
      textColor="text-white"
      text="PB Single"
    />
  {/if}
  {#if isPbAo5}
    <ColoredTag
      color="bg-sky-500"
      textColor="text-white"
      text="PB Ao5"
    />
  {/if}
</div>
<p class="text-xl mb-1">
  {getTimeString()}
</p>
<p>
  {solve.scramble}
</p>
{#if solve.timestamp}
  <p class="text-sm">
    Solved on {dateToString(solve.timestamp)}
  </p>
{/if}

<DivideY />

<h4 class="text-sm font-bold">
  Average of 5
</h4>
<div class="flex flex-wrap gap-2">
  <p class="mr-4">
    {ao5Times.average ? `${ao5Times.average}:` : "N/A"}
  </p>
  {#each ao5Times.times as ao5Time}
    <p>
      {#if ao5Time.outlier}
        ({ao5Time.time})
      {:else}
        {ao5Time.time}
      {/if}
    </p>
  {/each}
</div>

<h4 class="text-sm font-bold pt-2">
  Average of 12
</h4>
<div class="flex flex-wrap gap-x-2">
  <p class="mr-4">
    {ao12Times.average ? `${ao12Times.average}:` : "N/A"}
  </p>
  {#each ao12Times.times as ao12Time}
    <p>
      {#if ao12Time.outlier}
        ({ao12Time.time})
      {:else}
        {ao12Time.time}
      {/if}
    </p>
  {/each}
</div>

<DivideY />

<button
  class="whitespace-nowrap bg-red-500 text-white font-bold text-sm px-2 py-1 rounded-lg"
  onclick={deleteSolve}
>
  Delete
</button>
