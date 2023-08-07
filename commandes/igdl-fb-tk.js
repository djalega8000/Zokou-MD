const {zokou} = require('../framework/zokou');
const fs = require('fs');
const ig = require('instagram-url-dl');
const { fetchVideo } = require('@prevter/tiktok-scraper');
 const { writeFileSync } = require('fs');
const mumaker = require("mumaker");

zokou({nomCom : "igdl" , categorie : "téléchargement"},async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions ;

  let link = arg.join(' ')

  if (!arg[0]) { repondre('Veillez insérer un lien video instagramme');return}; 

  try {
     const response = await ig(link)
  
  let choix = response.data

    zk.sendMessage(dest,{video : {url : choix[0].url},caption : "téléchargeur de video ig propulsé par *Zokou-Md*",gifPlayback : false },{quoted : ms}) 
  } catch (e) {repondre("erreur survenue lors du téléchargement \n " + e)}

  

  
});
/*
zokou({nomCom : "tiktok" , categorie : "téléchargement"},async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions ;
      const lien = arg.join(" ")
  if(!lien) {repondre("Veiller inséré un lien tiktok"); return} ;
     try {
       const url = lien;
       
    const video = await fetchVideo(url);
const buffer = await video.download();
writeFileSync('tiktok.mp4', buffer);
   
   let mess =  {
      video : { url : './tiktok.mp4'},
   
      caption  : `
Description de la vidéo : ${video.description}
🔗 URL : ${video.url}
👤 Auteur : ${video.author}
❤️ J'aime : ${video.likes}
💬 Commentaires : ${video.comments}
🔁 Partages : ${video.shares}
▶️ Lectures : ${video.playCount}
🎵 Musique : ${video.music.name} - ${video.music.author}
🖼️ URL de la miniature : ${video.previewImageUrl}

TikTok Downloader by Zokou-md
`, 
   gifPlayback : false 
   }
     

       zk.sendMessage(dest,mess,{quoted:ms})

        
     } catch (e) { repondre('erreur lors du téléchargement de la video.\n' +e)
        
     }
     
}); */

zokou({
  nomCom: "fbdl",
  categorie: "téléchargement",
  reaction: "📽️"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Veuillez fournir une URL vidéo publique de Facebook à télécharger !');
    return;
  }

  const queryURL = arg[0];

  try {
    const res = await axios.get("https://fantox001-scrappy-api.vercel.app/fbdl?url=" + queryURL);
    const scrappedURL = res.data.videoUrl;

    await zk.sendMessage(origineMessage, { video: { url: scrappedURL }, caption: 'Téléchargeur de vidéo Facebook, propulsé par *zokou-MD*' }, { quoted: ms });
  } catch (error) {
    console.error('Erreur lors du téléchargement de la vidéo :', error);
    repondre('Erreur lors du téléchargement de la vidéo.');
  }
});



zokou({ nomCom: "tiktok", categorie: "téléchargement", reaction: "🎵" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`Voici comment utiliser la commande:\n ${prefixe}veiller lien_video_tiktok`);
    return;
  }

  const videoUrl = arg.join(" ");
  mumaker.tiktok(videoUrl)
    .then((data) => {
      const thumbnail = data.thumbnail;
      const author = data.author;
      const description = data.description;
      const media = Array.isArray(data.media) ? data.media.join(", ") : data.media;
      const music = data.music;
      const like = data.like;
      const comment = data.comment;
      const share = data.share;

      // Envoi du message avec le thumbnail de la vidéo
      const caption = `
        Auteur: ${author}
        Description: ${description}
        Média: ${media}
        Musique: ${music}
        J'aime: ${like}
        Commentaire: ${comment}
        Partages: ${share}
      `;

      
      zk.sendMessage(dest, { image: { url: thumbnail }, caption: caption},{quoted : ms});

      // Envoi de la vidéo sans commentaire
      zk.sendMessage(dest, { video: { url: data.media } });

      // Envoi des autres informations
      
    })
    .catch((err) => {
      console.error("Une erreur s'est produite :", err);
    });
});

