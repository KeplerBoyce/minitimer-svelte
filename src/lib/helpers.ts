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

export const getAdjustedTime = (solve: Solve) => {
  return solve.time + (solve.timeMod === "+2" ? 2000 : 0);
}

const removeOutliers = (times: number[]) => {
  const n = times.length;
  const numOutliers = getNumOutliers(n);
  return times.sort().slice(numOutliers, n - 2 * numOutliers + 1);
}

const getNumOutliers = (n: number) => {
  if (n <= 3) {
    return 0;
  } else if (n <= 20) {
    return 1;
  }
  return Math.floor(n / 20);
}

export const getNSolves = (solves: Solve[], index: number, n: number) => {
  if (index + n > solves.length) {
    return undefined;
  }
  return solves.slice(index, index + n);
}

export const avgOfN = (solves: Solve[], index: number, n: number) => {
  if (index + n > solves.length) {
    return undefined;
  }
  return Math.floor(removeOutliers(solves
    .slice(index, index + n)
    .map(a => a.time + (a.timeMod === "+2" ? 2000 : 0)))
    .reduce((a, b) => a + b)
    / (n - 2 * getNumOutliers(n)));
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
