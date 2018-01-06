'use strict';

const sttc = require('./statistic.js');
const console = require('console');
const readline = require('./readline-input.js');

const result = function(min) {
  console.clear();
  sttc.ses(min);
};

class Timer {                         // simple countdown timer
  start(minutes, seconds) {
    const minutesResult = minutes;
    const i = setInterval(() => {
      console.clear();
      console.log(`${minutes}:${seconds}`);
      seconds--;
      const timeClear = setTimeout(() => (console.clear()), 1000);
      if (seconds < 0) {
        seconds = 59;
        minutes--;
      }
      if (minutes < 0) {
        clearInterval(i);
        clearTimeout(timeClear);
        result(minutesResult);// call result function for log the result
      }
    }, 1000);
  }
}

const timer = new Timer();

const parseTime = function(time) {   // get the time in string type
  readline.rl.close(); // closing the readline stream from read.readTime
  const timeString = time.split(':'); // split the string by ':'
  const minutesString = timeString[0]; // get the minutes in string type
  const secondsString = timeString[1]; // get the seconds in string type
  const minutes = parseInt(minutesString); // get the minutes in integer type
  const seconds = parseInt(secondsString); // get the seconds in integer type
  timer.start(minutes, seconds); // call the start method
};

const start = () => (readline.readTime(parseTime));

module.exports.start = start;
