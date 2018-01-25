'use strict';

const readline = require('./readline-input.js');
const mainstat = require('./main-stat.js');

function statistic(log) {
  mainstat.main('stat', 0, log);
}

function session(log, min) {
  console.clear();
  mainstat.main('ses', min, log);
}

module.exports = {
  ses: session,
  stat: statistic
};
