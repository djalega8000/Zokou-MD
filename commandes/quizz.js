
const { zokou } = require('../framework/zokou');

// Définir les questions et les réponses
const questions = [
  {
    question: "Quel est le nom du protagoniste principal dans l'anime 'Death Note' ?",
    options: ["L Lawliet", "Light Yagami", "Ryuk"],
    answer: 1,
  },
  {
    question: "Dans quel anime l'histoire suit les aventures de Eren Yeager dans sa quête de vengeance contre les Titans ?",
    options: ["Attack on Titan", "Naruto", "One Piece"],
    answer: 0,
  },
  {
    question: "Quel est le nom du mystérieux homme masqué dans l'anime 'Tokyo Ghoul' ?",
    options: ["Ken Kaneki", "Touka Kirishima", "Uta"],
    answer: 2,
  },
  {
    question: "Dans quel anime l'histoire suit Edward et Alphonse Elric dans leur quête pour retrouver leurs corps après une expérience d'alchimie qui a mal tourné ?",
    options: ["Fullmetal Alchemist", "Bleach", "Fairy Tail"],
    answer: 0,
  },
  {
    question: "Quel est le nom du principal rival de Yuugi dans l'anime 'Yu-Gi-Oh!' ?",
    options: ["Kaiba Seto", "Joey Wheeler", "Yami Marik"],
    answer: 0,
  },
  {
    question: "Dans quel anime les protagonistes sont-ils membres du bataillon de police de Tokyo et enquêtent sur des événements surnaturels ?",
    options: ["Psycho-Pass", "Steins;Gate", "Cowboy Bebop"],
    answer: 0,
  },
  {
    question: "Quel est le nom du mystérieux pirate de l'anime 'One Piece' qui possède un pouvoir de fruit du démon qui lui permet de transformer son corps en caoutchouc ?",
    options: ["Trafalgar Law", "Roronoa Zoro", "Monkey D. Luffy"],
    answer: 2,
  },
  {
    question: "Dans quel anime l'histoire suit-elle les aventures de Guts, un guerrier solitaire muni d'une énorme épée appelée la Dragon Slayer ?",
    options: ["Berserk", "Goblin Slayer", "Demon Slayer"],
    answer: 0,
  },
  {
    question: "Quel est le nom du groupe de tueurs de Titans dans l'anime 'Attack on Titan' ?",
    options: ["Les Chevaliers de l'Ordre", "Les Recon Corps", "Les Brigades de la Liberté"],
    answer: 1,
  },
  {
    question: "Dans quel anime l'histoire suit-elle le parcours de Gon Freecss pour devenir un Hunter professionnel ?",
    options: ["Hunter x Hunter", "My Hero Academia", "Black Clover"],
    answer: 0,
  },
];


let currentQuestion = 0;

zokou({ nomCom: "quizz", categorie: "fun" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (arg[0] && arg[0].toLowerCase() === "start") {
    // Commencer le jeu
    currentQuestion = 0;
    await askQuestion(dest, zk, ms, repondre);
  } else if (currentQuestion > 0) {
    // Attendre 10 secondes avant de passer à la question suivante
    await sleep(10000);

    // Compte à rebours de 10 à 0
    for (let i = 10; i > 0; i--) {
      await zk.sendMessage(dest, { text: `Temps restant : ${i} secondes` }, { quoted: ms });
      await sleep(1000);
    }

    // Afficher la réponse
    const answerText = `La réponse était : ${questions[currentQuestion - 1].options[questions[currentQuestion - 1].answer]}`;
    await zk.sendMessage(dest, { text: answerText }, { quoted: ms });

    currentQuestion++;

    if (currentQuestion > questions.length) {
      // Le jeu est terminé
      await zk.sendMessage(
        dest,
        {
          text: "Félicitations ! Vous avez terminé le quiz !",
        },
        { quoted: ms }
      );
    } else {
      // Poser la prochaine question
      await askQuestion(dest, zk, ms, repondre);
    }
  } else if (!arg[0]) {
    repondre("Pour commencer le jeu, tapez 'start'");
  }
});

async function askQuestion(dest, zk, ms, repondre) {
  const question = questions[currentQuestion];
  const optionsString = question.options.map((option, index) => `${index + 1}. ${option}`).join("\n");

  await zk.sendMessage(
    dest,
    {
      text: `Question ${currentQuestion + 1}: ${question.question}\n\n${optionsString}`,
    },
    { quoted: ms }
  );
}

// Fonction pour attendre un certain temps
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
