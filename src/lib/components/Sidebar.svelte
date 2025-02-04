<script lang="ts">
  import { sessions, chosenSession } from "$lib/state";
  import ListSolve from "$lib/components/ListSolve.svelte";
  import { getAvgInfo } from "$lib/helpers";

  const getInfo = (index: number) => {
    return getAvgInfo($sessions[$chosenSession].solves, index);
  }
</script>

<div class="w-min h-full rounded-xl border border-black shadow-xl p-2 pl-8 -translate-x-6">
  <h2 class="font-bold text-center text-xl mb-2">
    Solves
  </h2>
  <div class="border border-black rounded-lg">
    <div class="flex font-bold text-right border-b border-black">
      <h3 class="min-w-20 mr-4">
        Ao5
      </h3>
      <h3 class="min-w-20 mr-1">
        Time
      </h3>
    </div>
    <div class="w-full flex flex-col">
      {#each $sessions[$chosenSession].solves as solve, i}
        <ListSolve solve={solve} index={i} info={getInfo(i)} />
      {/each}
    </div>
  </div>
</div>
