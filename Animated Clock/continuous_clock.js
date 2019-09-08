const HOUR_HAND = document.getElementById("hour");
const MINUTE_HAND = document.getElementById("minute");
const SECOND_HAND = document.getElementById("second");

const HOUR_MARKS_DEGREES = 30;
const MINUTE_MARKS_DEGREES = 6;
const SECOND_MARKS_DEGREES = 6;
const MINUTES_PER_HOUR_HAND_DEGREE = 2;
const SECONDS_PER_MINUTE_HAND_DEGREE = 10;
const MILLISECONDS_PER_SECOND_HAND_DEGREE = 167;

var updateClock = function() {
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();
    let currentSecond = currentTime.getSeconds();
    let currentMillisecond = currentTime.getMilliseconds();

    let hourHandAngle = (currentHour * HOUR_MARKS_DEGREES) + (currentMinute / MINUTES_PER_HOUR_HAND_DEGREE);
    let minuteHandAngle = (currentMinute * MINUTE_MARKS_DEGREES) + (currentSecond / SECONDS_PER_MINUTE_HAND_DEGREE);
    let secondHandAngle = (currentSecond * SECOND_MARKS_DEGREES) + (currentMillisecond / MILLISECONDS_PER_SECOND_HAND_DEGREE);

    HOUR_HAND.style.transform = "rotate(" + hourHandAngle + "deg)";
    MINUTE_HAND.style.transform = "rotate(" + minuteHandAngle + "deg)";
    SECOND_HAND.style.transform = "rotate(" + secondHandAngle + "deg)";
}

setInterval(updateClock, 10);