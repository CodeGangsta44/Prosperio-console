'use strict';

const readline = require('readline');
const console = require('console');
const main = require('./main.js')
const emitter = require('./EE.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const read = {
  readItem(log, fn) { // function for reading menu items
    main.name = log;
    main.loop = () => {
      const readline = require('./readline-input.js');
      const meditation = require('./1-meditation.js');
      const sttc = require('./2-statistic.js');
      const sets = require('./3-settings.js');

      function checkItem(item) {  // function for checking items
        const itemInt = parseInt(item); // parsing item into number type
        console.clear();
        if (itemInt === 1) return meditation.start();
        if (itemInt === 2) return sttc.stat();
        if (itemInt === 3) return readline.readOpt(sets);
        return;
      }
      readline.readItem(main.name, checkItem);
    };
    console.clear();
    rl.question(
      'Select an item:\n 1 - maditation\n 2 - statistics\n 3 - settings\n'
      , fn);
  },
  readLoud(fn) { // function for reading loud
    console.clear();
    rl.question(
      'New loud: '
      , fn);
  },
  readOption(fn) { // function for reading settings options
    console.clear();
    rl.question(
      'Select an item:\n 1 - Change loud of assistance voice\n' +
      ' 2 - Change loud of music\n' + ' 3 - Clean statistic\n'
      , fn);
  },
  readTime(fn) { // function for reading the time
    console.clear();
    rl.question(
      'Please enter the time what you want to maditate (MM:SS): '
      , fn);
  },
  readName(fn) { // function for reading user name
    console.clear();
    rl.question(
      'Please, enter your name: '
      , fn);
  },
  back(){
    rl.question('Press Enter', param => {
      emitter.emit('loop', main.name);
    })
  }
};

module.exports = {
  rl,
  readItem: read.readItem,
  readTime: read.readTime,
  readName: read.readName,
  readOpt: read.readOption,
  readLoud: read.readLoud,
  back: read.back
};
