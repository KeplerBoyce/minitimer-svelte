<script lang="ts">
  import { session } from "$lib/state";
  import { avgOfN, getAdjustedTime, msToString } from "$lib/helpers";

  const COL_CLASS = "flex flex-col items-center min-w-12";
  const ROW_CLASS = "flex gap-6 justify-center items-center";
  const HEADING_CLASS = "font-bold text-sm";
  const TIME_CLASS = "text-xl";

  const getBPA = () => {
    if ($session.solves.length < 4) {
      return "-";
    }
    const times = $session.solves.slice(0, 4).map(s => getAdjustedTime(s));
    return msToString((times.reduce((a, b) => a + b) - Math.max(...times)) / 3);
  }

  const getWPA = () => {
    if ($session.solves.length < 4) {
      return "-";
    }
    const times = $session.solves.slice(0, 4).map(s => getAdjustedTime(s));
    return msToString((times.reduce((a, b) => a + b) - Math.min(...times)) / 3);
  }

  const getMo3 = () => {
    if ($session.solves.length < 3) {
      return "-";
    }
    return msToString($session.solves
      .slice(0, 3)
      .map(s => getAdjustedTime(s))
      .reduce((a, b) => a + b)
      / 3);
  }

  const getMo3Diff = () => {
    if ($session.solves.length < 4) {
      return undefined;
    }
    const prevMo3 = $session.solves
      .slice(1, 4)
      .map(s => getAdjustedTime(s))
      .reduce((a, b) => a + b)
      / 3;
    return $session.solves
      .slice(0, 3)
      .map(s => getAdjustedTime(s))
      .reduce((a, b) => a + b)
      / 3 - prevMo3;
  }

  const getAoN = (n: number) => {
    const aoN = avgOfN($session.solves, 0, n);
    if (aoN === undefined) {
      return "-";
    }
    return msToString(aoN);
  }

  const getAoNDiff = (n: number) => {
    const prevAoN = avgOfN($session.solves, 1, n);
    if (prevAoN === undefined) {
      return undefined;
    }
    return (avgOfN($session.solves, 0, n) ?? 0) - prevAoN;
  }

  const getDiffClass = (diff: number | undefined) => {
    if (diff === undefined) {
      return "";
    } else if (diff > 0) {
      return "font-bold text-red-500";
    }
    return "font-bold text-emerald-500";
  }

  const getDiffString = (diff: number | undefined) => {
    if (diff === undefined) {
      return "-";
    } else if (diff > 0) {
      return `+${msToString(diff)}`;
    }
      return `-${msToString(-diff)}`;
  }
</script>

<div class="flex flex-col gap-3">
  <div class={ROW_CLASS}>
    <div class={COL_CLASS}>
      <p class={HEADING_CLASS}>
        BPA
      </p>
      <p class={TIME_CLASS}>
        {getBPA()}
      </p>
    </div>

    <div class={COL_CLASS}>
      <p class={HEADING_CLASS}>
        WPA
      </p>
      <p class={TIME_CLASS}>
        {getWPA()}
      </p>
    </div>
  </div>

  <div class={ROW_CLASS}>
    <div class={COL_CLASS}>
      <p class={HEADING_CLASS}>
        Mo3
      </p>
      <p class={TIME_CLASS}>
        {getMo3()}
      </p>
      <p class={getDiffClass(getMo3Diff())}>
        {getDiffString(getMo3Diff())}
      </p>
    </div>

    <div class={COL_CLASS}>
      <p class={HEADING_CLASS}>
        Ao5
      </p>
      <p class={TIME_CLASS}>
        {getAoN(5)}
      </p>
      <p class={getDiffClass(getAoNDiff(5))}>
        {getDiffString(getAoNDiff(5))}
      </p>
    </div>

    <div class={COL_CLASS}>
      <p class={HEADING_CLASS}>
        Ao12
      </p>
      <p class={TIME_CLASS}>
        {getAoN(12)}
      </p>
      <p class={getDiffClass(getAoNDiff(12))}>
        {getDiffString(getAoNDiff(12))}
      </p>
    </div>

    <div class={COL_CLASS}>
      <p class={HEADING_CLASS}>
        Ao50
      </p>
      <p class={TIME_CLASS}>
        {getAoN(50)}
      </p>
      <p class={getDiffClass(getAoNDiff(50))}>
        {getDiffString(getAoNDiff(50))}
      </p>
    </div>

    <div class={COL_CLASS}>
      <p class={HEADING_CLASS}>
        Ao100
      </p>
      <p class={TIME_CLASS}>
        {getAoN(100)}
      </p>
      <p class={getDiffClass(getAoNDiff(100))}>
        {getDiffString(getAoNDiff(100))}
      </p>
    </div>
  </div>
</div>
