'use strict';

const readline = require('./readline-input.js');
const filesys = require('./fsw.js');

function main(log, opt){
  console.log(log)
  const settings = filesys.readSet(log);
  const optNumber = parseInt(opt);
  if(optNumber === 1){
    readline.readLoud(log, changeVoiceLoud);
  }
  function changeVoiceLoud(log, loud){
    readline.rl.close();
    if(0<=loud<=100){
      settings.voice = parseInt(loud);
      filesys.writeSet(settings, log);
    }
  }

  function changeMusicLoud(loud){
    if(0<=loud<=100){
      settings.music = loud;
      filesys.writeSet(settings, log);
    }
  }

  function cleanStatistic(){
    let data = filesys.readStat();
  }
}
main('Roman', 1);
