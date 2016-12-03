// Text type ========
var easyText;
var normalText;
var hardText;
// ==================
var correct;
var total;
var timer;
var easyArray;
var normalArray;
var hardArray;
// Mode =============
var beginMode;
var interMode;
var masterMode;
// Timer ============
var t0;
var t1;
// ==================
var testedText      = [];
var txt             = document.querySelector("#text");
var textbox         = document.querySelector("#textarea");
var topContainer    = document.querySelector("#top");
var resultContainer = document.querySelector("#result");
var correctWords    = document.querySelector("#correct");
var totalWords      = document.querySelector("#total");
var time            = document.querySelector("#time");
var typing          = document.querySelector("#typing");

var textBot         = document.querySelector("#textBot");
var textTop         = document.querySelector("#textTop");
// Buttons ==========
var beginBtn        = document.querySelector("#beginner");
var interBtn        = document.querySelector("#inter");
var masterBtn       = document.querySelector("#master");

var retryBtn        = document.querySelector("#return");


init();

function init() {
    correct = 0;
    total = 0;

    // Set starting mode to beginner
    beginMode = true;
    interMode = false;
    masterMode = false;

    // Change the current number of words
    right.textContent = 10;
    left.textContent = 1;

    // Reset timers
    t0 = 0;
    t1 = 0;

    reset();
    resetDisplay();
    setEasyText();
};

// When retry button is clicked, reset
retryBtn.addEventListener("click", function() {
    topContainer.style.display = 'block';
    resultContainer.style.display = 'none';

    // Reset font size to easy mode
    txt.style.fontSize = '40px';
    textbox.style.fontSize = '40px';
    typing.style.fontSize = '40px';

    init();
});

// Event when beginner button is clicked
beginBtn.addEventListener("click", function() {
    // Set mode
    beginMode = true;
    interMode = false;
    masterMode = false;

    reset();

    txt.style.fontSize = '40px';
    textbox.style.fontSize = '40px';
    typing.style.fontSize = '40px';

    // Restart timer
    t0 = 0;

    resetDisplay();

    // Change the current number of words
    right.textContent = 10;
    left.textContent = 1;

    setEasyText();
});

// Event when intermediate button is clicked
interBtn.addEventListener("click", function() {
    // Set mode
    beginMode = false;
    interMode = true;
    masterMode = false;

    reset();

    txt.style.fontSize = '25px';
    textbox.style.fontSize = '25px';
    typing.style.fontSize = '25px';

    // Restart timer
    t0 = 0;

    resetDisplay();

    // Change the current number of words
    right.textContent = 4;
    left.textContent = 1;

    setNormalText();
});

// Event when master button is clicked
masterBtn.addEventListener("click", function() {
    // Set mode
    beginMode = false;
    interMode = false;
    masterMode = true;

    reset();

    txt.style.fontSize = '15px';
    textbox.style.fontSize = '15px';
    typing.style.fontSize = '15px';

    // Restart timer
    t0 = 0;

    resetDisplay();

    // Change the current number of words
    right.textContent = 2;
    left.textContent = 1;

    setHardText();
});

// Reset display of textarea
function resetDisplay() {
    // Change display
    typing.style.display = 0;
    textbox.style.opacity = 1;
}

// textbox.onkeyup = function() {
//
// }

textbox.onkeydown = function () {
    if (t0 === 0) {
        t0 = performance.now();
    }
}

textbox.onkeyup = function() {
    testText();
    if (textbox.value.length > 0) {
        textbox.style.opacity = 0;
        // Move the text area away
        textbox.style.marginTop = '800px';
        typing.style.display = 1;
    } else {
        textbox.style.opacity = 1;
        textbox.style.marginTop = '0px';
        typing.style.display = 0;
    }
    typing.textContent = textbox.value;
    typing.style.display = "block";
}

function reset() {
    testedText = [];
    textbox.value = '';
    typing.textContent = '';
}

function testText() {
    // length : number of words that will be tested
    if (beginMode) {
        currentText = easyText;
        length = 10;
    } else if (interMode) {
        currentText = normalText;
        length = 4;
    } else if (masterMode) {
        currentText = hardText;
        length = 2;
    }
    if (textbox.value.length === currentText.length) {
        // Add to visited list
        testedText.push(currentText);
        // Increase the numbers of word that have been tested on the right side
        left.textContent++;
        // Debugging purpose
        // console.log(testedText);
        // console.log(testedText.length);
        // Checking for accuracy
        checkText(textbox.value, currentText);
        if (testedText.length === length) {
            // Get current time
            t1 = performance.now();
            elapseTime = t1 - t0;
            // Display result here
            correctWords.textContent = correct;
            totalWords.textContent = total;
            time.textContent = Math.ceil(elapseTime / 1000);
            // Show result
            topContainer.style.display = 'none';
            resultContainer.style.display = 'table';
        } else {
            resetText();
        }
    } else if (textbox.value.length > currentText.length) {
        alert('Your input is longer than current text, try again !!');
        textbox.value = '';
    }
}

function checkText(textBox, testText) {
    textBoxArray = textBox.split(" ");
    testTextArray = testText.split(" ");
    for (i = 0; i < testTextArray.length; i++) {
        if (textBoxArray[i] === testTextArray[i]) {
            correct++;
            total++;
        } else {
            total++;
        }
    }
}

