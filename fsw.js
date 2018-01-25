'use strict';

const crypto = require('crypto');
const decipher = crypto.createDecipher('aes192', 'it is not a password');
const cipher = crypto.createCipher('aes192', 'it is not a password');
const fs = require('fs');
//const User = require('./main-stat.js').User;

function readStatistic() {
  let base;
  let crypted;
  try {
    crypted = fs.readFileSync('database').toString();
  } catch (e) {
    base = {};
    return base;
  }
  base = decipher.update(crypted, 'hex', 'utf8');
  base += decipher.final('utf8');
  base = JSON.parse(base);
  return base;
}

function writeStatistic(data) {
  data = JSON.stringify(data);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  fs.writeFileSync('database', encrypted);
}

function readSettings(log){
  let data;
  try{
    data = fs.readFileSync('settings.json').toString();
    data = JSON.parse(data);
  } catch (e) {
    data = {};
  }
  if(!data[log]){
    data[log] = {
      voice: 100,
      music: 100
    };
  }
  return data[log];
}

function writeSettings(sets, log){
  let data;
  try{
    data = fs.readFileSync('settings.json').toString();
    data = JSON.parse(data);
  } catch (e) {
    data = {};
  }
  data[log] = sets;
  data = JSON.stringify(data);
  fs.writeFileSync('settings.json', data);
}

function cleanStatistic(log){
  let data = readStatistic();
  data[log] = new User(log);
  writeStatistic(data);
}
module.exports = {
  readStat: readStatistic,
  writeStat: writeStatistic,
  readSet: readSettings,
  writeSet: writeSettings,
  clean: cleanStatistic
};
