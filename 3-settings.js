'use strict';

const readline = require('./readline-input.js');
const filesys = require('./fsw.js');
const emitter = require('./EE.js');
const options = {
  changeVoiceLoud: function changeVoiceLoud(sets, loud){
    if(0<=loud<=100){
      sets.voice = parseInt(loud);
      filesys.writeSet(sets);
      emitter.emit('loop');
    }
  },

  changeMusicLoud: function changeMusicLoud(sets, loud){
    if(0<=loud<=100){
      sets.music = parseInt(loud);
      filesys.writeSet(sets);
      emitter.emit('loop');
    }
  }
}

function main(opt){
  if(opt === ''){
    emitter.emit('loop');
  } else {
    const settings = filesys.readSet();
    const optNumber = parseInt(opt);

    if(optNumber === 1){
      readline.readLoud(options.changeVoiceLoud.bind(null, settings));
    }
    if(optNumber === 2){
      readline.readLoud(options.changeMusicLoud.bind(null, settings));
    }
    if(optNumber === 3){
      console.clear();
      filesys.clean();
      emitter.emit('loop');
    }
  }
}

module.exports = main;
