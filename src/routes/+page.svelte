<script lang="ts">
  import Scramble from "$lib/components/Scramble.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Timer from "$lib/components/Timer.svelte";
  import TimerOptions from "$lib/components/TimerOptions.svelte";
</script>

<div class="p-4 pl-0 w-full h-full flex">
  <div class="w-72 bg-purple-200">
    <Sidebar />
  </div>
  <div class="grow min-w-min lg:min-w-[735px] h-full bg-blue-200 flex flex-col justify-center items-center">
    <Scramble />
    <div class="grow flex flex-col justify-center items-center">
      <Timer />
      <TimerOptions />
    </div>
  </div>
  <div class="w-0 lg:w-72 shrink"></div>
</div>
