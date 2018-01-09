'use strict';

const readline = require('./readline-input.js');
const filesys = require('./fsw.js');

let data = filesys.read();


function main(chose, min, login){
  readline.rl.close();
  let stats = data.split(';');
  let index = stats.indexOf(login);

  if(index == -1){
    stats.push(login);
    stats.push('\n0\n0\n0');
  }

  index = stats.indexOf(login);
  let dates = stats[index + 1].split('\n');
  const currentDay = (new Date()).getTime();
  const lastDay = Date.parse((dates[dates.length - 1].split('-'))[0]);
  const lastDate = (dates[dates.length - 1].split('-'))[0];
  dates.shift()

  class User {

    constructor(indexOfName, allDates){
    this.data = data;
    this.name = stats[index];
    this.maxStreak = parseInt(dates[0]);
    this.currentStreak = parseInt(dates[1]);
    this.total = parseInt(dates[2]);
   }

    session(min){
      const pause =  ((currentDay - lastDay)/86400000);
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
      const year = (new Date()).getFullYear();
      let month =  (new Date()).getMonth();
      const day = (new Date()).getDate();
      month += 1;
      if(month < 10){
        month = '0' + month;
      }
      const currentDate = year + '.' + month + '.' + day;
      if(currentDate == lastDate){
        let lastSession = dates[dates.length - 1];
        dates[dates.length - 1] = currentDate + '-'
        + (parseInt(lastSession.split('-')[1]) + min);
      }
      else{
        let date = currentDate + '-' + min;
        dates.push(date);
      }
      this.total = this.total + min;
      dates[2] = this.total;
      dates[1] = this.currentStreak;
      dates[0] = '\n' + this.maxStreak;
      stats[index + 1] = dates.join('\n');
      this.data = stats.join(';');
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
    };
  };

  const user = new User(index, dates);

  if(chose == 'stat'){
    user.stat;
  }

  if(chose == 'ses'){
    user.session(min);
    filesys.write(user.data);
  }
};

module.exports = {
  main: main
}
