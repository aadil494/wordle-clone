document.addEventListener("DOMContentLoaded", function () {
  createBoxes();
  let guessedWords = [[]];
  let availableSpace = 1;
  let word = "dairy";
  const keys = document.querySelectorAll(".keyboard-row button");
  function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }

  function handleSubmitWord() {
    let currWordArr = getCurrentWordArray();
    let end = guessedWords.length * 5;
    if (currWordArr.length == 5) {
      let currWord = currWordArr.join("");
      if (
        httpGet(
          "https://api.dictionaryapi.dev/api/v2/entries/en/" + currWord
        ).includes(
          "Sorry pal, we couldn't find definitions for the word you were looking for"
        )
      ) {
        alert("Word not found");
        return;
      }

      if (currWord === word) {
        for (let i = end; i > end - 5; i--) {
          document.getElementById(`${i}`).style.backgroundColor = "green";
        }
      } else if (currWord !== word) {
        for (i = 0; i < currWordArr.length; i++) {
          if (word.includes(currWordArr[i])) {
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
});
