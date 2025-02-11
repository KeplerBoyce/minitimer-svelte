<script lang="ts">
  import { sessions, chosenSession, session } from "$lib/state";
  import { DEFAULT_SESSION } from "$lib/consts";
  import DivideY from "./general/DivideY.svelte";

  let {
    close, // Callback for closing session options popover
  }: {
    close: () => void,
  } = $props();

  let inputValue: string = $session.name === "[no name]" ? "" : $session.name;

  const updateSessionName = (name: string) => {
    if (name === "") {
      $sessions[$chosenSession].name = "[no name]"
    } else {
      $sessions[$chosenSession].name = name;
    }
  }

  const createSession = () => {
    $sessions.splice(0, 0, DEFAULT_SESSION);
    $sessions = $sessions;
    $chosenSession = 0;
    close();
  }

  const clearSolves = () => {
    $sessions[$chosenSession].solves = [];
    $sessions = $sessions;
  }

  const deleteSession = () => {
    $sessions.splice($chosenSession, 1);
    $sessions = $sessions;
    if ($chosenSession >= $sessions.length) {
      $chosenSession = $sessions.length - 1;
    }
    close();
  }
</script>

<h2 class="font-bold text-sm whitespace-nowrap mb-1">
  Session Name
</h2>
<input
  type="text"
  bind:value={inputValue}
  oninput={() => {
    updateSessionName(inputValue);
  }}
  class="border border-black rounded-lg px-2 w-full"
>

<h2 class="font-bold text-sm whitespace-nowrap mt-2 mb-1">
  Session Management
</h2>
<button
  class="bg-sky-500 text-white rounded-lg px-2 py-1 font-bold text-sm whitespace-nowrap mb-2"
  onclick={createSession}
>
  Create New
</button>

<p class="italic text-sm text-center whitespace-nowrap mb-1">
  Click and hold to select:
</p>
<div class="flex gap-1 justify-center">
  <button
    class="bg-red-500 text-white rounded-lg px-2 py-1 font-bold text-sm whitespace-nowrap"
    onclick={clearSolves}
  >
    Clear All Solves
  </button>
  <button
    class="bg-red-500 text-white rounded-lg px-2 py-1 font-bold text-sm"
    onclick={deleteSession}
  >
    Delete
  </button>
</div>
