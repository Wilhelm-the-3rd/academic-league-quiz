const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answer");
const answerResult = document.getElementById("answerResult");
let questionPool = new Map();

let currentQuestion;

function parseFile(filePath) {

    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n').map(line => line.trim()); // Trim each line

            lines.forEach(line => {
                const regex = /^([^:]+):([^:]+):(\[.*]):([^:]+)$/;

                const match = line.match(regex);

                if (match) {
                    const category = match[1].trim();
                    const question = match[2].trim();
                    const answers = JSON.parse(match[3].trim());
                    const author = match[4].trim();

                    questionPool.set(question, [answers, category, author]);
                } else {
                    console.error(`Invalid line format: ${line}`);
                }
            });

            displayQuestion();

        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });

}

function checkAnswer() {
    const userAnswer = answerInput.value.toUpperCase();
    const acceptableAnswers = questionPool.get(currentQuestion)[0];
    const visibleAnswer = acceptableAnswers[acceptableAnswers.length - 1]

    if (acceptableAnswers.includes(userAnswer)) {
        answerResult.textContent = "Correct answer!\n The answer was: " + visibleAnswer;
        answerResult.style.color = "green";
    } else {
        answerResult.textContent = "Incorrect answer.\n The correct answer was: " + visibleAnswer;
        answerResult.style.color = "red";
    }

    document.getElementById("submit").style.visibility = "hidden";

    questionPool.delete(currentQuestion);

    if (questionPool.size !== 0) {
        setTimeout(displayQuestion, 3500);}
    else {

        setTimeout(() => {
            answerResult.textContent = "No more questions!";
            answerResult.style.color = "black";
        }, 3500);

    }
}
let i = 0;
let speed = 50;
function typingEffect() {
    if (i < currentQuestion.length) {
        questionText.innerHTML += currentQuestion.charAt(i);
        i++;
        setTimeout(typingEffect, speed);
    }
}

function getRandomQuestion() {
    if (questionPool.size === 0) {
        console.log('Map is empty.');
        return null;
    }

    const keysArray = Array.from(questionPool.keys());
    const randomIndex = Math.floor(Math.random() * keysArray.length);
    currentQuestion = keysArray[randomIndex];
}

function newQuestion() {

    getRandomQuestion();


    questionText.textContent = "";
    i=0;
    typingEffect();
    document.getElementById("questionAuthor").textContent = "Question Author: " + questionPool.get(currentQuestion)[2];
    document.getElementById("questionCategory").textContent = "Category: " + questionPool.get(currentQuestion)[1];

}

function displayQuestion() {
    document.getElementById("submit").style.visibility = "visible";

    newQuestion();

    answerInput.value = "";
    answerResult.textContent = "";
}

function clearQuestion() {
    questionPool = new Map();

    answerInput.value = "";
    answerResult.textContent = "";

}

function updateQuestionPool() {
    clearQuestion();

    if (document.getElementById("us_history").checked) {
        parseFile('questions/usHistory.txt');
    }
    if (document.getElementById("world_history").checked) {
        parseFile('questions/worldHistory.txt');
    }
    if (document.getElementById("art_history").checked) {
        parseFile('questions/artHistory.txt');
    }
    if (document.getElementById("geography").checked) {
        parseFile('questions/geography.txt');
    }
    if (document.getElementById("mythology").checked) {
        parseFile('questions/mythology.txt');
    }

    if (document.getElementById("calculus").checked) {
        parseFile('questions/calculus.txt');
    }
    if (document.getElementById("trig").checked) {
        parseFile('questions/trig.txt');
    }
    if (document.getElementById("algebra").checked) {
        parseFile('questions/algebra.txt');
    }
    if (document.getElementById("geometry").checked) {
        parseFile('questions/geometry.txt');
    }

    if (document.getElementById("chemistry").checked) {
        parseFile('questions/chemistry.txt');
    }
    if (document.getElementById("physics").checked) {
        parseFile('questions/physics.txt');
    }
    if (document.getElementById("biology").checked) {
        parseFile('questions/biology.txt');
    }
    if (document.getElementById("earthSpaceScience").checked) {
        parseFile('questions/earthSpaceScience.txt');
    }

    if (document.getElementById("englishLit").checked) {
        parseFile('questions/englishLit.txt');
    }
    if (document.getElementById("americanLit").checked) {
        parseFile('questions/americanLit.txt');
    }
    if (document.getElementById("english").checked) {
        parseFile('questions/english.txt');
    }
    if (document.getElementById("spanish").checked) {
        parseFile('questions/spanish.txt');
    }
    if (document.getElementById("french").checked) {
        parseFile('questions/french.txt');
    }

    if (document.getElementById("currentEvents").checked) {
        parseFile('questions/currentEvents.txt');
    }
}