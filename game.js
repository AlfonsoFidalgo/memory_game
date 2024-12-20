const cards = document.querySelectorAll(".card");

const startButton = document.querySelector("#start");

const cardColors = [
  "#FF5733", // Vibrant Red
  "#33FF57", // Bright Green
  "#3357FF", // Bright Blue
  "#FFD700", // Gold
  "#FF33A1", // Pink
  "#33FFF5", // Aqua Blue
  "#A133FF", // Purple
  "#FF8C33", // Orange
  "#8C33FF", // Violet
  "#33D4FF", // Cyan
  "#FF3380", // Hot Pink
  "#80FF33", // Light Lime Green
  "#3380FF", // Sky Blue
  "#FF8033", // Peach
  "#8033FF", // Lavender
  "#33FF8C", // Mint Green
];

const baseColor = "#555";

const cardFrequencies = {
  "c-1": 261.63, // C4
  "c-2": 293.66, // D4
  "c-3": 329.63, // E4
  "c-4": 349.23, // F4
  "c-5": 392.0, // G4
  "c-6": 440.0, // A4
  "c-7": 493.88, // B4
  "c-8": 523.25, // C5
  "c-9": 587.33, // D5
  "c-10": 659.25, // E5
  "c-11": 698.46, // F5
  "c-12": 783.99, // G5
  "c-13": 880.0, // A5
  "c-14": 987.77, // B5
  "c-15": 1046.5, // C6
  "c-16": 1174.66, // D6
};

let gameOn = false;
let round = 1;
let oscillatorGlobal;
let audioContextGlobal;

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
      await simulateMouseDownWithDuration(card, duration, `c-${random}`);
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
  for (let i = 0; i < q.length; i++) {
    if (q[i] !== userClicks[i]) {
      return false;
    }
  }
  return true;
}

function playCardSound(cardId, duration = 500, player = "computer") {
  const frequency = cardFrequencies[cardId];
  if (frequency) {
    return playNote(frequency, duration, player);
  }
}

function playNote(frequency, duration, player, type = "sine") {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const oscillator = audioContext.createOscillator();
  oscillator.type = type; // Type of waveform: 'sine', 'square', 'triangle', 'sawtooth'
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

  oscillator.connect(audioContext.destination);

  oscillator.start();

  if (player !== "computer") {
    return [oscillator, audioContext];
  }
  setTimeout(() => {
    oscillator.stop();
    audioContext.close();
  }, duration);
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

async function simulateMouseDownWithDuration(element, duration, cardId) {
  playCardSound(cardId);
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

cards.forEach((card, index) => {
  card.addEventListener("mousedown", (event) => {
    [oscillator, audioContext] = playCardSound(event.target.id, 500, "user");
    oscillatorGlobal = oscillator;
    audioContextGlobal = audioContext;
    event.target.style.backgroundColor = cardColors[index];
  });

  card.addEventListener("mouseup", (event) => {
    oscillatorGlobal.stop();
    audioContextGlobal.close();
    event.target.style.backgroundColor = baseColor;
  });
});
