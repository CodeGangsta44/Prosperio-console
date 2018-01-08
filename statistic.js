'use strict';

const readName = require('./readline-input.js');
const readline = require('readline');
const filesys = require('./fsw.js');
const mainstat = require('./stat-main.js');

const statResult = (answer) => {
  let login = answer;
  let user = mainstat.main(login);
  rl.close()
  user.stat;
  filesys.write(user.data);
};

const statistic = () => (readName.readNameStat(statResult));
// function statistic() {
//   let rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   rl.question('Please, enter your name: ', function(answer) {
//     let login = answer;
//     let user = mainstat.main(login);
//     rl.close()
//     user.stat;
//     filesys.write(user.data);
//   });
// }

function session(min) {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Please, enter your name: ', function(answer) {
    let login = answer;
    rl.close()
    let user = mainstat.main(login);
    user.session(min);
    filesys.write(user.data);
  });
}


module.exports = {
  ses: session,
  stat: statistic
};
