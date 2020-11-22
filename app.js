const text = document.querySelector(".text");

let phrases = [
  "lorem quasi!",
  // "2Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, fuga!",
  // "3Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, suscipit!",
];

let phraseAffiche, tabLettres;
let cpt = 0;

let phraseRandom = () => {
  //on génère une phrase aléatoire a partir du tableau de phrases
  let nbrRand = Math.floor(Math.random() * phrases.length);
  phraseAffiche = phrases[nbrRand];
  //on met la phrase en mettant chaque caractères dans un span pour modifier son affichage plus tard
  tabLettres = phraseAffiche.split("");
  tabLettres = tabLettres.map((i) => "<span>" + i + "</span>");
  text.innerHTML = tabLettres.join("");
};

phraseRandom();
let caracteres = document.querySelectorAll(".text span");
let finiTest = false;

//Style par défaut avant même de taper sur une touche
caracteres[cpt].style.background = "green";
caracteres[cpt].style.color = "white";
caracteres[cpt].style.padding = "3px";

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
        rejouer();
      }
    } else {
      caracteres[cpt].style.background = "red";
    }
  }
  console.log(cpt + " " + caracteres.length);

});

let rejouer = () => {
  
}