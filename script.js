const textArea = document.getElementById("texte");
const lettreCod = document.getElementById("lettreCod");
const codeButton = document.getElementById("codeButton");
const decodeButton = document.getElementById("decodeButton");
const result = document.getElementById("result");
const radioLettre = document.getElementById("radioLettre");
const radioPhrase = document.getElementById("radioPhrase");
const phrCod = document.getElementById("phraseCodeuse");

const l = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
          "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  
const chr = [" ", "'", "\n", ",", "."];

let display = 1;

function getNumberOfLetter(letter) { 
  for (let index = 0; index < l.length; index++) {
    if (letter === l[index]) {
      return index + 1;
    }
  }
}


function getLetterOfNumber(num) {
  for (let index = 0; index < l.length; index++) {
    if (num === index + 1) {
      return l[index];
    }     
  }
}


function slicePhrase(phr) {
  let derIndice = -1;
  let mots = [];

  for (let index = 0; index < phr.length; index++) {
    if (phr[index] == " " || phr[index] == "\n") {
      mots.push(phr.slice(derIndice + 1, index))
      derIndice = index;
    }
  }
  mots.push(phr.slice(derIndice + 1));
  return mots;
}


function getLettreCodeuse() {
  let listeMots = slicePhrase(phrCod.value);
  
  for (let mot = 0; mot < listeMots.length; mot++) {
    let lettres = [];
    for (let lettre = 0; lettre < listeMots[mot].length; lettre++) {lettre
      if (lettres.indexOf(listeMots[mot][lettre]) >= 0) {
        console.log(listeMots[mot][lettre])
        return listeMots[mot][lettre];
      }
      else {
        lettres.push(listeMots[mot][lettre]);
      }
    }
  }
  result.textContent = "Phrase codeuse invalide";
  result.style.color = "rgb(255, 25, 25)";
  return;
}


function decode() {
  let decallage = lettreCod.selectedIndex;
  let phr = textArea.value;
  let phrDec = "";

  phr = phr.toUpperCase();

  if (display > 0) {
    let lcod = getLettreCodeuse();
    lcod = lcod.toUpperCase();
    decallage = getNumberOfLetter(lcod);
    console.log(decallage);
  }

  if (decallage === 0) {
    result.textContent = "Veuillez selectionner une lettre codeuse";
    result.style.color = "rgb(255, 25, 25)";
    return;
  }

  for (let index = 0; index < phr.length; index++) {
    if (chr.indexOf(phr[index]) === -1) {
      let numValue =  getNumberOfLetter(phr[index]) - decallage;
      if (numValue < 1) {
        numValue += 26;
      }
      phrDec += getLetterOfNumber(numValue);
    }
    else if (phr[index] === " ") {
      phrDec += " ";
    }
    else if (phr[index] === "'") {
      phrDec += "'";
    }
    else if (phr[index] === "\n") {
      phrDec += " ";
    } 
    else if (phr[index] === ",") {
      phrDec += ",";
    }
    else if (phr[index] === ".") {
      phrDec += ".";
    }
  }
  result.textContent = phrDec;
  result.style.color = "rgb(255, 255, 255)";
}


function code() {
  const decallage = lettreCod.selectedIndex;
  let phr = textArea.value;
  let phrDec = "";

  phr = phr.toUpperCase();

  if (decallage === 0) {
    result.textContent = "Veuillez selectionner une lettre codeuse";
    result.style.color = "rgb(255, 25, 25)";
    return;
  }
  
  for (let index = 0; index < phr.length; index++) {
    if (chr.indexOf(phr[index]) === -1) {
      let numValue =  getNumberOfLetter(phr[index]) + decallage;
      if (numValue > 26) {
        numValue -= 26;
      }
      phrDec += getLetterOfNumber(numValue);
    }
    else if (phr[index] === " ") {
      phrDec += " ";
    }
    else if (phr[index] === "'") {
      phrDec += "'";
    }
    else if (phr[index] === "\n") {
      phrDec += " ";
    }
    else if (phr[index] === ",") {
      phrDec += ",";
    }
    else if (phr[index] === ".") {
      phrDec += ".";
    }
  }
  result.textContent = phrDec;
  result.style.color = "rgb(255, 255, 255)";
}

function updateDisplay() {
  display *= -1;
  if (display < 0) {
    lettreCod.style.display = "block";
    phrCod.style.display = "none";
    lettreCod.style.marginTop = "-15px";
  }
  else {
    lettreCod.style.display = "none";
    phrCod.style.display = "block";
    phrCod.style.marginBottom = "-15px";
  }
}

decodeButton.onclick = () => {
  decode();  
}

codeButton.onclick = () => {
  code();
}

radioLettre.addEventListener('change', updateDisplay);
radioPhrase.addEventListener('change', updateDisplay);

updateDisplay();
