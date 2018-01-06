'use strict';

const readline = require('./readline-input.js');
const meditation = require('./1-meditation.js');

function checkItem(item) {  // function for checking items
  const itemInt = parseInt(item); // parsing item into number type
  console.clear();
  if (itemInt === 1) return meditation.start();
  // for itemInt === 2
  // for itemInt === 3
  return;
}

readline.readItem(checkItem);
