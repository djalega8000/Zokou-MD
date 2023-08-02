const {zokou}=require("../framework/zokou")




zokou({nomCom:"appel",categorie:"groupe",reaction:"📣"},async(dest,zk,commandeOptions)=>{

  const {ms,repondre,arg,verifGroupe,nomGroupe,infosGroupe,nomAuteurMessage}=commandeOptions

  if(!verifGroupe){repondre("✋🏿 ✋🏿cette commande est réservée aux groupes ❌");return;}
   let mess = arg.join(" ")
  let membresGroupe=verifGroupe?await infosGroupe.participants:""
  var tag=""; let car =`──────▄▌▐▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▌\n───▄▄██▌█ la Caravane du\n▄▄▄▌▐██▌█ bonheur arrive\n███████▌█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌\n▀(⊙)▀▀▀▀▀▀▀(⊙)(⊙)▀▀▀▀▀▀▀▀▀▀(⊙)▀▀`
  
      tag+=`========================\n  
        🌟 *Zokou-Md* 🌟
========================\n
👥 Groupe : ${nomGroupe} 🚀 
👤 Auteur : *${nomAuteurMessage}* 👋 
📜 Message : *${mess}* 📝
========================\n
Powered by 💡 Djalega++ 💡\n

` ;

  

  
let emoji =['🦴','👀','😮‍💨','✔️','😇','⚙️','🔧']
  let random=Math.floor(Math.random()*(emoji.length-1))


   for(const membre of membresGroupe)
    {
       tag+=`${emoji[random]}@${membre.id.split("@")[0]}\n`
    }
     
    

  zk.sendMessage(dest,{text:tag,mentions:membresGroupe.map((i)=>i.id)},{quoted:ms}) 
  
}) ;


zokou({nomCom :"lien",categorie : "groupe",reaction : "🙋"} ,async(dest, zk,commandeOptions) =>{
 const {repondre,nomGroupe,nomAuteurMessage,verifGroupe} =commandeOptions;
  if (!verifGroupe) {repondre("wait bro , tu veux le lien de mon dm?");return;};
        

  var link  = await zk.groupInviteCode(dest)
  var lien = `https://chat.whatsapp.com/${link}`;

let mess = `salut ${nomAuteurMessage} , voici le lien du groupe ${nomGroupe} \n
\n
Lien :${lien}` 
repondre(mess)


}) ;


       
  /*zokou({nomCom : "supp" , categorie : "groupe", } , async ( dest , zk , commandeOptions)=> {

  const {ms,repondre,verifGroupe} = commandeOptions
  if (!verifGroupe) {repondre("commande reserver au groupe uniquement");return;};

    try {  const key = {
      remoteJid: dest,
      id: m.quoted.id,
      participant: m.quoted.sender,
    };
  await zk.sendMessage(dest, { delete: key }) } catch (e) { repondre("j'ai besoin du privileges d'admin pour supprimer des messages")}
  
});*/
