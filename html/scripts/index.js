document.getElementById("toggle").addEventListener("click",function () {

    if (document.querySelector("#filters-container").style.visibility === "visible") {
        document.querySelector("#filters-container").style.visibility = "collapse"

        document.getElementById("toggle").textContent = " Question Pool <> "
    } else {
        document.querySelector("#filters-container").style.visibility = "visible"

        document.getElementById("toggle").textContent = " Question Pool <-> "
    }

});

function getElement(id) { return document.getElementById(id); }
function setText(element, newText) { element.textContent = newText; }

const questionText = getElement("question-text")
    , answerInput = document.querySelector(".answer-box")
    , answerResult = getElement("answer-result");

let questionPool = new Map()
    , correct = 0
    , incorrect = 0
    , currentQuestion
    , questionActive = true;

function parseFile(filePath) {

    fetch(filePath)
        .then(response => response.text()).then(data => {
        const lines = data.split('\n').map(line => line.trim());

        lines.forEach(line => {
            const regex = /^([^;]+);([^;]+);(\[.*]);([^;]+);([^;]+)$/
                , match = line.match(regex);

            if (!match)
                console.error('Invalid line format: ' + line + ' in ' + filePath);

            try {
                JSON.parse(match[3].trim());
            } catch (e) {
                console.log(e + ": " + line + " in " + filePath)
            }

            const category = match[1].trim()
                , question = match[2].trim()
                , answers = JSON.parse(match[3].trim())
                , level = match[4].trim()
                , author = match[5].trim();

            if (!(!getElement("frosh").checked && !getElement("jv").checked && !getElement("varsity").checked)) {
                if (level === "Freshmen" && !getElement("frosh").checked)
                    return;
                if (level === "Junior Varsity" && !getElement("jv").checked)
                    return;
                if (level === "Varsity" && !getElement("varsity").checked)
                    return;
            }

            questionPool.set(question, [answers, category, level, author]);
        });

        console.log(questionPool.size);
        displayQuestion();
        setText(getElement("questions-loaded"), questionPool.size + " Questions Loaded")

    }).catch(error => { console.error('Error fetching questions:', error); });
}

function checkAnswer() {
    const userAnswer = answerInput.value.toUpperCase();
    const acceptableAnswers = questionPool.get(currentQuestion)[0];
    const visibleAnswer = acceptableAnswers[acceptableAnswers.length - 1]

    questionActive = false;
    questionText.textContent = currentQuestion;

    if (acceptableAnswers.includes(userAnswer)) {
        setText(answerResult, "Correct answer!\n The answer was: " + visibleAnswer)
        answerResult.style.color = "green";
        correct++;
    } else {
        setText(answerResult, "Incorrect answer!\n The correct answer was: " + visibleAnswer)
        answerResult.style.color = "red";
        incorrect++;
    }

    getElement("progress-indicator").style.width = (((correct+incorrect)/questionPool.size) * 100) + "%";

    getElement("submit-btn").style.visibility = "hidden";
    setText(document.querySelector(".correct-label"), "Correct: " + correct);
    setText(document.querySelector(".incorrect-label"), "Incorrect: " + incorrect);

}

function nextQuestion() {
    questionPool.delete(currentQuestion);

    if (questionPool.size !== 0) {
        questionActive = true;
        displayQuestion();
    }
    else {

        setText(answerResult, "No more questions!");
        answerResult.style.color = "black";

    }
}

let i = 0;
let speed = 50;
function typingEffect() {
    if (!questionActive)
        return;

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

    setText(document.querySelector(".category-label"), "Category: " + questionPool.get(currentQuestion)[1]);
    setText(document.querySelector(".level-label"), "Level: " + questionPool.get(currentQuestion)[2]);
    setText(document.querySelector(".author-label"), "Author: " + questionPool.get(currentQuestion)[3]);

}

function displayQuestion() {
    getElement("submit-btn").style.visibility = "visible";

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

    document.querySelectorAll(".category-filter").forEach((checkbox) => {
        if (checkbox.checked) {
            switch (checkbox.value) {
                case "us-history":
                    parseFile('questions/us_history.txt');
                    break
                case "world-history":
                    parseFile('questions/world_history.txt');
                    break
                case "art-history":
                    parseFile('questions/art_history.txt');
                    break
                case "geography":
                    parseFile('questions/geography.txt');
                    break
                case "mythology":
                    parseFile('questions/mythology.txt');
                    break
                case "music":
                    parseFile('questions/music.txt');
                    break

                case "calculus":
                    parseFile('questions/calculus.txt');
                    break
                case "trig":
                    parseFile('questions/trig.txt');
                    break
                case "algebra":
                    parseFile('questions/algebra.txt');
                    break
                case "geometry":
                    parseFile('questions/geometry.txt');
                    break

                case "chemistry":
                    parseFile('questions/chemistry.txt');
                    break
                case "physics":
                    parseFile('questions/physics.txt');
                    break
                case "biology":
                    parseFile('questions/biology.txt');
                    break
                case "earth-space-science":
                    parseFile('questions/earth_space_science.txt');
                    break

                case "american-literature":
                    parseFile('questions/american_literature.txt');
                    break
                case "english-literature":
                    parseFile('questions/english_literature.txt');
                    break
                case "english":
                    parseFile('questions/english.txt');
                    break
                case "spanish":
                    parseFile('questions/spanish.txt');
                    break
                case "french":
                    parseFile('questions/french.txt');
                    break

                case "current-events":
                    parseFile('questions/current_events.txt');
                    break
            }
        }
    });

    /*
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
*/
}

function allBoxes(checked) {
        switch (checked) {
            case "all":

                document.querySelectorAll(".category-filter").forEach((checkbox1) => {
                    checkbox1.checked = !!document.querySelector(".category-filter-all").checked
                });

                document.querySelectorAll(".category-filter-all").forEach((checkbox1) => {
                    checkbox1.checked = document.querySelector(".category-filter-all").checked
                });

                updateQuestionPool()
                break
            case "all-human":
                document.querySelectorAll("#humanities .category-filter").forEach((checkbox1) => {
                    checkbox1.checked = document.querySelector("#humanities .category-filter-all").checked
                });

                updateQuestionPool()
                break
            case "all-math":
                document.querySelectorAll("#math .category-filter").forEach((checkbox1) => {
                    checkbox1.checked = document.querySelector("#math .category-filter-all").checked
                });

                updateQuestionPool()
                break
            case "all-science":
                document.querySelectorAll("#science .category-filter").forEach((checkbox1) => {
                    checkbox1.checked = document.querySelector("#science .category-filter-all").checked
                });

                updateQuestionPool()
                break
            case "all-lang":
                document.querySelectorAll("#language .category-filter").forEach((checkbox1) => {
                    checkbox1.checked = document.querySelector("#language .category-filter-all").checked
                });

                updateQuestionPool()
                break

    }
}