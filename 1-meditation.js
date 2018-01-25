'use strict';

const sttc = require('./2-statistic.js');
const console = require('console');
const readline = require('./readline-input.js');

const result = (lg, min) => (sttc.ses(lg, min));

const Timer = class {                         // simple countdown timer
  start(log, minutes, seconds) {
    let lg = log;
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
        console.log(minutesResult);
        result(lg, minutesResult); // call result function for log the result
      }
    }, 1000);
  }
};

const timer = new Timer();

const parseTime = function(log, time) {   // get the time in string type
  const timeString = time.split(':'); // split the string by ':'
  const minutes = parseInt(timeString[0]); // get the minutes in integer type
  const seconds = parseInt(timeString[1]); // get the seconds in integer type
  timer.start(log, minutes, seconds); // call the start method
};

const start = (log) => (readline.readTime(log, parseTime));

module.exports.start = start;
