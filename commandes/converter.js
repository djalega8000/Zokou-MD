const { zokou } = require("../framework/zokou");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");


////////////////////////////////////////            /sticker/           ////////////////////////////////////////////
zokou({ nomCom: "sticker",
    categorie: "converter", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { prefixe, arg, ms, repondre } = commandeOptions;
   if (!ms.quoted) return repondre("Veillez mentionner une image ou une video s'il vous plait")
  let image = await ms.quoted.download();
                repondre("*En cours de traitement*");

  let sticker = new Sticker(image, {
    pack: 'je sais pas quoi mettre', // The pack name
    author: 'Zokou-MD', // The author name
    type: StickerTypes.FULL, // The sticker type
    categories: ['🤩', '🎉'], // The sticker category
    id: '12345', // The sticker id
    quality: 50, // The quality of the output file
    background: '#000000' // The sticker background color (only for full stickers)

   
    
})
  const stikk = await sticker.toBuffer();
   await zk.sendMessage(dest, stikk, { quoted: infoMessage })
}

}
