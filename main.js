'use strict';

const readline = require('./readline-input.js');
const meditation = require('./1-meditation.js');
const sttc = require('./2-statistic.js');
const sets = require('./3-settings.js');
const emitter = require('./EE.js');
const login = {};

function checkItem(item) {  // function for checking items
  const itemInt = parseInt(item); // parsing item into number type
  console.clear();
  if (itemInt === 1) return meditation.start();
  if (itemInt === 2) return sttc.stat();
  if (itemInt === 3) return readline.readOpt(sets);
  return;
}

readline.readName(par => (readline.readItem(par, checkItem)));
function loop(name){
  readline.readItem(name, checkItem)
}
emitter.on('loop', loop);
module.exports = login;
