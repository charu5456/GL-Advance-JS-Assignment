let quotes = [
    "When you have a dream, you have got to grab it and never let go.",
    "Nothing is impossible. The word itself says ‘I’m possible!'",
    "There is nothing impossible to they who will try.",
    "The bad news is time flies. The good news is you’re the pilot.",
    "Life has got all those twists and turns. You’ve got to hold on tight and off you go."
];
let limit = 60;
let time = document.querySelector(".time");
let Accuracy = document.querySelector(".Accuracy");
let Errortext = document.querySelector(".Errors");
let CPMs = document.querySelector(".CPM");
let WPMs = document.querySelector(".WPM");
let h1 = document.querySelector(".h1");
let textBox = document.querySelector(".textBox");
let restart = document.querySelector(".restart");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = limit;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let typing = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function startTest() {

    resetValues();
    changeQuote();
    clearInterval(timer);
    timer = setInterval(update, 1000);
}
function changeQuote() {

    h1.textContent = null;
    current_quote = quotes[quoteNo];

    current_quote.split('').forEach(char => {
        const quotess = document.createElement('span')
        quotess.innerText = char
        h1.appendChild(quotess)
    })
    if (quoteNo < quotes.length - 1)
        quoteNo++;
    else
        quoteNo = 0;
}
function update() {

    if (timeLeft > 0) {
        timeLeft--;
        timeElapsed++;
        time.textContent = timeLeft + "s";
    } else {
        finishTest();
    }
}
function TextBox() {

    curr_input = textBox.value;
    curr_input_array = curr_input.split('');

    typing++;
    errors = 0;
    quoteSpanArray = h1.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {

        let typedChar = curr_input_array[index]

        if (typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');
        } else if (typedChar === char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');
        } else {
            char.classList.add('incorrect_char');
            char.classList.remove('correct_char');
            errors++;
        }
    });
    Errortext.textContent = total_errors + errors;

    let correctWords = (typing - (total_errors + errors));
    let accurate = ((correctWords / typing) * 100);
    Accuracy.textContent = Math.round(accurate);

    if (curr_input.length == current_quote.length) {
        changeQuote();
        total_errors += errors;
        textBox.value = "";
    }
}
function finishTest() {

    clearInterval(timer);
    textBox.disabled = true;
    h1.textContent = "Click on restart to start a new game.";
    restart.style.display = "block";
    cpm = Math.round(((typing / timeElapsed) * 60));
    wpm = Math.round((((typing / 5) / timeElapsed) * 60));
    CPMs.textContent = cpm;
    WPMs.textContent = wpm;
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
}
function resetValues() {

    timeLeft = limit;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    typing = 0;
    quoteNo = 0;
    textBox.disabled = false;
    textBox.value = "";
    h1.textContent = "Click on the area below to start the game.";
    Accuracy.textContent = 100;
    time.textContent = timeLeft + 's';
    Errortext.textContent = 0;
    restart.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
}