
const {zokou } = require("../framework/zokou");
const axios = require('axios');


zokou({
  nomCom: "hwaifu",
  categorie: "hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/nsfw/waifu'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Erreur lors de la récupération des données : ' +error);
  }
});


  /////////////// hneko //////////
zokou({
  nomCom: "trap",
  categorie: "hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/nsfw/trap'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Erreur lors de la récupération des données :', error);
  }
});

zokou({
  nomCom: "hneko",
  categorie: "hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/nsfw/neko'//apiWaifu("neko"); // Remplace avec ton lien réel

  try { for (let i = 0 ;i < 5 ; i++) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } ,caption : " \t by Djalega++" }, { quoted: ms }); }
  } catch (error) {
    repondre('Erreur lors de la récupération des données :', error);
  }
});


zokou({
  nomCom: "blowjob",
  categorie: "hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/nsfw/blowjob'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Erreur lors de la récupération des données :', error);
  }
});


zokou({
  nomCom: "xvideos",
  categorie: "Autre",
  reaction: "🎥"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  const searchQuery = arg.join(" ");

  if (!searchQuery) {
    repondre('Veuillez fournir un terme de recherche pour les vidéos !');
    return;
  }

  try {
    const res = await axios.get("https://fantox001-scrappy-api.vercel.app/xvideos?search=" + searchQuery);
    const scrappedURL = res.data.videoUrl;

    await zk.sendMessage(origineMessage.from, { video: { url: scrappedURL }, caption: '_Scrappy API by: FantoX001_' }, { quoted: ms });
  } catch (error) {
    console.error('Erreur lors de la recherche de vidéos :', error);
    repondre('Erreur lors de la recherche de vidéos.');
  }
});



