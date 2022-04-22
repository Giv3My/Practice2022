const formatTime = (value) => {
  const sec = parseInt(value, 10);
  let minutes = Math.floor(sec / 60);
  let seconds = sec - (minutes * 60);

  if (minutes < 10)
    minutes = "0" + minutes;
  if (seconds < 10)
    seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
};

export default formatTime;