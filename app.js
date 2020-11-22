//SELECTION DU DOM
const text = document.querySelector(".text");
const btnRejouer = document.querySelector(".rejouer");
const score = document.querySelector(".score");
const erreur = document.querySelector(".erreur");
const timer = document.querySelector(".timer");
const annonce = document.querySelector(".annonce");
const btnStart = document.querySelector(".start");

//LISTE DE PHRASES
let phrases = [
  "Bien protégé à l'ouest par une colline culminant à l'altitude de 475 m, cette localité ardennaise se trouve à la naissance d'un vallon.",
  "Le village est traversé par la route nationale 826 Houffalize-Libramont. Il se situe aux confins des communes de Houffalize (hameau de Vellereux) et de Bastogne (village de Vaux). Le village se prolonge au nord par le hameau de Rastate et au sud par celui de Vivrou.",
  "Implantée au sommet d'une petite butte, l'église Saint Martin batie en 1949 dans une architecture contemporaine par l'architecte Léon Lamy d'Arlon a la particularité d'avoir été intégrée à un groupe de maisons et fermes anciennes. La tour du clocher datant de 1897 a été rehaussée en 1959.",
  "L'ermitage de Saint-Gossé et le chemin des Morts se trouvent dans les bois en direction de Recogne. L'ermitage fait toujours l'objet d'un pèlerinage en mémoire de Gossé, un ermite qui vécut à la fin du XVIIe siècle et au début du XVIIIe siècle. Il n'a jamais été béatifié ni canonisé",
  "Compogne possède une école communale. Le club de football du Royal Football Club de Compogne-Bertogne se trouve au hameau de Vivrou. Plusieurs gites ruraux se trouvent dans le village."
];

//VARIABLES DE TRAVAIL
let phraseAffiche, tabLettres;
let cpt = 0;
let finiTest, caracteres;
let nbrRand, nbrRandomPartieAvant;
let nbrErreur = 0;
let chrono;

//GENERE UNE PHRASE ALEATOIRE ET L'AFFICHE
let phraseRandom = () => {
  //on génère une phrase aléatoire a partir du tableau de phrases
  //on relance la génération tant que le nombre est le même que celui de la partie d'avant
  do {
    nbrRand = Math.floor(Math.random() * phrases.length);
    phraseAffiche = phrases[nbrRand];
  } while (nbrRand == nbrRandomPartieAvant);

  nbrRandomPartieAvant = nbrRand;

  //on met la phrase en mettant chaque caractères dans un span pour modifier son affichage plus tard
  tabLettres = phraseAffiche.split("");
  tabLettres = tabLettres.map((i) => "<span>" + i + "</span>");
  text.innerHTML = tabLettres.join("");
};

//INITIALISE LES PARAMETRES PAR DEFAUT
let lancement = () => {
  caracteres = document.querySelectorAll(".text span");
  finiTest = false;
  score.style.border = "";
  //Style par défaut avant même de taper sur une touche
  caracteres[cpt].style.background = "navy";
  caracteres[cpt].style.color = "white";
  caracteres[cpt].style.padding = "3px";
  erreur.innerHTML = `${nbrErreur} Erreur`;
  temps();
};

let temps = () => {
  let m = 0;
  let s = 0;
  timer.innerHTML = `0${m}:0${s}`;
  chrono = setInterval(() => {
    s++;
    s > 9 ? (timer.innerHTML = `0${m}:${s}`) : (timer.innerHTML = `0${m}:0${s}`);
    if (s > 59) {
      s = 0;
      m++;
    }
  }, 1000);
};

//Lancement a l'aide du bouton 
btnStart.addEventListener("click", () => {
  annonce.style.display = "none";
  phraseRandom();
  lancement();
});

//DETECTION DES TOUCHES
document.body.addEventListener("keyup", (e) => {
  //on ne détecte les touches que si le test n'est pas fini et que
  //la touche n'est pas maj sinon erreur qd on veut faire un "L" par ex

  if (finiTest == false && e.key != "Shift") {
    //si bonne lettre on fait le style et on avance sinon on met en rouge

    if (e.key == text.textContent[cpt]) {
      caracteres[cpt].style.padding = "0px";
      caracteres[cpt].style.background = "white";
      caracteres[cpt].style.color = "navy";

      if (cpt + 1 < caracteres.length) {
        cpt++;
        caracteres[cpt].style.background = "navy";
        caracteres[cpt].style.color = "white";
        caracteres[cpt].style.padding = "3px";
      } else {
        finiTest = true;
        setTimeout(() => {
          btnRejouer.style.display = "block";
        }, 500);
        clearInterval(chrono);
        score.style.border = "10px solid navy";
      }
    } else {
      caracteres[cpt].style.background = "red";
      nbrErreur++;
      erreur.innerHTML = `${nbrErreur} Erreur`;
      nbrErreur > 1 ? (erreur.innerHTML += "s") : "";
    }
  }
});

//DETECTION CLICK BTN REJOUER
btnRejouer.addEventListener("click", () => {
  cpt = 0;
  nbrErreur = 0;
  phraseRandom();
  lancement();
  btnRejouer.style.display = "none";
});
