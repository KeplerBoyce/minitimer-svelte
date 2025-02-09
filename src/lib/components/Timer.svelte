<script lang="ts">
  import { scramble, sessions, chosenSession, session, timerOption } from "$lib/state";
  import { CUBE_TYPE_MAP, SG } from "$lib/consts";

  let running = $state(false); // True while timer is running
  let holding = $state(false); // True when spacebar is held
  let ready = $state(false); // True when spacebar is held long enough to begin timer
  let stopped = $state(false); // True when the spacebar is held to stop the timer

  let startTime = $state(0); // Start time (unix timestamp)
  let currTime = $state(0); // Current time (unix timestamp)
  let stopTime = $state(0); // Stop time (unix timestamp)

  let timeoutId = $state(0); // ID for spacebar holding timeout

  const genScramble = () => {
    $scramble = SG.setType(CUBE_TYPE_MAP[$session.cube]).get(1)[0].scramble_string;
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (holding || stopped) {
      return;
    }
    if (running) {
      running = false;
      stopped = true;
      holding = true;
      // Reset selected timer option to "none"
      $timerOption = 0;
      // Add solve to session
      stopTime = Date.now();
      $sessions[$chosenSession].solves = [{
        scramble: $scramble,
        time: stopTime - startTime,
        timeMod: "None",
      }, ...$sessions[$chosenSession].solves];
      genScramble();
      return;
    }
    if (e.key === ' ') {
      holding = true;
    }
  }

  const onKeyUp = (e: KeyboardEvent) => {
    if (stopped) {
      stopped = false;
      holding = false;
    }
    if (e.key === ' ') {
      holding = false;
    }
  }

  // Set timer as ready when spacebar is held long enough
  $effect(() => {
    if (holding && !stopped) {
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

<p class={`text-7xl font-mono transition ${holding ? ready ? "text-green-500" : "text-red-500" : ""}`}>
  {(((running ? currTime : stopTime) - startTime) / 1000).toFixed(2)}
</p>

<svelte:window
  on:keydown={onKeyDown}
  on:keyup={onKeyUp}
/>
