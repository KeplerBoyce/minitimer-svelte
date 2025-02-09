<script lang="ts">
  import { session } from "$lib/state";
  import { getGlobalMean, getStandardDeviation, msToString } from "$lib/helpers";
  import DivideY from "./general/DivideY.svelte";
  import TimeTable from "./TimeTable.svelte";
  import SessionDropdown from "./SessionDropdown.svelte";
  import PuzzleDropdown from "./PuzzleDropdown.svelte";
  import MaterialSymbolsSettingsOutlineRounded from "~icons/material-symbols/settings-outline-rounded";
  import Popover from "./general/Popover.svelte";
  import SessionOptions from "./SessionOptions.svelte";

  let settingsOpen = $state(false);
</script>

<div class="flex flex-col border border-black rounded-lg px-2 py-1">
  <div class="flex gap-2 justify-center items-center">
    <div class="flex flex-col items-center">
      <h3 class="font-bold text-sm">
        Session
      </h3>
      <SessionDropdown />
    </div>

    <div class="flex flex-col items-center">
      <h3 class="font-bold text-sm">
        Puzzle
      </h3>
      <PuzzleDropdown />
    </div>

    <div class="grow flex justify-end">
      <button
        class="w-8 h-8 flex justify-center items-center"
        onclick={() => {
          settingsOpen = !settingsOpen;
        }}
      >
        <MaterialSymbolsSettingsOutlineRounded
          class={`transition ${settingsOpen ? "rotate-60" : "rotate-0"}`}
          style="font-size: 30px"
        />
      </button>
      <Popover open={settingsOpen}>
        <div class="absolute top-0 left-6 bg-white border border-black rounded-lg p-2">
          <SessionOptions
            close={() => {
              settingsOpen = false;
            }}
          />
        </div>
      </Popover>
    </div>
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
</div>
