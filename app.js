const text = document.querySelector(".text");

let phrases = [
  "1Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, quasi!",
  "2Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, fuga!",
  "3Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, suscipit!",
];

let phraseAffiche,tabLettres;

let phraseRandom = () => {
  let nbrRand = Math.floor(Math.random() * phrases.length);
  phraseAffiche = phrases[nbrRand];
  text.innerHTML =  phraseAffiche;
  tabLettres = phraseAffiche.split("");
}

phraseRandom();

document.body.addEventListener("keyup",(e)=> {
  // console.log(e.key == tabLettres[1]);

})