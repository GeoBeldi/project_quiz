// Set variables
const startScreen = document.querySelector("#start-screen");
const startEl = document.querySelector("#start");
const questionsEl = document.querySelector("#questions");
const questionTitleEl = document.querySelector("#question-title");
const choicesEl = document.querySelector(".choices");
const endScreen = document.querySelector("#end-screen");
const feedback = document.querySelector("#feedback");
const initials = document.querySelector("#initials");
const sumbitEl = document.getElementById("submit");
const finalScore = document.querySelector("#final-score");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const countdown = document.querySelector("#time");
finalScore.innerText = mostRecentScore;

let quiz = [
  {
    question: "Commonly used data types do not include ____.",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    correct: "Alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["Quotes", "Curly Brackets", "Parantheses", "Square Brackets"],
    correct: "Parantheses",
  },
  {
    question: "Arrays in Js can be used to store ____.",
    choices: [
      "Numbers and strings",
      "Other arrays",
      "Booleans",
      "All of the above",
    ],
    correct: "All of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["Commas", "Curly brackets", "Quotes", "Parantheses"],
    correct: "Quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is _____.",
    choices: ["Javascript", "Terminal/Bash", "For loops", "Console.log"],
    correct: "Console.log",
  },
];

let availableQuestions = [];
let questionsIndex = 0;
let currentQuestion = {};
let score = 0;
let timer = 60;

startGame = () => {
  startScreen.classList.add("hide");
  questionsEl.classList.remove("hide");

  // score is set to 0
  score = 0;

  availableQuestions = [...quiz];

  getNewQuestion();
  getChoices();
};

getNewQuestion = () => {
  // timer starts
  let timeInterval = setInterval(() => {
    timer--;
    countdown.innerText = timer;
  }, 1000);

  if (availableQuestions.length === 0) {
    // this will keep track of the score
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/highscores.html");
  }

  currentQuestion = availableQuestions[questionsIndex];

  // display question
  if (questionsIndex < availableQuestions.length && timer !== 0) {
    questionTitleEl.innerText = currentQuestion.question;
  } else {
    questionsEl.classList.add("hide");
    endScreen.classList.remove("hide");
    clearInterval(timeInterval); //why not stopping the timer?
  }
};

getChoices = () => {
  // Creating the ordered list
  const orderedLi = document.createElement("ol");
  choicesEl.appendChild(orderedLi);

  // display choices
  let choices = currentQuestion.choices;

  choices.forEach((choice) => {
    let listItem = document.createElement("li");
    let anchor = document.createElement("a");
    anchor.innerText = choice;
    listItem.appendChild(anchor);
    orderedLi.appendChild(listItem);

    let correctChoice = currentQuestion.correct;

    anchor.addEventListener("click", () => {
      if (choice) {
        feedback.classList.remove("hide");
        if (choice === correctChoice) {
          anchor.classList.add("correct");
          feedback.innerText = "CORRECT";
          feedback.style.color = "#008080";
          score++;
        } else {
          anchor.classList.add("wrong");
          feedback.innerText = "WRONG";
          feedback.style.color = "#dc143c";
          countdown.innerText = timer - 10;
        }

        setTimeout(() => {
          finalScore.innerText = score;
          orderedLi.classList.add("hide");
          feedback.classList.add("hide");
          getNewQuestion();
          getChoices();
        }, 2000);

        // move to the next question
        questionsIndex++;
      }
    });
  });
};

startEl.addEventListener("click", startGame);

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);
// converting to an actual array object
console.log(JSON.parse(localStorage.getItem("highScores")));
finalScore.innerText = mostRecentScore;

initials.addEventListener("keyup", () => {
  sumbitEl = !initials.value;
});
highScores = (e) => {
  e.preventDefault();
  let score = {
    score: mostRecentScore,
    name: initials.value,
  };
  highScores.push(score);
};
