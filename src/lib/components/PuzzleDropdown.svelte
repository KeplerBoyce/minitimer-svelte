<script lang="ts">
  import { sessions, chosenSession, session, scramble } from "$lib/state";
  import { CUBE_TYPES, CUBE_TYPE_MAP, SG } from "$lib/consts";
  import Dropdown from "./general/Dropdown.svelte";
</script>

<Dropdown>
  {#snippet buttonContent(open)}
    <div class={`border border-black rounded-lg min-w-16 px-2 ${open ? "bg-fuchsia-200" : "bg-slate-100 hover:bg-fuchsia-100"}`}>
      {$session.cube}
    </div>
  {/snippet}
  {#snippet dropdownContent(close)}
    <div class="flex flex-col bg-slate-100 border border-black rounded-lg shadow-lg overflow-hidden">
      {#each CUBE_TYPES as cubeType, i}
        <button
          class={`px-2 py-0.5 text-left hover:bg-fuchsia-100 ${i < CUBE_TYPES.length - 1 ? "border-b border-black" : ""}`}
          onclick={() => {
            $sessions[$chosenSession].cube = cubeType;
            $scramble = SG.setType(CUBE_TYPE_MAP[cubeType]).get(1)[0].scramble_string;
            close();
          }}
        >
          {cubeType}
        </button>
      {/each}
    </div>
  {/snippet}
</Dropdown>
