<script lang="ts">
  import Scramble from "$lib/components/Scramble.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Timer from "$lib/components/Timer.svelte";
  import TimerOptions from "$lib/components/TimerOptions.svelte";
  import { sg } from "$lib/consts";
  import { scramble } from "$lib/state";

  export const gen3x3 = () => {
    $scramble = sg.get(1)[0].scramble_string;
  }
</script>

<div class="p-4 pl-0 w-full h-full flex">
  <Sidebar />
  <div class="grow h-full flex flex-col justify-center items-center">
    <Scramble />
    <div class="grow flex flex-col justify-center items-center">
      <Timer genScramble={gen3x3} />
      <TimerOptions />
    </div>
  </div>
</div>
