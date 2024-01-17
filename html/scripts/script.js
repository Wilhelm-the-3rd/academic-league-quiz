const questionText = document.getElementById("questionText");
const answerInput = document.getElementById("answer");
const answerResult = document.getElementById("answerResult");
let questionPool = new Map();

let currentQuestion;

let correct = 0;
let wrong = 0;

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

            console.log(questionPool.size);
            displayQuestion();

            document.getElementById("loaded-questions").textContent = questionPool.size + " Questions Loaded...";

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
        correct++;
    } else {
        answerResult.textContent = "Incorrect answer.\n The correct answer was: " + visibleAnswer;
        answerResult.style.color = "red";
        wrong++;
    }

    document.getElementById("submit").style.visibility = "hidden";
    document.getElementById("score").textContent = "Correct: "+ correct +" | Incorrect: " + wrong;

}

function next() {
    questionPool.delete(currentQuestion);

    if (questionPool.size !== 0) {
        displayQuestion();
    } else {

        answerResult.textContent = "No more questions!";
        answerResult.style.color = "black";

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

document.getElementById("all").addEventListener("click", function(){

    if (this.checked) {
        document.getElementById("us_history").checked = true;
        document.getElementById("world_history").checked = true;
        document.getElementById("art_history").checked = true;
        document.getElementById("geography").checked = true;
        document.getElementById("mythology").checked = true;

        document.getElementById("calculus").checked = true;
        document.getElementById("algebra").checked = true;
        document.getElementById("geometry").checked = true;
        document.getElementById("trig").checked = true;

        document.getElementById("chemistry").checked = true;
        document.getElementById("physics").checked = true;
        document.getElementById("biology").checked = true;
        document.getElementById("earthSpaceScience").checked = true;

        document.getElementById("english").checked = true;
        document.getElementById("englishLit").checked = true;
        document.getElementById("americanLit").checked = true;
        document.getElementById("spanish").checked = true;
        document.getElementById("french").checked = true;

        document.getElementById("currentEvents").checked = true;
    } else {
        document.getElementById("us_history").checked = false;
        document.getElementById("world_history").checked = false;
        document.getElementById("art_history").checked = false;
        document.getElementById("geography").checked = false;
        document.getElementById("mythology").checked = false;

        document.getElementById("calculus").checked = false;
        document.getElementById("algebra").checked = false;
        document.getElementById("geometry").checked = false;
        document.getElementById("trig").checked = false;

        document.getElementById("chemistry").checked = false;
        document.getElementById("physics").checked = false;
        document.getElementById("biology").checked = false;
        document.getElementById("earthSpaceScience").checked = false;

        document.getElementById("english").checked = false;
        document.getElementById("englishLit").checked = false;
        document.getElementById("americanLit").checked = false;
        document.getElementById("spanish").checked = false;
        document.getElementById("french").checked = false;

        document.getElementById("currentEvents").checked = false;
    }

});
