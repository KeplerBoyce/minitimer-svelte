<script lang="ts">
  let {
    genScramble, // Scramble generator callback
  }: {
    genScramble: () => void,
  } = $props();

  let running = $state(false); // True while timer is running
  let holding = $state(false); // True when spacebar is held
  let ready = $state(false); // True when spacebar is held long enough to begin timer
  let stopped = $state(false); // True when the spacebar is held to stop the timer

  let startTime = $state(0); // Start time (unix timestamp)
  let currTime = $state(0); // Current time (unix timestamp)

  let timeoutId = $state(0); // ID for spacebar holding timeout

  const onKeyDown = (e: KeyboardEvent) => {
    if (holding || stopped) {
      return;
    }
    if (running) {
      running = false;
      stopped = true;
      genScramble();
    }
    if (e.key === ' ') {
      if (!running) {
        holding = true;
      }
    }
  }

  const onKeyUp = (e: KeyboardEvent) => {
    stopped = false;
    if (e.key === ' ') {
      holding = false;
    }
  }

  // Set timer as ready when spacebar is held long enough
  $effect(() => {
    if (holding) {
      const originalId = window.setTimeout(() => {
        // Prevents issue of releasing and re-holding "bypassing" hold timer
        if (holding && timeoutId === originalId) {
          ready = true;
        }
      }, 350);
      timeoutId = originalId;
    }
  })

  // Make timer begin running when spacebar is released
  $effect(() => {
    if (ready && !holding) {
      running = true;
      ready = false;
    }
  })

  // Begin timer and set interval to update
  $effect(() => {
    if (running) {
      startTime = Date.now();
      currTime = Date.now();
      const intervalId = window.setInterval(() => {
        currTime = Date.now();
        if (!running) {
          window.clearInterval(intervalId);
        }
      }, 33);
    }
  });
</script>

<div class="grow flex justify-center items-center">
  <p class={`text-7xl font-mono transition ${holding ? ready ? "text-green-500" : "text-red-500" : ""}`}>
    {((currTime - startTime) / 1000).toFixed(2)}
  </p>
</div>

<svelte:window
  on:keydown={onKeyDown}
  on:keyup={onKeyUp}
/>
