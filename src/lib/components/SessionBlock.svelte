<script lang="ts">
  import { session } from "$lib/state";
  import { getGlobalMean, getStandardDeviation, msToString } from "$lib/helpers";
  import DivideY from "./general/DivideY.svelte";
  import TimeTable from "./TimeTable.svelte";

  let globalMean = $derived(getGlobalMean($session.solves));
  let stdDev = $derived(getStandardDeviation($session.solves));
</script>

<div class="flex flex-col border border-black rounded-lg px-2 py-1">
  <div class="flex gap-2 justify-evenly items-center">
    <div class="flex flex-col items-center">
      <h4 class="font-bold text-sm">
        Solves
      </h4>
      <p>
        {$session.solves.length}
      </p>
    </div>
    <div class="flex flex-col items-center">
      <h4 class="font-bold text-sm">
        Global Mean
      </h4>
      <p>
        {globalMean === undefined ? "N/A" : msToString(globalMean)}
      </p>
    </div>
    <div class="flex flex-col items-center">
      <h4 class="font-bold text-sm">
        Std. Dev.
      </h4>
      <p>
        {stdDev === undefined ? "N/A" : msToString(stdDev)}
      </p>
    </div>
  </div>
  <DivideY />

  <TimeTable />
</div>
