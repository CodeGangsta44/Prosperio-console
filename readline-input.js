'use strict';

const readline = require('readline');
const console = require('console');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const read = {
  readItem(log, fn) { // function for reading menu items
    console.clear();
    rl.question(
      'Select an item:\n 1 - maditation\n 2 - statistics\n 3 - settings\n'
      , fn.bind(null, log));
  },
  readLoud(log, fn) { // function for reading loud
    //console.clear();
    rl.question(
      'New loud: '
      , fn.bind(null, log));
  },
  readOption(log, fn) { // function for reading settings options
    console.clear();
    rl.question(
      'Select an item:\n 1 - Change loud of assistance voice\n' +
      '2 - Change loud of assistance music\n' + '3 - Clean statistic\n'
      , fn.bind(null, log));
  },
  readTime(log, fn) { // function for reading the time
    console.clear();
    rl.question(
      'Please enter the time what you want to maditate (MM:SS): '
      , fn.bind(null, log));
  },
  readName(fn) { // function for reading user name
    console.clear();
    rl.question(
      'Please, enter your name: '
      , fn);
  }
};

module.exports = {
  rl,
  readItem: read.readItem,
  readTime: read.readTime,
  readName: read.readName,
  readOpt: read.readOption,
  readLoud: read.readLoud
};
