<script lang="ts">
    import Scramble from "$lib/components/Scramble.svelte";
  import Timer from "$lib/components/Timer.svelte";
  import { sg } from "$lib/state.svelte"

  let scramble = $state(sg.get(1)); // Scramble text

  const gen3x3 = () => {
    scramble = sg.get(1);
  }
</script>

<div class="h-full flex flex-col justify-center items-center">
  <Scramble scramble={scramble[0].scramble_string} />
  <Timer genScramble={gen3x3} />
</div>
