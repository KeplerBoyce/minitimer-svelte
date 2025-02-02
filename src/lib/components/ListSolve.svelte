<script lang="ts">
  import type { Solve } from "$lib/types";
  import { msToString } from "$lib/helpers";

  let {
    solve, // Solve object
  }: {
    solve: Solve,
  } = $props();
</script>

<button>
  <div class="w-full flex justify-end border rounded-lg px-2 hover:bg-slate-100">
    <p class="font-mono text-right text-lg">
      {msToString(solve.time)}
    </p>
  </div>
</button>
