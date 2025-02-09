<script lang="ts">
  import { msToString, avgOfN, getAdjustedTime } from "$lib/helpers";
  import { session, pbSingles, pbAo5s, popoverIndex, hoveredIndex } from "$lib/state";

  let {
    index, // Index inside solves array of chosen session
  }: {
    index: number,
  } = $props();

  let ao5 = $derived(avgOfN($session.solves, index, 5)); // ao5 (ms)
  let isPbSingle = $derived($pbSingles[index]); // True if this is a PB single
  let isPbAo5 = $derived($pbAo5s[index]); // True if this is a PB Ao5
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div class="flex">
  <button
    class="flex items-center"
    onclick={() => {
      if ($popoverIndex === index) {
        $popoverIndex = undefined;
      } else {
        $popoverIndex = index;
      }
    }}
    onmouseover={() => {
      $hoveredIndex = index;
    }}
    onmouseout={() => {
      $hoveredIndex = undefined;
    }}
  >
    <div class={`w-full flex justify-end items-center ${$popoverIndex === index ? "bg-amber-200" : "hover:bg-amber-100"} font-mono text-right text-lg rounded-lg`}>
      <p class="min-w-10 text-sm mr-1">
        {$session.solves.length - index}
      </p>
      <p class={`min-w-20 mr-4 ${isPbAo5 ? "text-sky-500" : ""}`}>
        {ao5 ? msToString(ao5) : "-"}
      </p>
      <p class={`min-w-20 mr-1 ${isPbSingle ? "text-sky-500" : ($session.solves[index].timeMod !== "None" ? "text-red-500" : "")}`}>
        {$session.solves[index].timeMod === "DNF" ? "DNF" : msToString(getAdjustedTime($session.solves[index]))}
      </p>
    </div>
  </button>
</div>

