<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import ToggleButton from "./general/ToggleButton.svelte";

  let noneBinding: SvelteComponent;
  let plus2Binding: SvelteComponent;
  let dnfBinding: SvelteComponent;
</script>

<div class="flex gap-2">
  <ToggleButton bind:this={noneBinding} defaultOn callback={() => {
    plus2Binding.clear();
    dnfBinding.clear();
  }}>
    {#snippet content(on)}
      <p class={`px-2 py-1 transition ${on ? "bg-purple-300" : "bg-slate-100"}`}>
        None
      </p>
    {/snippet}
  </ToggleButton>

  <ToggleButton bind:this={plus2Binding} callback={() => {
    noneBinding.clear();
    dnfBinding.clear();
  }}>
    {#snippet content(on)}
      <p class={`px-2 py-1 transition ${on ? "bg-purple-300" : "bg-slate-100"}`}>
        +2
      </p>
    {/snippet}
  </ToggleButton>

  <ToggleButton bind:this={dnfBinding} callback={() => {
    noneBinding.clear();
    plus2Binding.clear();
  }}>
    {#snippet content(on)}
      <p class={`px-2 py-1 transition ${on ? "bg-purple-300" : "bg-slate-100"}`}>
        DNF
      </p>
    {/snippet}
  </ToggleButton>
</div>
