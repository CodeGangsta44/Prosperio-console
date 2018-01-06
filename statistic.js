'use strict';

const readline = require('readline');
const crypto = require('crypto');
const decipher = crypto.createDecipher('aes192', 'it is not a password');
const cipher = crypto.createCipher('aes192', 'it is not a password');
const fs = require('fs');


let data;
try {
  let crypted = fs.readFileSync('database').toString();
  data = decipher.update(crypted, 'hex', 'utf8');
  data += decipher.final('utf8');
}catch(e){
  data = ' ';
}

function main(login){
let stats = data.split(';');
let index = stats.indexOf(login);

if(index == -1){
  stats.push(login);
  stats.push('\n0\n0\n0');
}

index = stats.indexOf(login);
let dates = stats[index + 1].split('\n');
let currentDay = (new Date()).getTime();
let lastDay = Date.parse((dates[dates.length - 1].split('-'))[0]);
let lastDate = (dates[dates.length - 1].split('-'))[0];
dates.shift()

class User {

  constructor(indexOfName, allDates){
  this.name = stats[index];
  this.maxStreak = parseInt(dates[0]);
  this.currentStreak = parseInt(dates[1]);
  this.total = parseInt(dates[2]);
  }

  session(min){
    let pause =  ((currentDay - lastDay)/86400000);
    if(pause >= 1 && pause < 2){
      dates[1] = parseInt(dates[1]) + 1;
      this.currentStreak = dates[1];
    }
    if(pause >= 2){
        this.currentStreak = 1;
    }
    if(this.currentStreak > this.maxStreak){
      this.maxStreak = this.currentStreak
    }
    let year = (new Date()).getFullYear();
    let month =  (new Date()).getMonth();
    let day = (new Date()).getDate();
    month += 1;
    if(month < 10){
      month = '0' + month;
    }
    let currentDate = year + '.' + month + '.' + day;
    if(currentDate == lastDate){
      let last = dates[dates.length - 1];
      dates[dates.length - 1] = currentDate + '-'
      + (parseInt(last.split('-')[1]) + min);
    }
    else{
      let date = currentDate + '-' + min;
      dates.push(date);
    }
    this.total = this.total + min;
    dates[2] = this.total;
    dates[1] = this.currentStreak;
    dates[0] = '\n' + dates[0];
    stats[index + 1] = dates.join('\n');
    data = stats.join(';');
    console.log('Meditation time: ' + min + ' min');
    console.log('Streak: ' + this.currentStreak + ' days');
  }

  get stat(){
    console.log('Your current streak: ' + this.currentStreak);
    console.log('Your best streak: ' + this.maxStreak);
    console.log('Total meditation time: ' + this.total)
    let i;
    for(i = 3; i < dates.length; i++){
      console.log(new Date((dates[i].split('-'))[0]).toString()
      + ' Meditation time: ' + (dates[i].split('-'))[1] + 'min');
    }
  }
}

const user = new User(index, dates);
return user;
}

function statistic(){
  let rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl2.question('Please, enter your name: ', function(answer) {
    let login = answer;
    let user = main(login);
    rl2.close();
    user.stat;
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    fs.writeFileSync('database', encrypted);
  });
}

function session(min){
  let rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl2.question('Please, enter your name: ', function(answer) {
    let login = answer;
    rl2.close();
    let user = main(login);
    user.session(min);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    fs.writeFileSync('database', encrypted);
  });
}

module.exports = {
  ses: session,
  stat: statistic
}
