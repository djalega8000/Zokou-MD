const conf = require('../config.js');
var tabCmds = [];
let cm = [];
function zokou(obj, fonctions) {
    let infoComs = obj;
    if (!obj.categorie) {
        infoComs.categorie = "Général";
    }
    if (!obj.reaction) {
        infoComs.reaction = "🪰";
    }
    infoComs.fonction = fonctions;
    cm.push(infoComs);
    console.log('chargement...');
    return infoComs;
}
console.log(tabCmds.length);
console.log("outrage");
module.exports = { zokou, Module: zokou, cm };
