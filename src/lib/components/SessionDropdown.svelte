<script lang="ts">
  import { sessions, chosenSession, session, scramble } from "$lib/state";
  import { CUBE_TYPES, CUBE_TYPE_MAP, SG } from "$lib/consts";
  import Dropdown from "./general/Dropdown.svelte";
</script>

<Dropdown leftSide>
  {#snippet buttonContent(open)}
    <div class={`border border-black rounded-lg min-w-16 max-w-40 px-2 overflow-hidden text-ellipsis ${open ? "bg-emerald-200" : "bg-slate-100 hover:bg-emerald-100"}`}>
      {$session.name}
    </div>
  {/snippet}
  {#snippet dropdownContent(close)}
    <div class="flex flex-col bg-slate-100 border border-black rounded-lg shadow-lg overflow-hidden">
      {#each $sessions as s, i}
        <button
          class={`px-2 py-0.5 text-left max-w-40 text-ellipsis overflow-hidden hover:bg-emerald-100 whitespace-nowrap ${i === $chosenSession ? "bg-emerald-200" : ""} ${i < $sessions.length - 1 ? "border-b border-black" : ""}`}
          onclick={() => {
            $chosenSession = i;
            $scramble = SG.setType(CUBE_TYPE_MAP[$sessions[$chosenSession].cube]).get(1)[0].scramble_string;
            close();
          }}
        >
          {s.name}
        </button>
      {/each}
    </div>
  {/snippet}
</Dropdown>
