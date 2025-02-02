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
