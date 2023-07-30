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
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
const axios = require("axios");
let fs = require("fs-extra");
let path = require("path");
let evt = require(__dirname + "/framework/zokou");
//const //{loadCmd}=require("/framework/mesfonctions")
let { reagir } = require(__dirname + "/framework/app");
var session = conf.session;
const prefixe = conf.PREFIXE;
var lienPaste = 'https://paste.c-net.org/';
if (session != '') {
    var priseSession = session.replace(/Z-O-K-O-U_MD-/gi, "");
    console.log(priseSession);
    console.log('https://paste.c-net.org/' + priseSession);
}
async function authentification() {
    let { data } = await axios.get(lienPaste + priseSession);
    //console.log("le data "+data)
    if (!fs.existsSync(__dirname + "/auth/creds.json")) {
        console.log("connexion en cour ...");
        await fs.writeFileSync(__dirname + "/auth/creds.json", atob(data), "utf8");
        //console.log(session)
    }
    else if (fs.existsSync(__dirname + "/auth/creds.json")) {
        await fs.writeFileSync(__dirname + "/auth/creds.json", atob(data), "utf8");
    }
}
authentification();
const store = (0, baileys_1.makeInMemoryStore)({
    logger: pino().child({ level: "silent", stream: "store" }),
});
async function main() {
    const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(__dirname + "/auth");
    const sockOptions = {
        logger: pino({ level: "silent" }),
        browser: ['Zokou-Md', "safari", "1.0.0"],
        printQRInTerminal: true,
        auth: state
    };
    const zk = (0, baileys_1.default)(sockOptions);
    store.bind(zk.ev);
    setInterval(() => { store.writeToFile("stor.json"); }, 3000);
    zk.ev.on("messages.upsert", async (m) => {
        const { messages } = m;
        const ms = messages[0];
        if (!ms.message)
            return;
        var mtype = (0, baileys_1.getContentType)(ms.message);
        var texte = mtype == "conversation" ? ms.message.conversation : mtype == "imageMessage" ? ms.message.imageMessage?.caption : mtype == "videoMessage" ? ms.message.videoMessage?.caption : mtype == "extendedTextMessage" ? ms.message?.extendedTextMessage?.text : mtype == "buttonsResponseMessage" ?
            ms?.message?.buttonsResponseMessage?.selectedButtonId : mtype == "listResponseMessage" ?
            ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId : mtype == "messageContextInfo" ?
            (ms?.message?.buttonsResponseMessage?.selectedButtonId || ms.message?.listResponseMessage?.singleSelectReply?.selectedRowId || ms.text) : "";
        var origineMessage = ms.key.remoteJid;
        var idBot = zk.user.id;
        const verifGroupe = origineMessage?.endsWith("@g.us");
        var infosGroupe = verifGroupe ? await zk.groupMetadata(origineMessage) : "";
        var nomGroupe = verifGroupe ? infosGroupe.subject : "";
        var auteurMessage = verifGroupe ? ms.key.participant : origineMessage;
        if (ms.key.fromMe) {
            auteurMessage = idBot;
        }
        const nomAuteurMessage = ms.pushName;
        function repondre(mes) { zk.sendMessage(origineMessage, { text: mes }, { quoted: ms }); }
        console.log("\t [][]...{Zokou-Md}...[][]");
        console.log("=========== Nouveau message ===========");
        if (verifGroupe) {
            console.log("message provenant du groupe : " + nomGroupe);
        }
        console.log("message envoyé par : " + "[" + nomAuteurMessage + " : " + auteurMessage.split("@s.whatsapp.net")[0] + " ]");
        console.log("type de message : " + mtype);
        console.log("------ contenu du message ------");
        console.log(texte);
        /** ***** */
        const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
        const verifCom = texte ? texte.startsWith(prefixe) : false;
        const com = verifCom ? texte.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
        var commandeOptions = {
            verifGroupe,
            infosGroupe,
            nomGroupe,
            auteurMessage,
            nomAuteurMessage,
            idBot,
            prefixe,
            arg,
            repondre,
            mtype,
            ms
        };
        //execution des commandes   
        if (verifCom) {
            const cd = evt.cm.find((zokou) => zokou.nomCom === (com));
            if (cd) {
                try {
                    reagir(origineMessage, zk, ms, cd.reaction);
                    cd.fonction(origineMessage, zk, commandeOptions);
                }
                catch (e) {
                    console.log("😡😡 " + e);
                    zk.sendMessage(origineMessage, { text: "😡😡 " + e }, { quoted: ms });
                }
            }
        }
        //fin exécution commandes
    });
    //fin événement message 
    //événement connexion
    zk.ev.on("connection.update", async (con) => {
        const { lastDisconnect, connection } = con;
        if (connection === "connecting") {
            console.log("ℹ️ Connexion en cours...");
        }
        else if (connection === 'open') {
            console.log("✅ connexion reussie! ☺️");
            console.log("--");
            await (0, baileys_1.delay)(200);
            console.log("------");
            await (0, baileys_1.delay)(300);
            console.log("------------------/-----");
            console.log("le bot est en ligne 🕸");
            // ajouterCommande()
            //xlab()
            // console.log("clés "+Object.keys(fruit))
            //chargement des commandes 
            fs.readdirSync(__dirname + "/commandes").forEach((fichier) => {
                if (path.extname(fichier).toLowerCase() == (".js")) {
                    require(__dirname + "/commandes/" + fichier);
                }
            });
        }
        else if (connection == "close") {
            let raisonDeconnexion = new boom_1.Boom(lastDisconnect?.error)?.output.statusCode;
            if (raisonDeconnexion === baileys_1.DisconnectReason.badSession) {
                console.log('Session id érronée veuillez rescanner le qr svp ...');
            }
            else if (raisonDeconnexion === baileys_1.DisconnectReason.connecetionClosed) {
                console.log('!!! connexion fermée, reconnexion en cours ...');
                main();
            }
            else if (raisonDeconnexion === baileys_1.DisconnectReason.connectionLost) {
                console.log('connexion au serveur perdue 😞 ,,, reconnexion en cours ... ');
                main();
            }
            else if (raisonDeconnexion === baileys_1.DisconnectReason?.connectionReplaced) {
                console.log('connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!');
            }
            else if (raisonDeconnexion === baileys_1.DisconnectReason.loggedOut) {
                console.log('vous êtes déconnecté,,, veuillez rescanner le code qr svp');
            }
            else if (raisonDeconnexion === baileys_1.DisconnectReason.restartRequired) {
                console.log('redémarrage en cours ▶️');
                main();
            }
            // sleep(50000)
            console.log("hum " + connection);
            console.log(session);
        }
    });
    //fin événement connexion
    //événement authentification 
    zk.ev.on("creds.update", saveCreds);
    //fin événement authentification 
    return zk;
}
main();

