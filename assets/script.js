const startButtonEl = document.querySelector("#start");
const timerEl = document.querySelector("#timer");
const questionnaireEl = document.querySelector("#questionnaire");
const resultEl = document.querySelector("#result");
let quiz = {
    timer: "75",
    difficulty: "5",
    score: 0,
    userData: [],
    //QUESTIONS ARRAY
    questionData: [
        {
            question: "Which type of JavaScript language is _____",
            answer: "Object-Based"
        },

        {
            question: "Which one of the following also known as Conditional Expression:",
            answer: "immediate if"
        },
        {
            question: "In JavaScript, what is a block of statement?",
            answer: "single compound statement"
        },
        {
            question: "When interpreter encounters an empty statements, what it will do:",
            answer: "Ignores the statements"
        },
        {
            question: "In the following given syntax of the switch statement, the Expression is compared with the labels using which one of the following operators?",
            answer: "==="
        },
        {
            question: "Which one of the following is the correct way for calling the JavaScript code?",
            answer:   "Function/Method"
        },
        {
            question: "Which of the following type of a variable is volatile?",
            answer: "Mutable variable"
        },
        {
            question: "Which of the following option is used as hexadecimal literal beginning?",
            answer: "Both 0x and 0X"
        },
        {
            question: "When there is an indefinite or an infinite value during an arithmetic computation in a program, then JavaScript prints______.",
            answer: "Displays -infinity-"
        },
        {
            question: "In the JavaScript, which one of the following is not considered as an error:",
            answer:  "Division by zero"
        },
        {
            question: "What is an approximation of what your real code should do?",
            answer: "Pseudo code"
        },
        {
            question: "What function can you use to generate a random number between 0 and 1?",
            answer: "Math.random"
        },
        {
            question: "What function allows you to round down a decimal number to the nearest integer?",
            answer: "Math.floor"
        },
        {
            question: "What JavaScript function shows a dialog with message and space for the user to enter a value?",
            answer: "prompt"
        },
        {
            question: "What is the keyword to declare a function?",
            answer: "function"
        },
        {
            question: "What syntax do you use to store parameters in a function?",
            answer: "parentheses"
        },
        {
            question: "What syntax do you use to enclose the body of a function?",
            answer: "curly braces"
        },
        {
            question: "What scope is visible everywhere in your program?",
            answer: "global"
        },
        {
            question: "What scope is only visible to the function where they are declared?",
            answer: "local"
        },
        {
            question: "A function defined inside another function are called what?",
            answer: "nested"
        },
        {
            question: "What are nameless function expressions called?",
            answer: "anonymous"
        }
    ],
    start: function() {
        timerInterval = setInterval(function() {
            quiz.timer--;
            timerEl.textContent = "Timer: " + quiz.timer;
            if (quiz.timer < 1){
                timerEl.textContent = "Timer: 0";
                clearInterval(timerInterval);
                quiz.end();
            };
        }, 1000);
    },


    end: function() {
        removeAllChildNodes(questionnaireEl);
        removeAllChildNodes(resultEl);
        let formEl = document.createElement("form");
        let h1El = document.createElement("h1");
        let labelEl = document.createElement("label");
        let inputEl = document.createElement("input");
        let buttonEl = document.createElement("button");
            h1El.textContent = "Times Up! The quiz has ended.";
            labelEl.textContent = "Please submit your initials: ";
            buttonEl.textContent = "Submit";
            buttonEl.setAttribute("type", "submit");
            buttonEl.setAttribute("value", "submit");
            labelEl.setAttribute("class", "m-2");
            buttonEl.setAttribute("class", "btn btn-primary m-2")
            inputEl.setAttribute("id", "questionnaire-input")
            buttonEl.setAttribute("id", "questionnaire-submit")
        questionnaireEl.appendChild(formEl);
        questionnaireEl.appendChild(h1El);
        questionnaireEl.appendChild(labelEl);
        questionnaireEl.appendChild(inputEl);
        questionnaireEl.appendChild(buttonEl);
        let questionnaireSubmit = document.querySelector("#questionnaire-submit");
        let questionnaireInput = document.querySelector("#questionnaire-input");
        questionnaireSubmit.addEventListener("click", function() {
            let inputText = questionnaireInput.value.trim();
            if (inputText === "") {
                return;
            };
        quiz.userData.push({initials:inputText,
            score:quiz.score});
            storeData();
            questionnaireInput.value = "";
            window.location.replace("./assets/score.html");
            window.location.href();
        });
        questionnaireInput.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("questionnaire-submit").click();
            }
        });
    },
    reset: function() {
        timerEl.textContent = "Timer: " + quiz.timer;
        quiz.score = 0;
    },
    generateQuestion: function() {
        removeAllChildNodes(questionnaireEl);
        let newH1 = document.createElement("h1");
        let button1 = document.createElement("button");
        let button2 = document.createElement("button");
        let button3 = document.createElement("button");
        let button4 = document.createElement("button");
        button1.setAttribute("class", "btn btn-primary m-2 w-50");
        button2.setAttribute("class", "btn btn-primary m-2 w-50");
        button3.setAttribute("class", "btn btn-primary m-2 w-50");
        button4.setAttribute("class", "btn btn-primary m-2 w-50");
        let question = quiz.getQuestion();
        let answer = question.answer;
        let incorrectAnswer1 = quiz.getQuestion();
        let incorrectAnswer2 = quiz.getQuestion();
        let incorrectAnswer3 = quiz.getQuestion();
        let answerArray = [question.answer, incorrectAnswer1.answer, incorrectAnswer2.answer, incorrectAnswer3.answer]
        shuffle(answerArray);
        button1.textContent = answerArray[0]
        button2.textContent = answerArray[1]
        button3.textContent = answerArray[2]
        button4.textContent = answerArray[3]
        if(button1.textContent === answer){
            button1.setAttribute("id", "correctAnswer");
        };
        if(button2.textContent === answer){
            button2.setAttribute("id", "correctAnswer");
        };
        if(button3.textContent === answer){
            button3.setAttribute("id", "correctAnswer");
        };
        if(button4.textContent === answer){
            button4.setAttribute("id", "correctAnswer");
        };
        button1.addEventListener("click", this.checkAnswer);
        button2.addEventListener("click", this.checkAnswer);
        button3.addEventListener("click", this.checkAnswer);
        button4.addEventListener("click", this.checkAnswer);
        newH1.textContent = question.question;
        questionnaireEl.appendChild(newH1);
        questionnaireEl.appendChild(button1);
        questionnaireEl.appendChild(button2);
        questionnaireEl.appendChild(button3);
        questionnaireEl.appendChild(button4);
    },
    checkAnswer: function(event) {
        if(quiz.timer > 0){
            let x = document.getElementById("correctAnswer");
            let correctSound = new sound("./assets/sound2.wav");
            let incorrectSound = new sound("./assets/sound1.wav");
            if(event.target.innerHTML === x.textContent){
                quiz.score++;
                quiz.displayResult("correct");
                
                correctSound.play();
                return quiz.generateQuestion();
            } else {
                quiz.timer = quiz.timer - quiz.difficulty;
                quiz.displayResult("incorrect");
                incorrectSound.play();
                return quiz.generateQuestion();
            };
        } else {
            quiz.timer = 0;
            timerEl.textContent = "Timer: " + quiz.timer;
        };
    },
    getQuestion: function() {
        let getQuestionDataIndex = Math.floor(Math.random()*quiz.questionData.length);
        return quiz.questionData[getQuestionDataIndex];
    },
    displayResult: function(result) {
        removeAllChildNodes(resultEl);
        let h3Correct = document.createElement("h3");
        let h3Incorrect = document.createElement("h3");
        let hrEl = document.createElement("hr");
        h3Correct.textContent = "Correct!";
        h3Incorrect.textContent = "Wrong!";
        h3Correct.setAttribute("class", "alert alert-success");
        h3Incorrect.setAttribute("class", "alert alert-danger");
        if(result === "correct"){
        hrEl.setAttribute("class", "d-block p-1 bg-success");
        resultEl.appendChild(h3Correct);
        resultEl.appendChild(hrEl);
        };
        if(result === "incorrect"){
        hrEl.setAttribute("class", "d-block p-1 bg-danger");
        resultEl.appendChild(h3Incorrect);
        resultEl.appendChild(hrEl);
        };
        return;
    }
}

startButtonEl.addEventListener("click", function() {
    quiz.start();
    quiz.generateQuestion();
});


function storeData() {
    localStorage.setItem("userData", JSON.stringify(quiz.userData));
};


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    };
  };



  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
};
function init(){
    let userData = JSON.parse(localStorage.getItem("userData"));
    if(userData !== null) {
        quiz.userData = userData;
    };
    let changedTimer = (localStorage.getItem("timer"));
    if(changedTimer !== null){
        quiz.timer = changedTimer;
    }
    let difficulty = (localStorage.getItem("difficulty"));
    if(difficulty !== null){
        quiz.difficulty = difficulty;
    };
    quiz.reset();
};
 

class sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.volume = .2;
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        };
        this.stop = function () {
            this.sound.pause();
        };
    }
};

init();