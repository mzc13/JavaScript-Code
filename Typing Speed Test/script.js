const TEXT_AREA = document.querySelector("#test-area");
const TYPING_REFERENCE_TEXT_ELEMENT = document.querySelector("#origin-text p");
const TYPING_REFERENCE_TEXT_CONTENT = TYPING_REFERENCE_TEXT_ELEMENT.innerHTML;
const RESET_BUTTON = document.querySelector("#reset");
const TIMER = document.querySelector(".timer");
const NUMBER_OF_SECONDS_IN_A_MINUTE = 60;
const TYPING_REFERENCE_TEXT_SPLIT_ARRAY = TYPING_REFERENCE_TEXT_CONTENT.split(" ");

var timerSecondsValue = 0;
var timerMinutesValue = 0;
var runningTimer;
var isTestRunning = false;

function startTimer(){

    // Incrementing the value of seconds at the beginning rather than the end because the latter option causes
    // the timer to lag behind by 1 second
    timerSecondsValue++;

    // Making sure the minutes value increments after 60 seconds
    if(timerSecondsValue == NUMBER_OF_SECONDS_IN_A_MINUTE){
        timerSecondsValue = 0;
        timerMinutesValue++;
    }

    // Initializing the strings that will be shown in the innerHTML of the timer element
    let timerSecondsValueString = "";
    let timerMinutesValueString = "";

    // Ternary operator used to make sure that values show up as "0x" if the value is less than 10
    timerSecondsValueString = (timerSecondsValue < 10) ? "0" + timerSecondsValue : timerSecondsValue.toString();
    timerMinutesValueString = (timerMinutesValue < 10) ? "0" + timerMinutesValue : timerMinutesValue.toString();
    // Updating the innerHTML of the timer element
    TIMER.innerHTML = timerMinutesValueString + ":" + timerSecondsValueString;
}

function checkText(){

    // Split the reference paragraph and textarea paragraph into an array of strings so each index can be compared
    let textareaSplitArray = TEXT_AREA.value.split(" ");
    let typingReferenceModifiedCssArray = TYPING_REFERENCE_TEXT_SPLIT_ARRAY.slice();

    // Compare each word in both arrays
    for(var i = 0; (i<TYPING_REFERENCE_TEXT_SPLIT_ARRAY.length) && (i<textareaSplitArray.length); i++){

        // Use the original reference paragraph array for comparison because the modified css array will have extra html tags
        if(TYPING_REFERENCE_TEXT_SPLIT_ARRAY[i] != textareaSplitArray[i]){

            // If the words don't match, encompase the error with a span tag that will make the text red
            typingReferenceModifiedCssArray[i] = "<span class=\"incorrect\">" + typingReferenceModifiedCssArray[i] + "</span>";
            
            // Set the html of the reference text to use the modified html that colors incorrect words
            TYPING_REFERENCE_TEXT_ELEMENT.innerHTML = typingReferenceModifiedCssArray.join(" ");

            // Return immediately after first mistake is found to prevent wasting resources
            return;
        }
    }

    // At this point in the function, all the text is correct and should be replaced with the original reference
    // text rather than having any previous mistakes colored
    TYPING_REFERENCE_TEXT_ELEMENT.innerHTML = TYPING_REFERENCE_TEXT_CONTENT;

    // Only end the test if all the words match and the lengths of the two paragraphs are equal
    if(TYPING_REFERENCE_TEXT_SPLIT_ARRAY.length == textareaSplitArray.length){
        endTest();
    }
}

function resetTest(){

    stopTimer();

    // Resets test to initial state.
    TEXT_AREA.addEventListener("keyup", startTest, false);
    timerMinutesValue = 0;
    timerSecondsValue = 0;
    TIMER.innerHTML = "00:00";
    TEXT_AREA.value = "";
    TYPING_REFERENCE_TEXT_ELEMENT.innerHTML = TYPING_REFERENCE_TEXT_CONTENT;
}

function stopTimer(){

    // Stops the test
    clearInterval(runningTimer);
    runningTimer = null;
    isTestRunning = false;
    TEXT_AREA.removeEventListener("keyup", startTest, false);
}

function startTest(e){

    // Start the timer on only the first key press
    if(!isTestRunning){
        runningTimer = setInterval(startTimer, 1000);
        isTestRunning = true;
    }

    // Check the text after every key press
    checkText();
}

function endTest(){
    
    stopTimer();

    // Calculate typing speed and show it in an alert
    let wordCount = TYPING_REFERENCE_TEXT_SPLIT_ARRAY.length;
    let minutesTakenToCompleteTest = timerMinutesValue + (timerSecondsValue/60);
    let wordsPerMinute = Math.round(wordCount/minutesTakenToCompleteTest);
    alert("Test Complete!\nYour Typing Speed is " + wordsPerMinute + " words per minute!");
}

// Use keyup as the trigger because otherwise the function will check the text before the textarea is updated
// with the new character
TEXT_AREA.addEventListener("keyup", startTest, false);

RESET_BUTTON.addEventListener("click", resetTest, false);