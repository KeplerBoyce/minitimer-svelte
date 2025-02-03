<script lang="ts">
  import { sessions, chosenSession } from "$lib/state";
  import ListSolve from "$lib/components/ListSolve.svelte";
  import { getAvgInfo } from "$lib/helpers";

  const getInfo = (index: number) => {
    return getAvgInfo($sessions[$chosenSession].solves, index);
  }
</script>

<div class="w-min h-full rounded-xl border shadow-xl p-4">
  <h2 class="font-bold text-center text-xl mb-2">
    Solves
  </h2>
  <div class="px-2 flex gap-4 font-bold text-right">
    <h3 class="min-w-16">
      Ao5
    </h3>
    <h3 class="min-w-16">
      Time
    </h3>
  </div>
  <div class="w-full flex flex-col-reverse ">
    {#each $sessions[$chosenSession].solves as solve, i}
      <ListSolve solve={solve} info={getInfo(i)} />
    {/each}
  </div>
</div>
