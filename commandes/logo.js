const mumaker = require('mumaker');
console.log("le menu");
module.exports.commande = () => {
    var nomCom = ["dragonball", "dragon"];
    var reaction = "🐉";
    var categorie = "Logo";
    return { nomCom, execute, reaction, categorie };
};
async function execute(dest, zok, commandeOptions) {
    let { arg, repondre, prefixe, infoMessage } = commandeOptions;
    const noArgMsg = `*_EXEMPLE *:  ${prefixe}dragonball Djalega++`;
    //  if(arg=='') {await zok.sendMessage(dest,{text:noArgMsg},{quoted:infoMessage}); return;}
    if (arg == '') {
        repondre(noArgMsg);
        return;
    }
    var lienMaker = "https://ephoto360.com/tao-hieu-ung-chu-phong-cach-dragon-ball-truc-tuyen-1000.html";
    var lienMaker2 = "https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html";
    var radio = "e0723d60-fc0d-421f-bf8f-a9b9b61e4be6";
    console.log('argument ' + arg);
    //  try{
    var radio2 = "e0723d60-fc0d-421f-bf8f-a9b9b61e4be6";
    const imgInfo = await mumaker.ephoto4(lienMaker2, arg, radio);
    // }catch(e){ await zok.sendMessage(dest,{text:e},{quoted:msg}) }
    await zok.sendMessage(dest, { text: " *Traitement en cours ...*" }, { quoted: infoMessage });
    var idImg = Object.values(imgInfo)[3];
    console.log("le " + idImg);
    var lienImage = "https://e1.yotools.net" + idImg;
    var ms = "     logo by Zokou-Md ";
    await zok.sendMessage(dest, { image: { url: lienImage }, caption: `*${ms}*` }, { quoted: infoMessage });
}
