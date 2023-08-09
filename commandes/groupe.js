

const {zokou}=require("../framework/zokou")
const {getGroupe}=require("../bdd/groupe")
const {ajouterGroupe}=require("../bdd/groupe")




zokou({nomCom:"appel",categorie:"Groupe",reaction:"📣"},async(dest,zk,commandeOptions)=>{

  const {ms,repondre,arg,verifGroupe,nomGroupe,infosGroupe,nomAuteurMessage,verifAdmin}=commandeOptions
     

  if(!verifAdmin) {repondre("Commande reserver a l'administration, Apprend a connaitre ton rang");return;}

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
\n

` ;

  

  
let emoji =['🦴','👀','😮‍💨','❌','✔️','😇','⚙️','🔧','🎊','😡','🙏🏿','⛔️','$']
  let random=Math.floor(Math.random()*(emoji.length-1))


   for(const membre of membresGroupe)
    {
       tag+=`${emoji[random]} @${membre.id.split("@")[0]}\n`
    }
     
    

  zk.sendMessage(dest,{text:tag,mentions:membresGroupe.map((i)=>i.id)},{quoted:ms}) 
  
}) ;


zokou({nomCom :"lien",categorie : "Groupe",reaction : "🙋"} ,async(dest, zk,commandeOptions) =>{
 const {repondre,nomGroupe,nomAuteurMessage,verifGroupe} =commandeOptions;
  if (!verifGroupe) {repondre("wait bro , tu veux le lien de mon dm?");return;};
        

  var link  = await zk.groupInviteCode(dest)
  var lien = `https://chat.whatsapp.com/${link}`;

let mess = `salut ${nomAuteurMessage} , voici le lien du groupe ${nomGroupe} \n

Lien :${lien}` 
repondre(mess)


}) ;
/** *nommer un membre comme admin */
zokou({nomCom : "nommer" , categorie : "Groupe",reaction:"👨🏿‍💼"},async ( dest , zk , commandeOptions)=>
  {
    let {ms,repondre,msgRepondu,infosGroupe,auteurMsgRepondu,verifAdmin,verifZokouAdmin,verifGroupe,utilisateur,mbre,auteurMessage,superUser,idBot}=commandeOptions;
    let membresGroupe=verifGroupe?await infosGroupe.participants:""
    if(!verifGroupe){return repondre("Pour les groupe uniquement");}

   
    const verifMember= (user)=>
    {
      
          for(const m of membresGroupe)
      {
        if(m.id!==user)
        {
         continue;
        }
        else{return true}
          //membre=//(m.id==auteurMsgRepondu? return true) :false;
      }
    }

    const memberAdmin = (membresGroupe)=>
      {
        let admin=[];
           for(m of membresGroupe)
      {
          if(m.admin ==null) continue;
        admin.push(m.id);
          
         }
       // else{admin= false;}
        return admin;
      }
      
const a= verifGroupe? memberAdmin(membresGroupe):'';
   

     let admin =verifGroupe?a.includes(auteurMsgRepondu):false;
    let membre =verifMember(auteurMsgRepondu)
    let autAdmin=verifGroupe?a.includes(auteurMessage):false;
    zkad=verifGroupe?a.includes(idBot):false;
    try{
       // repondre(verifZokouAdmin)

    if(autAdmin ||superUser)
    {
           if(msgRepondu)
           {
                if(zkad)
                {
                  if(membre)
                  {
                    if(admin==false)
                    { 
                      var txt=`🎊🎊🎊  @${auteurMsgRepondu.split("@")[0]} est monté(e) en grade.\n
                      il/elle a été nommé(e) administrateur du groupe.`
                      await zk.groupParticipantsUpdate(dest,[auteurMsgRepondu],"promote");
                      zk.sendMessage(dest,{text:txt,mentions:[auteurMsgRepondu]})
                 }else{return repondre("Ce membre est déja administrateur du groupe.")}
                    
                 }else{return repondre("Cet utilisateur ne fait pas partir du groupe.");}
                }
            else{return repondre("Désolé je ne peut pas effectuer cette action car je ne suis pas administrateur du groupe .")}
             
           }else{repondre("veuiller taguer le membre à nommer");}
   }else{return repondre("Désolé je ne peut pas effectuer cette action car vous n'êtes pas administrateur du groupe .")}
    }catch(e){repondre("oups "+e)}
    
  })
 
  //fin nommer
