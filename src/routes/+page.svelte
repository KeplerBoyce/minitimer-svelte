<script lang="ts">
  import AverageInfo from "$lib/components/AverageInfo.svelte";
  import FloatingSessionOptions from "$lib/components/FloatingSessionOptions.svelte";
  import Scramble from "$lib/components/Scramble.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Timer from "$lib/components/Timer.svelte";
  import TimerOptions from "$lib/components/TimerOptions.svelte";
</script>

<div class="p-4 pl-0 w-full h-full flex">
  <div class="w-72">
    <Sidebar />
  </div>
  <div class="grow min-w-min w-full lg:min-w-[735px] h-full flex flex-col justify-center items-center">
    <div class="h-1/5 flex flex-col gap-4 items-center">
      <Scramble />
      <FloatingSessionOptions />
    </div>
    <div class="grow flex flex-col justify-center items-center">
      <Timer />
      <TimerOptions />
    </div>
    <div class="h-1/5 flex items-end">
      <AverageInfo />
    </div>
  </div>
  <div class="w-0 lg:w-72 h-full shrink"></div>
</div>
