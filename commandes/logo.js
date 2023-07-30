const { zokou } = require("../framework/zokou");
var mumaker = require("mumaker");
zokou({ nomCom: "hacker",
    categorie: "Logo", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { prefixe, arg, ms, repondre } = commandeOptions;
    if (!arg || arg == "") {
        repondre("*__Exemple : * " + prefixe + "hacker Zokou");
        return;
    }
    try {
        let radio = "984dd03e-220d-4335-a6ba-7ac56b092240";
        let anu = await mumaker.ephoto4("https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html", arg, radio); //
        //
        let res = Object.values(anu)[3];
        // console.log("&€"+res);
        let lien = "https://e1.yotools.net" + res;
        repondre("*  traitement en cour ... *");
        await zk.sendMessage(origineMessage, { image: { url: lien }, caption: "* \t Logo by Zokou-Md*" }, { quoted: ms });
    }
    catch (e) {
        repondre("🥵🥵 " + e);
    }
});
zokou({ nomCom: "dragonball", categorie: "Logo", reaction: "🐉" }, async (dest, zk, commandeOptions) => {
    let { arg, repondre, prefixe, ms } = commandeOptions;
    try {
        const noArgMsg = `*_EXEMPLE *:  ${prefixe}dragonball Djalega++`;
        //  if(arg=='') {await zok.sendMessage(dest,{text:noArgMsg},{quoted:infoMessage}); return;}
        if (arg == '' || !arg) {
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
        await zk.sendMessage(dest, { text: " *\t Traitement en cours ...*" }, { quoted: ms });
        var idImg = Object.values(imgInfo)[3];
        console.log("le " + idImg);
        var lienImage = "https://e1.yotools.net" + idImg;
        var msgs = "     logo by Zokou-Md ";
        await zk.sendMessage(dest, { image: { url: lienImage }, caption: `*${msgs}*` }, { quoted: ms });
    }
    catch (e) {
        repondre("🥵🥵 " + e);
    }
});
////////////////////////////
zokou({ nomCom: "naruto", categorie: "Logo", reaction: "⛩" }, async (dest, zk, commandeOptions) => {
    let { ms, arg, repondre, prefixe } = commandeOptions;
    try {
        if (!arg || arg == '') {
            repondre("*_Exemple : * " + prefixe + "naruto Zokou");
            return;
        }
        //let img= await //mumaker.textpro('https://textpro.me/create-naruto-logo-style-text-effect-online-1125.html',arg);
        repondre("*traitement en cours...*");
        //await zk.sendMessage(dest,{image:{url:img},caption:"\n *Logo by Zokou *"},{quoted:ms});
    }
    catch (e) {
        repondre("🥵🥵 " + e);
    }
});
