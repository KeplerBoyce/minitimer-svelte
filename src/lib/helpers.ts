import type { Solve } from "./types";


export const msToString = (ms: number) => {
  const hours = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const hundredths = Math.floor((ms % 1000) / 10);
  
  let str = "";
  if (hours) {
    str += `${hours}:`;
  }
  if (mins) {
    if (hours) {
      if (mins > 9) {
        str += `${mins}:`;
      } else {
        str += `0${mins}:`;
      }
    } else {
      str += `${mins}:`;
    }
  } else if (hours) {
    str += "00:";
  }
  if (secs) {
    if (mins) {
      if (secs > 9) {
        str += `${secs}.`;
      } else {
        str += `0${secs}.`;
      }
    } else {
      str += `${secs}.`;
    }
  } else if (mins || hours) {
    str += "00.";
  } else {
    str += "0.";
  }
  if (hundredths > 9) {
    str += `${hundredths}`;
  } else {
    str += `0${hundredths}`;
  }
  return str;
}

export const avgOfN = (solves: Solve[], index: number, n: number) => {
  if (index + n > solves.length) {
    return undefined;
  }
  return Math.floor(solves
    .slice(index, index + n)
    .map(a => a.time + (a.timeMod === "+2" ? 2000 : 0))
    .reduce((a, b) => a + b)
    / n);
}

export const getAvgInfo = (solves: Solve[], index: number) => {
  return {
    ao5: avgOfN(solves, index, 5),
    ao12: avgOfN(solves, index, 12),
    ao100: avgOfN(solves, index, 100),
  };
}

export const getPbAvgsOfN = (solves: Solve[], n: number) => {
  let pbs = Array(solves.length).fill(false);
  let bestSoFar = Infinity;
  for (let i = solves.length - n; i >= 0; i--) {
    const aoN = avgOfN(solves, i, n);
    if (aoN && aoN < bestSoFar) {
      pbs[i] = true;
      bestSoFar = aoN;
    }
  }
  return pbs;
}
