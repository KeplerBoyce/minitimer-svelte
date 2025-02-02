<script lang="ts">
  import { sessions, chosenSession } from "$lib/state";
    import ListSolve from "./ListSolve.svelte";
</script>

<div class="w-72 h-full rounded-xl border shadow-xl p-4">
  <h2 class="font-bold text-center text-xl mb-2">
    Solves
  </h2>
  <div class="w-full flex flex-col-reverse ">
    {#each $sessions[$chosenSession].solves as solve}
      <ListSolve solve={solve} />
    {/each}
  </div>
</div>
