"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reagir = void 0;
var set = require('../set');
/*var listCmd=[]

async function execute (option,fonction)
{
  var tabOption=option;
  tabOption.fonction=fonction;
  if(!option.fromMe) tabOption=false
var regexCat =/'cat[eé]gorie'/
  if(!option.regexCat ) tabOption.regexCat='Général'
  if(!tabOption.nomFichier) tabOption.nomFichier=''
  if(!tabOption.desc) tabOption.desc=''
  listCmd.push(tabOption)
  return tabOption;
}*/
async function reagir(dest, zok, msg, emoji) {
    await zok.sendMessage(dest, { react: { text: emoji, key: msg.key } });
}
exports.reagir = reagir;
