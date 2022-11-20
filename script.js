const textArea = document.getElementById("texte");
const lettreCod = document.getElementById("lettreCod");
const codeButton = document.getElementById("codeButton");
const decodeButton = document.getElementById("decodeButton");
const result = document.getElementById("result");

const l = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
          "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  
const chr = [" ", "'", "\n", ",", "."];

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

function decode() {
  const decallage = lettreCod.selectedIndex;
  let phr = textArea.value;
  let phrDec = "";

  phr = phr.toUpperCase();

  if (decallage === 0) {
    result.textContent = "Veuillez selectionner une lettre codeuse";
    result.style.color = "rgb(255, 25, 25)"
    return
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
  result.style.color = "rgb(255, 255, 255)"
}

function code() {
  const decallage = lettreCod.selectedIndex;
  let phr = textArea.value;
  let phrDec = "";

  phr = phr.toUpperCase();

  if (decallage === 0) {
    result.textContent = "Veuillez selectionner une lettre codeuse";
    result.style.color = "rgb(255, 25, 25)"
    return
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
  result.style.color = "rgb(255, 255, 255)"
}

decodeButton.onclick = () => {
  decode();
}

codeButton.onclick = () => {
  code();
}
