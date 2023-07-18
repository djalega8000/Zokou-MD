"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const fs = require('fs-extra');
const conf = require('./set');
const boom_1 = require("@hapi/boom");
const pino = require('pino');
const axios = require('axios');
/*
const{recept_message} =require(__dirname+'/framework/mesfonctions')
*/
const { ajouterCommande, tabCmd } = require(__dirname + '/framework/mesfonctions');
var session = conf.session;
const prefixe = conf.PREFIXE;
var lienPaste = 'https://paste.c-net.org/';
if (session != '') {
    var priseSession = session.replace(/Z-O-K-O-U_MD-/gi, "");
    console.log(priseSession);
    console.log('https://paste.c-net.org/' + priseSession);
    /*let {data} =await axios.get('https://paste.c-net.org/'+priseSession)*/
    /*let {data} = await axios.get('https://paste.c-net.org/'+priseSession)*/
    // console.log('le data '+ data)
}
async function authentification() {
    let { data } = await axios.get(lienPaste + priseSession);
    //console.log("le data "+data)
    if (!fs.existsSync(__dirname + "/zokou_auth/creds.json")) {
        console.log("connexion en cour ...");
        await fs.writeFileSync(__dirname + "/zokou_auth/creds.json", atob(data), "utf8");
        //console.log(session)
    }
    else if (fs.existsSync(__dirname + "/zokou_auth/creds.json")) {
        await fs.writeFileSync(__dirname + "/zokou_auth/creds.json", atob(data), "utf8");
    }
}
authentification();
const store = (0, baileys_1.makeInMemoryStore)({
    logger: pino().child({ level: "silent", stream: "store" }),
});
async function starts() {
    const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(__dirname + '/zokou_auth');
    const connectOption = {
        logger: pino({ level: "silent" }),
        browser: ['Zokou-Md', 'safari', '1.0.0'],
        printQRInTerminal: true,
        auth: state
    };
    const zok = (0, baileys_1.default)(connectOption);
    store.bind(zok.ev);
    setInterval(() => { store.writeToFile('store.json'); }, 10 * 1000);
    zok.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "connecting") {
            console.log("ℹ️ Connexion en cours...");
        }
        else if (connection === 'open') {
            console.log("✅ connexion reussie!");
            ajouterCommande();
        }
        else if (connection === "close") {
            /* if ((lastDisconnect?.error as Boom)?.output?.statusCode == DisconnectReason.badSession) {
               console.log('Connexion fermée . Veuillez ajouter une nouvelle Session ID SVP.');
             }*/
            let raisonDeconnexion = new boom_1.Boom(lastDisconnect.error)?.output.statusCode;
            if (raisonDeconnexion === baileys_1.DisconnectReason.badSession) {
                console.log('Session id érronée veuillez rescanner le qr svp ...');
            }
            else if (raisonDeconnexion === baileys_1.DisconnectReason.connecetionClosed) {
                console.log('!!! connexion fermée, reconnexion en cours ...');
                starts();
            }
            else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionLost) {
                console.log('connexion au serveur perdue 😞 ,,, reconnexion en cours ... ');
                starts();
            }
            else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionReplaced) {
                console.log('connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!');
            }
            else if (raisonDeconnexion === baileys_1.DisconnectReason.loggedOut) {
                console.log('vous êtes déconnecté,,, veuillez rescanner le code qr svp');
            }
            else if (raisonDeconnexion === baileys_1.DisconnectReason.restartRequired) {
                console.log('redémarrage en cours ▶️');
                starts();
            }
            // sleep(50000)
            console.log("hum " + connection);
            console.log(session);
        }
    });
    zok.ev.on('messages.upsert', async (upsert) => {
        const { type, messages } = upsert;
        var infoMessage = messages[0];
        if (!infoMessage)
            return;
        /* {
              console.log('les messages '+JSON.stringify(infoMessage))
         }*/
        /*if(messages){
        console.log('les messages '+JSON.stringify(messages[0]))}*/
        const contenuMessage = JSON.stringify(infoMessage);
        const origineMessage = infoMessage.key.remoteJid;
        /*if(origineMessage)
        {console.log("les remote "+origineMessage)}*/
        const types = Object.keys(infoMessage)[0];
        const mtype = (0, baileys_1.getContentType)(infoMessage.message);
        //  if(mtype){console.log('le type '+mtype)}
        var numBot = zok.user.id;
        var texte = mtype === "conversation" ? infoMessage.message.conversation : mtype == "imageMessage" ?
            infoMessage.message.imageMessage.caption :
            mtype == "videoMessage" ?
                infoMessage.message.videoMessage.caption
                : mtype == "extendedTextMessage" ?
                    infoMessage.message.extendedTextMessage.text : mtype == "buttonsResponseMessage" ?
                    infoMessage.message.buttonsResponseMessage.selectedButtonId : mtype == "listResponseMessage" ?
                    infoMessage.message.listResponseMessage.singleSelectReply.selectedRowId : mtype == "messageContextInfo" ?
                    (infoMessage.message.buttonsResponseMessage.selectedButtonId || infoMessage.message.listResponseMessage.singleSelectReply.selectedRowId || infoMessage.text) : "";
        // await ajouterCommande()
        //if(texte) console.log("le texte "+texte)
        // if(texte[1] && texte[1]==" ")texte = texte[0] + texte.slice(2);
        // if(texte) console.log("le texte "+texte)
        // const commande = texte.slice(1).trim().split(/ +/).shift().toLowerCase();
        const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
        const verifCom = texte ? texte.startsWith(prefixe) : false;
        const com = verifCom ? texte.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
        if (!verifCom)
            return;
        if (com) {
            console.log("la com " + com + ' le text ' + texte);
            console.log('pre ' + prefixe);
        }
        if (type == 'notify') {
            if (tabCmd[com]) {
                await tabCmd[com](messages[0].key.remoteJid, zok, arg, messages[0]);
                console.log(origineMessage);
                return;
            }
        }
        /*if (type === 'notify') {
          console.log('ok ok')
          let z ='Salut je m\'appelle *Zokou* \n\n '+'je suis un bot Whatsapp Multi-appareil '
          let d =' developpé par *Djalega++*'
          let varmess=z+d
          var img='https://wallpapercave.com/uwp/uwp3842939.jpeg'
    */
        //const messageRecu=messages[0]
        /* var metaDmsg=recept_message(zok,JSON.parse(JSON.stringify(messageRecu)),store)
 
         const {corpsMessage}=metaDmsg;
 
       console.log('cccut '+corpsMessage))*/
        /*if (messages[0].message?.conversation?.toString().toLowerCase() == '.présentation') {
          await zok.sendMessage(messages[0].key.remoteJid, { image:{url:img},caption:varmess})
  
        }*/
        //console.log("dur "+metaDmsg)
        // }
    });
    /////////////////......../
    zok.ev.on('creds.update ', saveCreds);
}
starts();
console.log("Zokou-Md");
