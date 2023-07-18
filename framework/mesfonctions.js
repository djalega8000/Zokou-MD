"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recept_message = exports.getBuffer = exports.zJson = exports.tabCmd = exports.ajouterCommande = void 0;
const axios = require('axios');
const baileys_1 = require("@whiskeysockets/baileys");
const fs = require('fs-extra');
const util = require('util');
/*_________by Djalega++

fonction zJson:
récupère un objet json
:paramètres
-url:lien sur laquelle la requête est effectuée
-option: éventuelle option de requête
:valeur de retour
données contenues dans la reponse de la requête



*/
async function zJson(url, option) {
    try {
        option ? option : {};
        const resultat = await axios({
            method: 'GET', url: url,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' }, ...option
        });
        return resultat.data;
    }
    catch (erreur) {
        return erreur;
    }
}
exports.zJson = zJson;
/*______ fonction getBuffer------
récupère les données sous forme de : arraybuffer
:paramètres
-url:lien de la requête
-option:eventuelles options pour la requête
:valeur de retour
tableau contenant les données de la réponse renvoyée par la requête
-------*/
async function getBuffer(url, option) {
    try {
        option ? option : {};
        const resultat = await axios({
            method: 'GET', url: url, headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            }, ...option, responseType: "arrayBuffer"
        });
        return resultat.data;
    }
    catch (erreur) {
        console.log(erreur);
    }
}
exports.getBuffer = getBuffer;
/*-------- fonction recept_message

fonction pour récupérer les meté-données des messages recus
- paramètres
:zok objet waSocket
:objet IwaMessage (message reçu )
:store enregistrements de conversation
- valeur de retour
retourne un tableau contenant les meta-données du message reçu
*/
async function recept_message(zok, mess, store) {
    if (!mess)
        return;
    if (mess.key) {
        mess.cleMessage = mess.key;
        mess.idMessage = mess.key.id;
        mess.origineMessage = mess.key.remoteJid;
        mess.moi = mess.key.fromMe;
        mess.groupe = mess.origineMessage.endsWith('@g.us');
        mess.origineBot = mess.idMessage.startsWith('BAE5') && mess.idMessage.length == 16;
    }
    ///////////////////////////////
    if (mess.message) {
        mess.typeMessage = (0, baileys_1.getContentType)(mess.message);
        mess.ms = (mess.typeMessage == 'viewOnceMessage' ? mess.message[mess.typeMessage].message[(0, baileys_1.getContentType)(mess.message[mess.typeMessage].message)] : mess.message[mess.typeMessage]);
        try {
            switch (mess.typeMessage) {
                case 'conversation':
                    mess.corpsMessage = mess.message.conversation;
                    break;
                case 'imageMessage':
                    mess.corpsMessage = mess.message.imageMessage.caption;
                    break;
                case 'videoMessage':
                    mess.corpsMessage = mess.message.videoMessage.caption;
                    break;
                case 'entendedTextMessage':
                    mess.corpsMessage = mess.message.extendedTextMessage.Textarea;
                    break;
                case 'buttonsResponseMessage':
                    mess.corpsMessage = mess.message.buttonsResponseMessage.SelectedButtonId;
                    break;
                case 'listResponseMessage':
                    mess.corpsMessage = mess.message.listResponseMessage.singleSelectReply.selectedRowId;
                    break;
                case 'templateButtonReplyMessage':
                    mess.corpsMessage = mess.message.templateButtonReplyMessage.selectedId;
                    break;
                case 'messageContextInfo':
                    mess.corpsMessage = mess.message.buttonsResponseMessage.SelectedButtonId || mess.message.listResponseMessage.singleSelectReply.selectedRowId || mess.text || '';
                    break;
                default:
                    mess.corpsMessage = false;
            }
        }
        catch {
            mess.corpsMessage = false;
        }
    }
    ///////////////////////////
    let quoted = mess.quoted = mess.ms.contextInfo ? mess.ms.contextInfo.quotedMessage : null;
    mess.mentionedJid = mess.ms.contextInfo ? mess.ms.contextInfo.mentionedJid : [];
    if (mess.quoted) {
    }
    ///////////////////////////:/:
    return mess;
}
exports.recept_message = recept_message;
var tabCmd = {};
exports.tabCmd = tabCmd;
async function ajouterCommande() {
    const readDir = util.promisify(fs.readdir);
    const readFile = util.promisify(fs.readFile);
    //console.log("ch " + __dirname + '../')
    var chemin = './commandes/';
    var nomFichier = await readDir(chemin);
    //console.log("installation des plugins ... ")
    nomFichier.forEach((fichier) => {
        if (fichier.endsWith(".js")) {
            //console.log(fichier+" installé ✅")
            var { commande } = require('../' + chemin.replace(/./, '') + fichier.split('.js')[0]);
            var infoCom = commande();
            for (var a of infoCom.nomCom) {
                tabCmd[a] = infoCom.execute;
            }
        }
        //console.log("installation de plugins terminé 👍🏿")
    });
}
exports.ajouterCommande = ajouterCommande;