/** ***demettre */

 zokou({nomCom : "demettre" , categorie : "Groupe",reaction:"👨🏿‍💼"},async ( dest , zk , commandeOptions)=>
  {
    let {ms,repondre,msgRepondu,infosGroupe,auteurMsgRepondu,verifAdmin,verifZokouAdmin,verifGroupe,utilisateur,mbre,auteurMessage,superUser,idBot}=commandeOptions;
    let membresGroupe=verifGroupe?await infosGroupe.participants:""
    if(!verifGroupe){return repondre("Pour les groupe uniquement");}

   
    const verifMember= (user)=>
    {
      
          for(const m of membresGroupe)
      {
        if(m.id!==user)
        {
         continue;
        }
        else{return true}
          //membre=//(m.id==auteurMsgRepondu? return true) :false;
      }
    }

    const memberAdmin = (membresGroupe)=>
      {
        let admin=[];
           for(m of membresGroupe)
      {
          if(m.admin ==null) continue;
        admin.push(m.id);
          
         }
       // else{admin= false;}
        return admin;
      }
      
const a= verifGroupe? memberAdmin(membresGroupe):'';
   

     let admin =verifGroupe?a.includes(auteurMsgRepondu):false;
    let membre =verifMember(auteurMsgRepondu)
    let autAdmin=verifGroupe?a.includes(auteurMessage):false;
    zkad=verifGroupe?a.includes(idBot):false;
    try{
       // repondre(verifZokouAdmin)

    if(autAdmin||superUser)
    {
           if(msgRepondu)
           {
                if(zkad)
                {
                  if(membre)
                  {
                    if(admin==false)
                    { 

                      repondre("Ce membre n'est pas un  administrateur du groupe.")
                      
                 }else{ var txt=`@${auteurMsgRepondu.split("@")[0]} a été  démis de ses fonctions d'administrateur du groupe..\n`
                      await zk.groupParticipantsUpdate(dest,[auteurMsgRepondu],"demote");
                      zk.sendMessage(dest,{text:txt,mentions:[auteurMsgRepondu]})}
                    
                 }else{return repondre("Cet utilisateur ne fait pas partir du groupe.");}
                }
            else{return repondre("Désolé je ne peut pas effectuer cette action car je ne suis pas administrateur du groupe .")}
             
           }else{repondre("veuiller taguer le membre à démettre");}
   }else{return repondre("Désolé je ne peut pas effectuer cette action car vous n'êtes pas administrateur du groupe .")}
    }catch(e){repondre("oups "+e)}
    
  })
 


/** ***fin démettre****  **/
/** **retirer** */
 zokou({nomCom : "retirer" , categorie : "Groupe",reaction:"👨🏿‍💼"},async ( dest , zk , commandeOptions)=>
  {
    let {ms,repondre,msgRepondu,infosGroupe,auteurMsgRepondu,verifAdmin,verifZokouAdmin,verifGroupe,utilisateur,mbre,auteurMessage,superUser,idBot}=commandeOptions;
    let membresGroupe=verifGroupe?await infosGroupe.participants:""
    if(!verifGroupe){return repondre("Pour les groupe uniquement");}

   
    const verifMember= (user)=>
    {
      
          for(const m of membresGroupe)
      {
        if(m.id!==user)
        {
         continue;
        }
        else{return true}
          //membre=//(m.id==auteurMsgRepondu? return true) :false;
      }
    }

    const memberAdmin = (membresGroupe)=>
      {
        let admin=[];
           for(m of membresGroupe)
      {
          if(m.admin ==null) continue;
        admin.push(m.id);
          
         }
       // else{admin= false;}
        return admin;
      }
      
const a= verifGroupe? memberAdmin(membresGroupe):'';
   

     let admin =verifGroupe?a.includes(auteurMsgRepondu):false;
    let membre =verifMember(auteurMsgRepondu)
    let autAdmin=verifGroupe?a.includes(auteurMessage):false;
    zkad=verifGroupe?a.includes(idBot):false;
    try{
       // repondre(verifZokouAdmin)

    if(autAdmin||superUser)
    {
           if(msgRepondu)
           {
                if(zkad)
                {
                  if(membre)
                  {
                    if(admin==false)
                    { 

                     
                      var txt=`@${auteurMsgRepondu.split("@")[0]} a été rétiré du groupe..\n`
                      await zk.groupParticipantsUpdate(dest,[auteurMsgRepondu],"remove");
                      zk.sendMessage(dest,{text:txt,mentions:[auteurMsgRepondu]})
                      
                 }else{  repondre("Ce membre ne peut pas être rétirer car il est un  administrateur du groupe.")}
                    
                 }else{return repondre("Cet utilisateur ne fait pas partir du groupe.");}
                }
            else{return repondre("Désolé je ne peut pas effectuer cette action car je ne suis pas administrateur du groupe .")}
             
           }else{repondre("veuiller taguer le membre à rétirer");}
   }else{return repondre("Désolé je ne peut pas effectuer cette action car vous n'êtes pas administrateur du groupe .")}
    }catch(e){repondre("oups "+e)}
    
  })
 

