// quiz questions and answers
let timeLeft = document.querySelector("#time");
const questionElement = document.getElementById("question");
var choicesElement = document.getElementById("container");
var timeElement = document.getElementById("time");
var nameElement = document.getElementById("name");
const timerElement = document.getElementById('timer');
const startButton = document.getElementById("start-button");
const submitButton = document.getElementById("submit-button");


var currentQuestion = 0;
var score = 0;
var time = 60;
var timeId;


const quizArray = [
    {
        question:"What is the capital of France?",
        choices:["Paris", "London", "Berlin", "Madrid"],
        answer:"Paris"
    } ,

    {
        question: "What is the capital of India?",
        choices: ["Paris", "London", "Berlin", "Delhi"],
        answer: "Delhi"
    } ,

    {
        question: "What is the capital of Gujarat?",
        choices: ["Paris", "Gandhinagar", "Berlin", "Delhi"],
        answer: "Gandhinagar"
    } ,

    {
        question: "What is the name of my city?",
        choices: ["Paris", "London", "Baroda", "Delhi"],
        answer: "Baroda"
    } 

];


startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click',submitScore);

// display current questions
function startQuiz() {
    startButton.classList.add('hide');
    displayQuestion();
    startTimer();
}
function displayQuestion() {
    var question = quizArray[currentQuestion]; 
    questionElement.textContent = question.question;
    choicesElement.innerHTML = ""; 

    for (var i = 0; i < question.choices.length; i++) { 
      var button = document.createElement("button");
      button.textContent = question.choices[i];
      button.onclick = function() {
        selectAnswer(this.textContent, question.answer);
      };
      choicesElement.appendChild(button);
    }
  }

  function selectAnswer(selectedAnswer, correctAnswer) {
    if(selectedAnswer === correctAnswer) {
        score++;
    } else {
        time -=10;
    }

    currentQuestion++;

    if (currentQuestion < quizArray.length){
        displayQuestion();
    }else {
        endQuiz();
    }
}

//start timmer
function startTimer() {
    timeId = setInterval(function() {
        time--;
        timeElement.textContent = time;
        if (time <= 0) {
            endQuiz();
        }
    }, 1000);
}


//check answers
function selectAnswers(selectedAnswer, correctAnswer){
    if(selectedAnswer === correctAnswer) {
        score++;
    } else {
        time -=10;
    }

    currentQuestion++;

    if (currentQuestion < quizArray.length){
        displayQuestion();
    }else {
        endQuiz();
    }
}

// End quiz and show score
function endQuiz(){
    stopTimer(timeId);
    questionElement.textContent = "You Sored" + score + "out of" +quizArray.length + "!";
    choicesElement.classList.add('hide');
    document.querySelector(".score").classList.remove('hide');
}

//submit score and name
function submitScore() {
    var name = nameElement.value;
	if (name === "") return;
	var scoreData = { name: name, score: score };
	localStorage.setItem("scoreData", JSON.stringify(scoreData));
}
