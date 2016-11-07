var txt = document.querySelector("#text");
var easyText;
var textbox = document.querySelector("#textarea");
var testedText = [];
var correct;
var wrong;
var easyArray;

init();

function init() {
    correct = 0;
    wrong = 0;
    setEasyText();
};

textbox.onkeyup = function() {
    if (textbox.value.length === easyText.length) {
        testedText.push(easyText);
        console.log(testedText);
        console.log(testedText.length);
        if (testedText.length === easyArray.length) {
            alert('done');
            window.location.href = 'result.html';
        } else {
            if (textbox.value === easyText) {
                reset();
                alert("correct");
                correct++;
            } else {
                reset();
                alert("wrong");
                wrong++;
            }
        }
    } else if (textbox.value.length > easyText.length) {
        alert('Your input is longer than current text, try again !!');
        textbox.value = '';
    }
}

function reset() {
    setEasyText();
    while (testedText.indexOf(easyText) !== -1 ) {
        setEasyText();
    }
    textbox.value = '';
}

function setEasyText() {
    easyText = getEasyText();
    txt.textContent = easyText;
    return easyText;
}

function checkEasyText() {
    console.log(easyText);
}

function getEasyText() {
    easyArray =  ['apple', 'ant', 'air', 'bed', 'bat', 'banana', 'balloon',
             'bell', 'bag', 'cat', 'chair', 'cabbage', 'corn', 'dog'
            //  'duck', 'dime', 'door', 'dance', 'ears', 'eyes', 'easy',
            //  'earn'
            ];
    return easyArray[Math.floor(Math.random() * easyArray.length)];
}
