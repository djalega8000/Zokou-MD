const axios = require('axios');
const { zokou } = require("../framework/zokou");

const generateReactionCommand = (reactionName, reactionEmoji, commandName) => {
  zokou({
    nomCom: commandName,
    categorie: "reaction",
    reaction: reactionEmoji,
  },
  async (origineMessage, zk, commandeOptions) => {
    const {auteurMessage,auteurMsgRepondu, repondre, ms ,msgRepondu} = commandeOptions;

    const url = `https://api.waifu.pics/sfw/${reactionName}`;
     try {
    
  

   
      
        const response = await axios.get(url);
        const imageUrl = response.data.url;
       var txt="";
    if(msgRepondu)
    {
        txt+=` @${auteurMessage.split("@")[0]} a ${reactionName} @${auteurMsgRepondu.split("@")[0]}`
       zk.sendMessage(origineMessage, { video: { url: imageUrl }, gifPlayback: true, caption:txt,mentions:[auteurMessage,auteurMsgRepondu] }, { quoted: ms });
    }
    else{
           txt+=` @${auteurMessage.split("@")[0]} s'est ${reactionName} lui même.`
       zk.sendMessage(origineMessage, { video: { url: imageUrl }, gifPlayback: true, caption:txt,mentions:[auteurMessage]}, { quoted: ms });
    }

     //   zk.sendMessage(origineMessage, { video: { url: imageUrl }, gifPlayback: true, caption: "undefined" }, { quoted: ms });
      
    } catch (error) {
      repondre('Erreur lors de la récupération des données :', error);
    }
  });
};

generateReactionCommand("bully", "👊", "taquiner");
generateReactionCommand("cuddle", "🤗", "caliner");
generateReactionCommand("cry", "😢", "pleurer");
generateReactionCommand("hug", "😊", "calin");
generateReactionCommand("awoo", "🐺", "awoo");
generateReactionCommand("kiss", "😘", "embrasser");
generateReactionCommand("lick", "👅", "lecher");
generateReactionCommand("pat", "👋", "tapoter");
generateReactionCommand("smug", "😏", "malice");
generateReactionCommand("bonk", "🔨", "bonk");
generateReactionCommand("yeet", "🚀", "lancer");
generateReactionCommand("blush", "😊", "rougir");
generateReactionCommand("smile", "😄", "sourire");
generateReactionCommand("wave", "👋", "saluer");
generateReactionCommand("highfive", "✋", "tope-la");
generateReactionCommand("handhold", "🤝", "tenir");
generateReactionCommand("nom", "🍴", "manger");
generateReactionCommand("bite", "🦷", "mordre");
generateReactionCommand("glomp", "🤗", "enlacer");
generateReactionCommand("slap", "👋", "gifler");
generateReactionCommand("kill", "💀", "tuer");
generateReactionCommand("kick", "🦵", "pied");
generateReactionCommand("happy", "😄", "heureux");
generateReactionCommand("wink", "😉", "clin");
generateReactionCommand("poke", "👉", "pousser");
generateReactionCommand("dance", "💃", "danser");
generateReactionCommand("cringe", "😬", "cringe");
