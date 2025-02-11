<script lang="ts">
  import SessionDropdown from "./SessionDropdown.svelte";
  import PuzzleDropdown from "./PuzzleDropdown.svelte";
  import MaterialSymbolsSettingsOutlineRounded from "~icons/material-symbols/settings-outline-rounded";
  import Popover from "./general/Popover.svelte";
  import SessionOptions from "./SessionOptions.svelte";

  let settingsOpen = $state(false);
  let buttonHovered = $state(false);
  let popoverHovered = $state(false);
</script>

<div class="flex flex-col gap-1 items-end">
  <h3 class="font-bold text-sm">
    Session
  </h3>
  <SessionDropdown />

  <h3 class="font-bold text-sm mt-2">
    Puzzle
  </h3>
  <PuzzleDropdown />
  <!-- svelte-ignore a11y_mouse_events_have_key_events -->
  <button
    class="w-8 h-8 mt-3 flex justify-center items-center"
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
      class={`transition -z-10 ${settingsOpen ? "rotate-60" : "rotate-0"}`}
      style="font-size: 30px"
    />
  </button>
  <Popover open={settingsOpen}>
    <!-- svelte-ignore a11y_no_static_element_interactions, a11y_mouse_events_have_key_events -->
    <div
      class="absolute top-0 right-0 bg-white border border-black rounded-lg p-2"
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

<svelte:window
  on:click={() => {
    if (!popoverHovered && !buttonHovered) {
      settingsOpen = false;
    }
  }}
/>
