function getElement(id) { return document.getElementById(id); }
function setText(element, newText) { element.textContent = newText; }

const questionText = getElement("questionText")
    , answerInput = getElement("answer")
    , answerResult = getElement("answerResult");

let questionPool = new Map()
    , correct = 0
    , wrong = 0
    , currentQuestion;

function parseFile(filePath) {

    fetch(filePath)
        .then(response => response.text()).then(data => {
            const lines = data.split('\n').map(line => line.trim());

            lines.forEach(line => {
                const regex = /^([^;]+);([^;]+);(\[.*]);([^;]+);([^;]+)$/
                    , match = line.match(regex);

                if (!match)
                    console.error('Invalid line format: ' + line + ' in ' + filePath);

                try { JSON.parse(match[3].trim()); } catch (e) { console.log(e + ": " + line + " in " + filePath) }

                const category = match[1].trim()
                    , question = match[2].trim()
                    , answers = JSON.parse(match[3].trim())
                    , level = match[4].trim()
                    , author = match[5].trim();

                questionPool.set(question, [answers, category, level, author]);
            });

            console.log(questionPool.size);
            displayQuestion();

            setText(getElement("loaded-questions"), questionPool.size + " Questions Loaded...")

        }).catch(error => { console.error('Error fetching questions:', error); });
}

function checkAnswer() {
    const userAnswer = answerInput.value.toUpperCase();
    const acceptableAnswers = questionPool.get(currentQuestion)[0];
    const visibleAnswer = acceptableAnswers[acceptableAnswers.length - 1]

    if (acceptableAnswers.includes(userAnswer)) {
        setText(answerResult, "Correct answer!\n The answer was: " + visibleAnswer)
        answerResult.style.color = "green";
        correct++;
    } else {
        setText(answerResult, "Incorrect answer!\n The correct answer was: " + visibleAnswer)
        answerResult.style.color = "red";
        wrong++;
    }

    getElement("submit").style.visibility = "hidden";
    setText(getElement("score"), "Correct: " + correct + " | Incorrect: " + wrong);

}

function nextQuestion() {
    questionPool.delete(currentQuestion);

    if (questionPool.size !== 0)
        displayQuestion();
    else {

        setText(answerResult, "No more questions!");
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

    setText(questionText, "");
    i=0;
    typingEffect();

    setText(getElement("questionCategory"), "Category: " + questionPool.get(currentQuestion)[1]);
    setText(getElement("questionDifficulty"), "Difficulty: " + questionPool.get(currentQuestion)[2]);
    setText(getElement("questionAuthor"), "Author: " + questionPool.get(currentQuestion)[3]);

}

function displayQuestion() {
    getElement("submit").style.visibility = "visible";

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

    if (getElement("us_history").checked)
        parseFile('questions/us_history.txt');
    if (getElement("world_history").checked)
        parseFile('questions/world_history.txt');
    if (getElement("art_history").checked)
        parseFile('questions/art_history.txt');
    if (getElement("geography").checked)
        parseFile('questions/geography.txt');
    if (getElement("mythology").checked)
        parseFile('questions/mythology.txt');
    if (getElement("music").checked)
        parseFile('questions/music.txt');

    if (getElement("calculus").checked)
        parseFile('questions/calculus.txt');
    if (getElement("trig").checked)
        parseFile('questions/trigonometry.txt');
    if (getElement("algebra").checked)
        parseFile('questions/algebra.txt');
    if (getElement("geometry").checked)
        parseFile('questions/geometry.txt');

    if (getElement("chemistry").checked)
        parseFile('questions/chemistry.txt');
    if (getElement("physics").checked)
        parseFile('questions/physics.txt');
    if (getElement("biology").checked)
        parseFile('questions/biology.txt');
    if (getElement("earthSpaceScience").checked)
        parseFile('questions/earth_space_science.txt');

    if (getElement("englishLit").checked)
        parseFile('questions/english_literature.txt');
    if (getElement("americanLit").checked)
        parseFile('questions/american_literature.txt');
    if (getElement("english").checked)
        parseFile('questions/english.txt');
    if (getElement("spanish").checked)
        parseFile('questions/spanish.txt');
    if (getElement("french").checked)
        parseFile('questions/french.txt');

    if (getElement("currentEvents").checked)
        parseFile('questions/current_events.txt');

}

getElement("all").addEventListener("click", function(){

    if (this.checked) {
        getElement("us_history").checked = true;
        getElement("world_history").checked = true;
        getElement("art_history").checked = true;
        getElement("geography").checked = true;
        getElement("mythology").checked = true;
        getElement("music").checked = true;

        getElement("calculus").checked = true;
        getElement("algebra").checked = true;
        getElement("geometry").checked = true;
        getElement("trig").checked = true;

        getElement("chemistry").checked = true;
        getElement("physics").checked = true;
        getElement("biology").checked = true;
        getElement("earthSpaceScience").checked = true;

        getElement("english").checked = true;
        getElement("englishLit").checked = true;
        getElement("americanLit").checked = true;
        getElement("spanish").checked = true;
        getElement("french").checked = true;

        getElement("currentEvents").checked = true;
    } else {
        getElement("us_history").checked = false;
        getElement("world_history").checked = false;
        getElement("art_history").checked = false;
        getElement("geography").checked = false;
        getElement("mythology").checked = false;
        getElement("music").checked = false;

        getElement("calculus").checked = false;
        getElement("algebra").checked = false;
        getElement("geometry").checked = false;
        getElement("trig").checked = false;

        getElement("chemistry").checked = false;
        getElement("physics").checked = false;
        getElement("biology").checked = false;
        getElement("earthSpaceScience").checked = false;

        getElement("english").checked = false;
        getElement("englishLit").checked = false;
        getElement("americanLit").checked = false;
        getElement("spanish").checked = false;
        getElement("french").checked = false;

        getElement("currentEvents").checked = false;
    }

});