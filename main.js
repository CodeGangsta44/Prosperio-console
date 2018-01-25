'use strict';

const readline = require('./readline-input.js');
const meditation = require('./1-meditation.js');
const sttc = require('./2-statistic.js');

function checkItem(log, item) {  // function for checking items
  const itemInt = parseInt(item); // parsing item into number type
  console.clear();
  if (itemInt === 1) return meditation.start(log);
  if (itemInt === 2) sttc.stat(log);
  if (itemInt === 3) 
  return;
}

readline.readName(log => (readline.readItem(log, checkItem)));
