"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.commande = () => {
    var nomCom = ["test", "t"];
    return { nomCom, execute };
};
async function execute(origineMessage, zok) {
    console.log("Commande saisie !!!s");
    let z = 'Salut je m\'appelle *Zokou* \n\n ' + 'je suis un bot Whatsapp Multi-appareil ';
    let d = ' developpé par *Djalega++*';
    let varmess = z + d;
    var img = 'https://wallpapercave.com/uwp/uwp3842939.jpeg';
    await zok.sendMessage(origineMessage, { image: { url: img }, caption: varmess });
}
