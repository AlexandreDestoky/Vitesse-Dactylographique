//SELECTION DU DOM
const text = document.querySelector(".text");
const btnRejouer = document.querySelector(".rejouer");
const erreur = document.querySelector(".erreur");
const timer = document.querySelector(".timer");

//LISTE DE PHRASES
let phrases = ["tomate", "sanglier", "biere"];

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

  //Style par défaut avant même de taper sur une touche
  caracteres[cpt].style.background = "green";
  caracteres[cpt].style.color = "white";
  caracteres[cpt].style.padding = "3px";
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

phraseRandom();
lancement();

erreur.innerHTML = `${nbrErreur} Erreur`;

//DETECTION DES TOUCHES
document.body.addEventListener("keyup", (e) => {
  //on ne détecte les touches que si le test n'est pas fini et que
  //la touche n'est pas maj sinon erreur qd on veut faire un "L" par ex

  if (finiTest == false && e.key != "Shift") {
    //si bonne lettre on fait le style et on avance sinon on met en rouge

    if (e.key == text.textContent[cpt]) {
      caracteres[cpt].style.padding = "0px";
      caracteres[cpt].style.background = "white";
      caracteres[cpt].style.color = "green";

      if (cpt + 1 < caracteres.length) {
        cpt++;
        caracteres[cpt].style.background = "green";
        caracteres[cpt].style.color = "white";
        caracteres[cpt].style.padding = "3px";
      } else {
        console.log("sortie");
        finiTest = true;
        btnRejouer.style.display = "block";
        clearInterval(chrono);
      }
    } else {
      caracteres[cpt].style.background = "red";
      nbrErreur++;
      erreur.innerHTML = `${nbrErreur} Erreur`;
      nbrErreur>1?erreur.innerHTML+="s":"";
    }
  }
  console.log(cpt + " " + caracteres.length);
});

//DETECTION CLICK BTN REJOUER
btnRejouer.addEventListener("click", () => {
  cpt = 0;
  nbrErreur = 0;
  phraseRandom();
  lancement();
  btnRejouer.style.display = "none";
});
