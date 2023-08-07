const {zokou} = require ('../framework/zokou')


zokou({ nomCom: "citation", categorie: "fun" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe } = commandeOptions;
  if (!verifGroupe) {
    repondre("commande réservée au groupe uniquement");
    return;
  }

  try {
    fetch("https://animechan.xyz/api/random")
      .then((response) => response.json())
      .then((quote) => repondre(`╔══════════════════════════╗
║   Zokou-md               ║
╚══════════════════════════╝

🎬 Anime: ${quote.anime}
👤 Character: ${quote.character}
💬 Quote: ${quote.quote}

᚛M๏𝓷keℽ D Lบffy᚜ powered by`));
  } catch (e) {
    repondre("erreur lors de la génération de la citation " + e);
  }
});