function resetText() {
    if (beginMode) {
        setEasyText();
        while (testedText.indexOf(easyText) !== -1) {
            setEasyText();
        }
    } else if (interMode) {
        setNormalText();
        while (testedText.indexOf(normalText) !== -1) {
            setNormalText();
        }
    } else if (masterMode) {
        setHardText();
        while (testedText.indexOf(hardText) !== -1) {
            setHardText();
        }
    }
    textbox.value = '';
}

// Beginner text =================================
function setEasyText() {
    // Set color
    beginBtn.style.background = '#6A1B9A';
    beginBtn.style.color = 'white';

    // Remove others color
    interBtn.style.background = 'white';
    interBtn.style.color = '#6A1B9A';
    masterBtn.style.background = 'white';
    masterBtn.style.color = '#6A1B9A';

    easyText = getEasyText();
    txt.textContent = easyText;
    return easyText;
}

function getEasyText() {
    easyArray = ['apple', 'ant', 'air', 'bed', 'bat', 'banana', 'balloon',
                 'bell', 'bear', 'cat', 'chair', 'cabbage', 'corn', 'dog',
                 'duck', 'dime', 'door', 'dance', 'ears', 'eyes', 'easy',
                 'feed', 'fun', 'fence', 'four', 'good', 'game', 'gold', 'grapefruit',
                 'green','hello', 'hippo', 'honey', 'hole', 'hot', 'honeycomb',
                 'iceberg', 'ink', 'joker', 'jam', 'jeans', 'jogging', 'jumping',
                 'kangaroo', 'koala', 'kick', 'kids', 'laugh', 'leopard',
                 'lion', 'lime', 'light', 'mouse', 'monkey', 'money', 'master',
                 'mango', 'melon', 'mushroom', 'niece', 'night', 'time', 'talk',
                 'tall', 'tale', 'type', 'queen', 'quit', 'umbrella', 'university',
                 'engineer', 'electricity', 'elephant', 'popcorn', 'peanut', 'purple',
                 'powder', 'presentation', 'pickle', 'pumpkin', 'octopus', 'octagon',
                 'orange','victory', 'vulture', 'viper', 'vampire', 'snake',
                 'success', 'soccer', 'summer', 'season', 'shiny', 'silver',
                 'roast', 'road', 'raining', 'roar', 'young', 'yell', 'window',
                 'water', 'watermelon', 'whale', 'zebra', 'zoom'
                ];
    return easyArray[Math.floor(Math.random() * easyArray.length)];
}
//================================================

// Intermediate text =============================
function setNormalText() {
    // Set color
    interBtn.style.background = '#6A1B9A';
    interBtn.style.color = 'white';

    // Reset others color
    beginBtn.style.background = 'white';
    beginBtn.style.color = '#6A1B9A';
    masterBtn.style.background = 'white';
    masterBtn.style.color = '#6A1B9A';

    normalText = getNormalText();
    txt.textContent = normalText;
    return normalText;
}

function getNormalText() {
    normalArray = ['Be the change you wish to see in the world.',
                   'Try and fail, but never fail to try.',
                   'Do one thing every day that scares you.',
                   'Let your memory be your travel bag.',
                   'The earth laughs in flowers.',
                   'Water is the driving force of all nature.'
                  ]
    return normalArray[Math.floor(Math.random() * normalArray.length)];
}
//================================================

// Master text ===================================
function setHardText() {
    // Set color
    masterBtn.style.background = '#6A1B9A';
    masterBtn.style.color = 'white';

    // Reset others color
    beginBtn.style.background = 'white';
    beginBtn.style.color = '#6A1B9A';
    interBtn.style.background = 'white';
    interBtn.style.color = '#6A1B9A';

    hardText = getHardText();
    txt.textContent = hardText;
    return hardText;
}

function getHardText() {
    hardArray = ['A wonderful serenity has taken possession of my entire soul, like ' +
                 'these sweet mornings of spring which I enjoy with my whole heart. ' +
                 'I am alone, and feel the charm of existence in this spot, which ' +
                 'was created for the bliss of souls like mine.',

                 'One morning, when Gregor Samsa woke from troubled dreams, he ' +
                 'found himself transformed in his bed into a horrible vermin. ' +
                 'He lay on his armourlike back, and if he lifted his head a ' +
                 'little he could see his brown belly, slightly domed and ' +
                 'divided by arches into stiff sections.',

                 'Far far away, behind the word mountains, far from the countries ' +
                 'Vokalia and Consonantia, there live the blind texts. Separated ' +
                 'they live in Bookmarksgrove right at the coast of the Semantics, ' +
                 'a large language ocean.',

                 'A small river named Duden flows by ' +
                 'their place and supplies it with the necessary regelialia. It ' +
                 'is a paradisematic country, in which roasted parts of ' +
                 'sentences fly into your mouth.',

                 'The quick, brown fox jumps over a lazy dog. DJs flock by when ' +
                 'MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, ' +
                 'flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex.'
                  ]
    return hardArray[Math.floor(Math.random() * hardArray.length)];
}
//================================================