/** *****fin retirer */


  zokou({nomCom : "supp" , categorie : "Groupe" } , async ( dest , zk , commandeOptions)=> {

  const {ms,repondre,verifGroupe,auteurMsgRepondu,verifAdmin} = commandeOptions
  if (!verifGroupe) {repondre("commande reserver au groupe uniquement") ; return };
    if (verifAdmin) { repondre("Commande reserver a l'administration, Apprend a connaitre ton rang"); return;};

    try {
  await zk.sendMessage(dest, { delete: auteurMsgRepondu.key }) } catch (e) { repondre("j'ai besoin du privileges d'admin pour supprimer des messages")}
  
});

zokou({nomCom : "info", categorie : "Groupe"},async (dest,zk,commandeOptions)=>{
  const {ms,repondre,verifGroupe,verifZokouAdmin} = commandeOptions;
    if (!verifGroupe) {repondre("commande réservée au groupe uniquement") ; return}  ;

  if(!verifZokouAdmin)
  {
     const ppgroup = await zk.profilePictureUrl(dest)

  const info = await zk.groupMetadata(dest) 

  /*console.log(metadata.id + ", title: " + metadata.subject + ", description: " + metadata.desc)*/

  
  let mess = {
     image : { url : ppgroup},
     caption : ` ----------------\n
     Nom du groupe : ${info.subject}\n
     Description du groupe : ${info.desc}`
  }
    

   zk.sendMessage(dest,mess,{quoted:ms})
  }else{repondre("Désolé je ne peux pas effectuer cette action car je ne suis pas un administrateur du groupe.")}
 
  
  
})




zokou({nomCom:"antilien",categorie:"Groupe",reaction:"🔗"},async(dest,zk,commandeOptions)=>{

  
      var {ms,repondre,arg,verifGroupe,auteurMessage,superUser, verifZokouAdmin,verifAdmin,dev}=commandeOptions;
  var b = arg.join(" ")
  console.log(b)
  if(!verifGroupe)
  {
    return repondre("*uniquement pour les groupes*");
  }
     try{
          if(!arg||arg=="")
          {
            return;
          }

       if(b=="oui")
       { 
         if(!dev)
         {
           if(!verifAdmin)
           {repondre("Désolé vous ne pouver activer l'antilien car vous n'êtes pas admistrateur du groupe.") ;return;}
           // ajouterGroupe(dest,b);
              //repondre("antilien activé avec succès!")
            if(verifZokouAdmin)
            {
              
              ajouterGroupe(dest,b);
              repondre("antilien activé avec succès!")
            }else{repondre("Action impossible car je ne suis pas administrateur de groupe.")}
         }else
         {
            ajouterGroupe(dest,b);
              repondre("antilien activé avec succès!")
           
         }
       
       }else if(b=="non")
       {
         let req=await getGroupe(dest);
              if(!dev)
         {
           
           if(!verifAdmin)
           {repondre("Désolé vous ne pouver désactiver l'antilien car vous n'êtes pas admistrateur du groupe."); return;}

         /* for(const)
             {
               
             }*/
            ajouterGroupe(dest,b);
              repondre("antilien désactivé avec succès!")
          /*  if(verifZokouAdmin)
            {
              
              ajouterGroupe(dest);
              repondre("antilien activé avec succès!")
            }else{repondre("Action impossible car je ne suis pas administrateur de groupe.")}*/
         }else
         {
            ajouterGroupe(dest,b);
              repondre("antilien désactivé avec succès!")
           
         }
       }
     }catch(e){}
  
})
