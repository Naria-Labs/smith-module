module.exports = {
  formatTime: (hour = 0, minute = 0, second = 0) => {
    var time = "";
    time += String(hour).padStart(2, "0");
    time += ":";
    time += String(minute).padStart(2, "0");
    time += second === 0 ? ":" + String(hour).padStart(2, "0") : "";
  },
};
