const { zokou } = require('../framework/zokou');
const axios = require("axios");
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

zokou({ nomCom: "tgs", categorie: "apilolhumain" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;
  
  if (!arg[0]) {
    repondre("veuillez insérer un lien Telegram svp");
    return;
  }
  
  let lien = arg.join(' ');
  const apikey = 'f3a7772d21dd8368e34e2e92';
  let api = 'https://api.lolhuman.xyz/api/telestick?apikey=' + apikey + '&url=' + lien;

  try {
    const response = await axios.get(api);
    const img = response.data.result.sticker;

    for (let i = 0; i < img.length; i++) {
      const sticker = new Sticker(img[i], {
        pack: nomAuteurMessage,
        author: "Zokou-md",
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'],
        id: '12345',
        quality: 50,
        background: '#000000'
      });

      const stickerBuffer = await sticker.toBuffer(); // Convertit l'autocollant en tampon (Buffer)
      
      await zk.sendMessage(
        dest,
        {
          sticker: stickerBuffer, // Utilisez le tampon (Buffer) directement dans l'objet de message
        },
        { quoted: ms }
      );
    }
  } catch (e) {
    repondre("erreur lors de la procédure \n" + e);
  }
});

/*
zokou({nomCom: "xsearch", categorie: "apilolhumain"}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;

    

    if (!arg[0]) {
        repondre('Veiller entrer un élément de recherche , p\'tit(e) pervers(e)');
        return;
    }
   const query = arg.join(" ")
    const api = 'f3a7772d21dd8368e34e2e92'

    const a = await axios.get('https://api.lolhuman.xyz/api/xnxxsearch?apikey=f3a7772d21dd8368e34e2e92&query=' + query)

    try {
        const result = a.data.result
      if (!result || result.length === 0) {
        repondre('Aucun résultat trouvé.');
        return;}
        let caption = " "
        caption += ` xnxx search \n \n `
        for (i = 0; i< result.length; i++) {
            caption += `------------\n📹 Titre: ${result[i].title}\n⏱️ Durée: ${result[i].duration}\n👀 Vues: ${result[i].views}\n🔗 Lien: ${result[i].link}`
        }
        repondre(caption)
      }  catch (e) {
        repondre('votre quota quotidien est expiré, veiller réessayer demain' + e)
    }
}); */

/*zokou({ nomCom: "was", categorie: "apilolhumain" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;
  
  if (!arg[0]) {
    repondre("veuillez insérer un terme de recherche svp");
    return;
  }
  
  let lien = arg.join(' ');
  const apikey = 'f3a7772d21dd8368e34e2e92';
  let api = 'https://api.lolhuman.xyz/api/stickerwa?apikey=' + apikey + '&query=' + lien;

  try {
    const response = await axios.get(api);
    const img = response.data.result[0].sticker;

    for (let i = 0; i < 30; i++) {
      const sticker = new Sticker(img[i], {
        pack: nomAuteurMessage,
        author: "Zokou-md",
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'],
        id: '12345',
        quality: 50,
        background: '#000000'
      });

      const stickerBuffer = await sticker.toBuffer(); // Convertit l'autocollant en tampon (Buffer)
      
      await zk.sendMessage(
        dest,
        {
          sticker: stickerBuffer, // Utilisez le tampon (Buffer) directement dans l'objet de message
        },
        { quoted: ms }
      );
    }
  } catch (e) {
    repondre("erreur lors de la procédure \n" + e);
  }
}); */