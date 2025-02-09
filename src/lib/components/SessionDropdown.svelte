<script lang="ts">
  import { session } from "$lib/state";
  import { CUBE_TYPES } from "$lib/consts";
  import Dropdown from "./general/Dropdown.svelte";
</script>

<Dropdown>
  {#snippet buttonContent(open)}
    <div class={`border border-black rounded-lg min-w-16 px-2 ${open ? "bg-emerald-200" : "bg-slate-100 hover:bg-emerald-100"}`}>
      {$session.name}
    </div>
  {/snippet}
  {#snippet dropdownContent(close)}
    <div class="flex flex-col bg-slate-100 border border-black rounded-lg shadow-lg overflow-hidden">
      {#each CUBE_TYPES as cubeType, i}
        <button
          class={`px-2 py-0.5 text-left hover:bg-emerald-100 ${i < CUBE_TYPES.length - 1 ? "border-b border-black" : ""}`}
          onclick={() => {
            close();
          }}
        >
          {cubeType}
        </button>
      {/each}
    </div>
  {/snippet}
</Dropdown>
