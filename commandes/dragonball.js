const mumaker = require('mumaker');
module.exports.commande = () => {
    var nomCom = ["dragonball"];
    return { nomCom, execute };
};
async function execute(dest, zok, argument, msg) {
    const noArgMsg = " *voici comment faire : dragonball Djalega++* ";
    if (argument == '') {
        await zok.sendMessage(dest, { text: noArgMsg }, { quoted: msg });
        return;
    }
    const lienMaker = "https://ephoto360.com/tao-hieu-ung-chu-phong-cach-dragon-ball-truc-tuyen-1000.html";
    const lienMaker2 = "https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html";
    const radio = "e0723d60-fc0d-421f-bf8f-a9b9b61e4be6";
    console.log('argument ' + argument);
    //  try{
    const radio2 = "e0723d60-fc0d-421f-bf8f-a9b9b61e4be6";
    var imgInfo = await mumaker.ephoto4(lienMaker2, argument, radio);
    // }catch(e){ await zok.sendMessage(dest,{text:e},{quoted:msg}) }
    await zok.sendMessage(dest, { text: " *Traitement en cours ...*" }, { quoted: msg });
    var idImg = Object.values(imgInfo)[3];
    console.log("le " + idImg);
    var lienImage = "https://e1.yotools.net" + idImg;
    var ms = "     logo by Zokou-Md ";
    await zok.sendMessage(dest, { image: { url: lienImage }, caption: `*${ms}*` }, { quoted: msg });
}
