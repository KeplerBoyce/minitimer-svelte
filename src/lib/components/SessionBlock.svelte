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
  let buttonHovered = $state(false);
  let popoverHovered = $state(false);

  let globalMean = $derived(getGlobalMean($session.solves));
  let stdDev = $derived(getStandardDeviation($session.solves));
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
      <!-- svelte-ignore a11y_mouse_events_have_key_events -->
      <button
        class="w-8 h-8 flex justify-center items-center"
        onclick={() => {
          settingsOpen = !settingsOpen;
        }}
        onmouseover={() => {
          buttonHovered = true;
        }}
        onmouseout={() => {
          buttonHovered = false;
        }}
      >
        <MaterialSymbolsSettingsOutlineRounded
          class={`transition ${settingsOpen ? "rotate-60" : "rotate-0"}`}
          style="font-size: 30px"
        />
      </button>
      <Popover open={settingsOpen}>
        <!-- svelte-ignore a11y_no_static_element_interactions, a11y_mouse_events_have_key_events -->
        <div
          class="absolute top-0 left-6 bg-white border border-black rounded-lg p-2"
          onmouseover={() => {
            popoverHovered = true;
          }}
          onmouseout={() => {
            popoverHovered = false;
          }}
        >
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

<svelte:window
  on:click={() => {
    if (!popoverHovered && !buttonHovered) {
      settingsOpen = false;
    }
  }}
/>
