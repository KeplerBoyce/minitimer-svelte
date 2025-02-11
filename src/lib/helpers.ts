import type { Solve } from "./types";


export const msToString = (ms: number) => {
  if (ms === Infinity) {
    return "DNF";
  }
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

export const dateToString = (date: Date) => {
  if (date === undefined) {
    return "N/A";
  }
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();

  const dayStr = day < 10 ? `0${day}` : `${day}`;
  const monthStr = month < 10 ? `0${month}` : `${month}`;
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

  let str = `${year}-${monthStr}-${dayStr} at ${(hours - 1) % 12 + 1}:${minutesStr}`;
  if (hours < 12) {
    return `${str}am`;
  }
  return `${str}pm`;
}

export const getAdjustedTime = (solve: Solve) => {
  if (solve.timeMod === "DNF") return Infinity;
  else if (solve.timeMod === "+2") return solve.time + 2000;
  return solve.time;
}

export const getGlobalMean = (solves: Solve[]) => {
  if (solves.length === 0) {
    return undefined;
  }
  return solves
    .map(s => getAdjustedTime(s))
    .reduce((a, b) => a + b)
    / solves.length;
}

export const getStandardDeviation = (solves: Solve[]) => {
  const mean = getGlobalMean(solves);
  if (mean === undefined) {
    return undefined;
  }
  return Math.sqrt(solves
    .map(s => {
      const deviation = getAdjustedTime(s) - mean;
      return deviation*deviation;
    })
    .reduce((a, b) => a + b)
    / solves.length);
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
    .map(a => getAdjustedTime(a)))
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

export const getPbAvgOfNSolves = (solves: Solve[], n: number) => {
  let bestSoFar = Infinity;
  let startIndex = undefined;
  for (let i = solves.length - n; i >= 0; i--) {
    const aoN = avgOfN(solves, i, n);
    if (aoN && aoN < bestSoFar) {
      bestSoFar = aoN;
      startIndex = solves.length - i;
    }
  }
  if (startIndex === undefined) {
    return undefined;
  }
  return {
    time: bestSoFar,
    timeStr: msToString(bestSoFar),
    index: startIndex,
  };
}
