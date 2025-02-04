<script lang="ts">
  import HoverPopover from "./general/HoverPopover.svelte";
  import MdiStarOutline from '~icons/mdi/star-outline'

  let {
    pbs, // List of n values that this is a PB AoN for
  }: {
    pbs: number[],
  } = $props();

  const getAoNString = (n: number) => {
    if (n === 1) {
      return "single";
    }
    return `Ao${n}`
  }

  const getPbsString = () => {
    if (pbs.length === 1) {
      return `New PB ${getAoNString(pbs[0])}!`;
    } else if (pbs.length === 2) {
      return `New PB ${getAoNString(pbs[0])} and ${getAoNString(pbs[1])}!`;
    }
    let str = "New PB ";
    for (let i = 0; i < pbs.length - 1; i++) {
      str += `getAoNString(pbs[i]), `;
    }
    return str + `and ${getAoNString(pbs[pbs.length - 1])}!`;
  }
</script>

<HoverPopover>
  {#snippet icon()}
    <div class="w-6 h-6 rounded-full border border-black flex justify-center items-center">
      <MdiStarOutline style="color: #0ea5e9" />
    </div>
  {/snippet}
  {#snippet popover()}
    <div class="absolute top-0 left-7 z-50 bg-white border border-black rounded-lg whitespace-nowrap px-2 font-sans text-base">
      <p class="text-sky-500">
        {getPbsString()}
      </p>
    </div>
  {/snippet}
</HoverPopover>
