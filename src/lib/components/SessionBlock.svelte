<script lang="ts">
  import { session } from "$lib/state";
  import { getGlobalMean, getStandardDeviation, msToString } from "$lib/helpers";
  import DivideY from "./general/DivideY.svelte";
  import TimeTable from "./TimeTable.svelte";
</script>

<div class="flex flex-col border border-black rounded-lg px-2 py-1">
  <div class="flex gap-2 justify-center items-center">
    <h3 class="font-bold">
      Session:
    </h3>
    <button class="bg-slate-200 rounded-lg px-2 py-1">
      {$session.name}
    </button>
  </div>
  <DivideY />

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
        {msToString(getGlobalMean($session.solves))}
      </p>
    </div>
    <div class="flex flex-col items-center">
      <h4 class="font-bold text-sm">
        Std. Dev.
      </h4>
      <p>
        {msToString(getStandardDeviation($session.solves))}
      </p>
    </div>
  </div>
  <DivideY />

  <TimeTable />
  <DivideY />
</div>
