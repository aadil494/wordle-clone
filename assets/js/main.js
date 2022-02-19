document.addEventListener("DOMContentLoaded", function () {
  createBoxes();
  let words = [];
  let guessedWords = [[]];
  let availableSpace = 1;
  let wordSubmitted = false;
  words = httpGet("./five_letter_words.txt")
    .split("\n")
    .map((word) => word.toLowerCase().replace("\r", "")); // get words from file
  console.log(words);
  let word = words[Math.floor(Math.random() * words.length)];
  console.log(word);
  const keys = document.querySelectorAll(".keyboard-row button");
  function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }

  console.log(words);
  function getPressedKey(e) {
    let allowedKeys = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "backspace",
      "enter",
    ];
    let keynum;
    console.log("key pressed");
    if (window.event) {
      // IE
      keynum = e.keyCode;
    } else if (e.which) {
      // Netscape/Firefox/Opera
      keynum = e.which;
    }
    if(keynum === 8){
      return "backspace";
    }
    if (keynum === 13) {
      return "enter";
    }
    console.log(keynum);
    let key = String.fromCharCode(keynum);
    if (!allowedKeys.includes(key.toLowerCase())) {
      return;
    }

    return key;
  }

  function handleSubmitWord() {
    if(wordSubmitted){
      return;
    }
    wordSubmitted = true;
    let currWordArr = getCurrentWordArray();
    let end = guessedWords.length * 5;
    console.log(currWordArr)
    if (currWordArr.length == 5) {
      let currWord = currWordArr.join("");
      if (!words.includes(currWord.toLowerCase())) {
        console.log("Word not in the dictionary");
        return;
      }


      if (currWord === word) {
        for (let i = end; i > end - 5; i--) {
          console.log(i)
          document.getElementById(`${i}`).style.backgroundColor = "green";
        }
      } else if (currWord !== word) {
        for (i = 0; i < currWordArr.length; i++) {
          if (word.includes(currWordArr[i])) {
            console.log("yes")
            elementId = end - 5 + i + 1;

            document.getElementById(`${elementId}`).style.backgroundColor =
              "yellow";
            if (word.indexOf(currWordArr[i]) === i) {
              document.getElementById(`${elementId}`).style.backgroundColor =
                "green";
            }
          }
        }
      }
    }
    guessedWords.push([]);
  }
  function getCurrentWordArray() {
    const numberOfGuessedWords = guessedWords.length;

    return guessedWords[numberOfGuessedWords - 1];

  }
  function updateGuessedWords(letter) {
    wordSubmitted = false;
    const currentWordArray = getCurrentWordArray();
    if (currentWordArray && currentWordArray.length < 5) {
      currentWordArray.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));
      availableSpace += 1;
      availableSpaceEl.textContent = letter;
    }
  }

  function createBoxes() {
    const Grid = document.querySelector("#grid");
    for (let i = 0; i < 30; i++) {
      const box = document.createElement("div");
      box.setAttribute("id", i + 1);
      box.classList.add("box");
      Grid.appendChild(box);
    }
  }
  function handleDeleteLetter() {
    currWordArr = getCurrentWordArray();
    if (currWordArr.length > 0) {
      currWordArr.pop();
      availableSpace -= 1;
      const availableSpaceEl = document.getElementById(String(availableSpace));
      availableSpaceEl.textContent = "";
    }
  }

  for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", ({ target }) => {
      const letter = target.getAttribute("data-key");
      if (letter === "enter") {
        handleSubmitWord();
        return;
      } else if (letter === "del") {
        handleDeleteLetter();
        return;
      }
      updateGuessedWords(letter);
    });
  }
  document.addEventListener("keydown", (e) => {
    key = getPressedKey(e);

    console.log(key);
    if (key === undefined) {
      return;
    }else if (key === "enter") {
      handleSubmitWord();
      return;
    } else if (key === "backspace") {
      handleDeleteLetter();
      return;
    }
    updateGuessedWords(key.toLowerCase());
  });
});
