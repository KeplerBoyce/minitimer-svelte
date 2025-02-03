<script lang="ts">
  import type { Solve } from "$lib/types";
  import { msToString } from "$lib/helpers";

  let {
    solve, // Solve object
    info, // Additional info: ao5, ao12, ao100 in ms
  }: {
    solve: Solve,
    info: {
      ao5: number | undefined,
      ao12: number | undefined,
      ao100: number | undefined,
    },
  } = $props();
  const {
    ao5,
  } = $derived(info);
</script>

<button>
  <div class="w-full flex gap-4 justify-end border rounded-lg px-2 hover:bg-slate-100 font-mono text-right text-lg">
    <p class="min-w-16">
      {ao5 ? msToString(ao5) : "-"}
    </p>
    <p class="min-w-16">
      {msToString(solve.time)}
    </p>
  </div>
</button>
