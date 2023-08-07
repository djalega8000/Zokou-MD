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
  const apikey =  process.env.API_LOL_HUMAIN;
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
