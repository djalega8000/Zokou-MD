const { zokou } = require('../framework/zokou');
const { apksearch } = require('apkdl-scraper');

zokou({ nomCom: "apksearch", categorie: "recherche" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  
  if (!arg[0]) {
    repondre("Veuillez insérer le nom d'une application APK à rechercher");
    return;
  }
  
  const nomApplication = arg.join(' ');

  try {
    const searchResults = await apksearch(nomApplication);
    if (searchResults.length === 0) {
      repondre("Aucun résultat trouvé pour l'application " + nomApplication);
      return;
    }

    let mess = "Résultats de recherche :\n Utiliser la commande apkdl pour avoir les liens de téléchargement de ces applications.\n";
    for (let i = 0; i < searchResults.length; i++) {
      mess += `----------------\nTitre : ${searchResults[i].title}\nLien : ${searchResults[i].link}\n\n`;
    }

    await zk.sendMessage(
      dest,
      {
        text: mess,
      },
      { quoted: ms }
    );
  } catch (e) {
    repondre("Erreur lors de la recherche de l'application \n" + e);
  }
});

const {apkdl } = require('apkdl-scraper');

zokou({ nomCom: "apkdl", categorie: "téléchargement" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  
  if (!arg[0]) {
    repondre("Veuillez insérer le lien d'une application APK à consulter");
    return;
  }
  
  const lienApk = arg.join(' ');

  try {
    const apk = await apkdl(lienApk);

    

    const message = `Lien de téléchargement : ${apk.dllink}\nTaille : ${apk.size} \n Cliquer sur le lien de téléchargement et choisir votre navigateur web de préférence pour debuter le téléchargement.\n`;
    await zk.sendMessage(
      dest,
      {
        text: message,
      },
      { quoted: ms }
    );
  } catch (e) {
    repondre("Erreur lors de la consultation de l'application \n" + e);
  }
});

