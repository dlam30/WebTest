// Text type ========
var easyText;
var normalText;
var hardText;
// ==================
var correct;
var wrong;
var easyArray;
var normalArray;
var hardArray;
// Mode =============
var beginMode;
var interMode;
var masterMode;
// ==================
var testedText      = [];
var txt             = document.querySelector("#text");
var textbox         = document.querySelector("#textarea");
var topContainer    = document.querySelector("#top");
var resultContainer = document.querySelector("#result");
var paragraph       = document.querySelector("#resParagraph");
// Buttons ==========
var beginBtn        = document.querySelector("#beginner");
var interBtn        = document.querySelector("#inter");
var masterBtn       = document.querySelector("#master");


init();

function init() {
    correct = 0;
    wrong = 0;

    // Set starting mode to beginner
    beginMode = true;
    interMode = false;
    masterMode = false;

    setEasyText();
};

// Event when beginner button is clicked
beginBtn.addEventListener("click", function() {
    // Set mode
    beginMode = true;
    interMode = false;
    masterMode = false;

    txt.style.fontSize = '40px';

    setEasyText();
});

// Event when intermediate button is clicked
interBtn.addEventListener("click", function() {
    // Set mode
    beginMode = false;
    interMode = true;
    masterMode = false;

    // Reset tested texts
    testedText = [];

    txt.style.fontSize = '25px';

    setNormalText();
});

// Event when master button is clicked
masterBtn.addEventListener("click", function() {
    // Set mode
    beginMode = false;
    interMode = false;
    masterMode = true;

    // Reset tested texts
    testedText = [];

    // Set color
    masterBtn.style.background = '#6A1B9A';
    masterBtn.style.color = 'white';

    // Reset others color
    beginBtn.style.background = 'white';
    beginBtn.style.color = '#6A1B9A';
    interBtn.style.background = 'white';
    interBtn.style.color = '#6A1B9A';

    // setNormalText();
});

textbox.onkeyup = function() {
    if (beginMode) {
        testEasyText();
    } else if (interMode) {
        testNormalText();
    }
}

function testEasyText() {
    if (textbox.value.length === easyText.length) {
        testedText.push(easyText);
        console.log(testedText);
        console.log(testedText.length);
        if (testedText.length === 5) {
            alert('done');
            topContainer.style.display = 'none';
            // resultContainer.style.display = 'block';
            // Display result here
        } else {
            if (textbox.value === easyText) {
                reset();
                correct++;
            } else {
                reset();
                wrong++;
            }
        }
    } else if (textbox.value.length > easyText.length) {
        alert('Your input is longer than current text, try again !!');
        textbox.value = '';
    }
}

function testNormalText() {
    if (textbox.value.length === normalText.length) {
        testedText.push(normalText);
        console.log(testedText);
        console.log(testedText.length);
        if (testedText.length === 2) {
            alert('done');
            topContainer.style.display = 'none';
            // resultContainer.style.display = 'block';
            // Display result here
        } else {
            if (textbox.value === normalText) {
                reset();
                correct++;
            } else {
                reset();
                wrong++;
            }
        }
    } else if (textbox.value.length > normalText.length) {
        alert('Your input is longer than current text, try again !!');
        textbox.value = '';
    }
}

function reset() {
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

//================================================
