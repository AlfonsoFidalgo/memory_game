const cardOne = document.querySelector("#c-1");
const cardTwo = document.querySelector("#c-2");
const cardThree = document.querySelector("#c-3");
const cardFour = document.querySelector("#c-4");
const cardFive = document.querySelector("#c-5");
const cardSix = document.querySelector("#c-6");
const cardSeven = document.querySelector("#c-7");
const cardEight = document.querySelector("#c-8");
const cardNine = document.querySelector("#c-9");
const cardTen = document.querySelector("#c-10");
const cardEleven = document.querySelector("#c-11");
const cardTwelve = document.querySelector("#c-12");
const cardThirteen = document.querySelector("#c-13");
const cardFourteen = document.querySelector("#c-14");
const cardFifteen = document.querySelector("#c-15");
const cardSixteen = document.querySelector("#c-16");

const startButton = document.querySelector("#start");

let gameOn = false;
let round = 1;
let roundPlay = [];
startButton.addEventListener("click", async () => {
  gameOn = true;
  startButton.disabled = true;
  document.querySelector(".board").style.display = "flex";
  document.querySelector("#game-over").style.display = "none";
  await new Promise((resolve) => setTimeout(resolve, 500));
  while (gameOn) {
    let duration = 500;
    let q = [];
    for (let i = 0; i < round; i++) {
      let random = Math.floor(Math.random() * 16) + 1;
      const card = document.querySelector(`#c-${random}`);
      q.push(card);
      await simulateMouseDownWithDuration(card, duration);
    }
    console.log("Waiting for user input...");
    const userClicks = await waitForUserClicks(q.length);
    await new Promise((resolve) => setTimeout(resolve, duration * 2));
    console.log("User clicked on:", userClicks);
    gameOn = checkAnswer(q, userClicks);
    round++;
  }
  console.log("Game over!");
  showGameover();
  round = 1;
  startButton.disabled = false;
});

function showGameover() {
  document.querySelector(".board").style.display = "none";
  document.querySelector("#game-over").style.display = "block";
  document.querySelector("#score").textContent = round - 2;
}

function checkAnswer(q, userClicks) {
  let correct = true;
  for (let i = 0; i < q.length; i++) {
    if (q[i] !== userClicks[i]) {
      correct = false;
      break;
    }
  }
  return correct;
}

function waitForUserClicks(count) {
  return new Promise((resolve) => {
    const userClicks = [];
    const cards = document.querySelectorAll(".card");

    const handleClick = (event) => {
      const clickedCard = event.target;
      userClicks.push(clickedCard);

      if (userClicks.length === count) {
        cards.forEach((card) => card.removeEventListener("click", handleClick));
        resolve(userClicks);
      }
    };

    cards.forEach((card) => card.addEventListener("click", handleClick));
  });
}

async function simulateMouseDownWithDuration(element, duration) {
  const mousedownEvent = new MouseEvent("mousedown", {
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(mousedownEvent);

  await new Promise((resolve) => setTimeout(resolve, duration));

  const mouseupEvent = new MouseEvent("mouseup", {
    bubbles: true,
    cancelable: true,
  });

  element.dispatchEvent(mouseupEvent);
  await new Promise((resolve) => setTimeout(resolve, duration));
}

cardOne.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "red";
  roundPlay.push(event.target);
});
cardOne.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardTwo.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "blue";
  roundPlay.push(event.target);
});
cardTwo.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardThree.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "green";
  roundPlay.push(event.target);
});
cardThree.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardFour.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "yellow";
  roundPlay.push(event.target);
});
cardFour.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardFive.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "orange";
  roundPlay.push(event.target);
});
cardFive.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardSix.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "pink";
  roundPlay.push(event.target);
});
cardSix.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardSeven.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "cyan";
  roundPlay.push(event.target);
});
cardSeven.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardEight.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "coral";
  roundPlay.push(event.target);
});
cardEight.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardNine.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "palegreen";
  roundPlay.push(event.target);
});
cardNine.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardTen.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "purple";
  roundPlay.push(event.target);
});
cardTen.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardEleven.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "sandybrown";
  roundPlay.push(event.target);
});
cardEleven.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardTwelve.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "sienna";
  roundPlay.push(event.target);
});
cardTwelve.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardThirteen.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "skyblue";
  roundPlay.push(event.target);
});
cardThirteen.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardFourteen.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "snow";
  roundPlay.push(event.target);
});
cardFourteen.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardFifteen.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "teal";
  roundPlay.push(event.target);
});
cardFifteen.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});

cardSixteen.addEventListener("mousedown", (event) => {
  event.target.style.backgroundColor = "tomato";
  roundPlay.push(event.target);
});
cardSixteen.addEventListener("mouseup", (event) => {
  event.target.style.backgroundColor = "grey";
});
