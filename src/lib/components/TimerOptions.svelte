<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import ToggleButton from "./general/ToggleButton.svelte";
  import { sessions, chosenSession, session, timerOption } from "$lib/state";

  // Bindings for the toggle buttons to allow each one to deselect the others on click
  let noneBinding: SvelteComponent;
  let plus2Binding: SvelteComponent;
  let dnfBinding: SvelteComponent;
</script>

<div class="flex flex-col gap-2 items-center">
  <p class="italic">
    Previous solve deductions:
  </p>
  <div class="flex gap-2">
    <ToggleButton bind:this={noneBinding} on={$timerOption === 0} callback={() => {
      $timerOption = 0;
      if ($session.solves[0]) {
        $sessions[$chosenSession].solves[0].timeMod = "None";
        $sessions = $sessions;
      }
    }}>
      {#snippet content(on)}
        <p class={`px-2 py-1 transition ${on ? "bg-purple-300" : "bg-slate-100"}`}>
          None
        </p>
      {/snippet}
    </ToggleButton>

    <ToggleButton bind:this={plus2Binding} on={$timerOption === 1} callback={() => {
      $timerOption = 1;
      if ($session.solves[0]) {
        $sessions[$chosenSession].solves[0].timeMod = "+2";
        $sessions = $sessions;
      }
    }}>
      {#snippet content(on)}
        <p class={`px-2 py-1 transition ${on ? "bg-purple-300" : "bg-slate-100"}`}>
          +2
        </p>
      {/snippet}
    </ToggleButton>

    <ToggleButton bind:this={dnfBinding} on={$timerOption === 2} callback={() => {
      $timerOption = 2;
      if ($session.solves[0]) {
        $sessions[$chosenSession].solves[0].timeMod = "DNF";
        $sessions = $sessions;
      }
    }}>
      {#snippet content(on)}
        <p class={`px-2 py-1 transition ${on ? "bg-purple-300" : "bg-slate-100"}`}>
          DNF
        </p>
      {/snippet}
    </ToggleButton>
  </div>
</div>
