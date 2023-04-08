const gameContainer = document.getElementById("game");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS); //CALL ON LOAD

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color); //Class = colorVal;
    newDiv.accessKeyLabel = color; //Give a key to access
    newDiv.setAttribute("disabled", "disabled");
    newDiv.innerHTML = " 👾 ";

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// Function will create a div element that is layered on top of our game
function createStartMenu() {
  const startMenu = document.createElement("button");
  startMenu.className = "Menu";
  startMenu.innerHTML = "Start game!";
  startMenu.addEventListener("click", handleMenuClick);
  gameContainer.appendChild(startMenu);
}
// when the DOM loads
createStartMenu();
createDivsForColors(shuffledColors); //Shuffles the whole array of DIV COLORS

let storePreviousClick;
let clickCounter = 0;
/*
  handleCardClick(event):
    The function keeps track of the number of clicks using the `clickCounter` variable and 
    stores the previous clicked card in the `storePreviousClick` variable. The function first 
    flips the first clicked card and highlights it. On the second click, it checks if the second 
    clicked card matches the first one. If it does, it highlights the matched cards and keeps 
    them flipped. If it doesn't, it reveals the second clicked card for one second and then 
    hides it again. The function also handles the case where the user clicks on the same card twice,
    which is not allowed in the game. Finally, the function limits the number of clicks to two per turn.
    
*/
// TODO: Implement this function!
function handleCardClick(event) {
  if (event.target.hasAttribute("disabled")) {
    //Disabled until start game is pressed
  } else {
    clickCounter++;
    if (clickCounter === 1) {
      // Toggle class to flip card
      event.target.classList.toggle("face--back");
      // Highlight selected card
      event.target.style.backgroundColor = event.target.accessKeyLabel;
      event.target.accessKey = "Selected";
      // Store the first clicked card for comparison with the second click
      storePreviousClick = event.target;
    }
    if (clickCounter === 2) {
      // If the second clicked card matches the first one
      if (
        event.target.accessKeyLabel === storePreviousClick.accessKeyLabel &&
        event.target.accessKey.length === 0
      ) {
        console.log("***MATCH***");
        // Highlight the matched cards
        event.target.style.backgroundColor = storePreviousClick.accessKeyLabel;
        event.target.accessKey = "Selected";
        // Keep matched cards flipped
        event.target.classList.toggle("face--back");
        storePreviousClick = "";
        clickCounter = 0;
      } else {
        console.log("***NOT A MATCH***");
        // If the second clicked card is the same as the first one, de-select it
        if (event.target.accessKey.length !== 0) {
          storePreviousClick.style.backgroundColor = "";
          storePreviousClick.accessKey = "";
          storePreviousClick.classList.remove("face--back");
          console.log("~~~GOTCHA CANNOT SELECT SAME CARD~~~");
          clickCounter = 0;
        } else {
          // Reveal the second clicked card that did not match for one second
          event.target.classList.toggle("face--back");
          event.target.style.backgroundColor = event.target.accessKeyLabel;
          let revealCard = 1;
          let timeOut = setTimeout(function showCard() {
            while (revealCard > 0) {
              revealCard--;
            }
            // Clear the second card
            event.target.style.backgroundColor = "";
            event.target.classList.remove("face--back");
            clickCounter = 0; // RELEASE COOL DOWN
            clearTimeout(timeOut);
          }, 1000);

          // Remove the first selected class
          storePreviousClick.style.backgroundColor = "";
          storePreviousClick.accessKey = "";
          storePreviousClick.classList.remove("face--back");
          // Limit clicks to 2 per turn
          clickCounter = -99;
        } // ELSE NESTED
      } // ELSE
    }
  }
}

function handleMenuClick(event) {
  event.target.remove();
  for(let i = 0; i < gameContainer.childNodes.length; i++){
    gameContainer.childNodes[i].removeAttribute("disabled")
    gameContainer.childNodes[i].classList.add("face--front");
  }
}
