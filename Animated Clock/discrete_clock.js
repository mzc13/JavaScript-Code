const HOUR_HAND = document.getElementById("hour");
const MINUTE_HAND = document.getElementById("minute");
const SECOND_HAND = document.getElementById("second");

const HOUR_MARKS_DEGREES = 30;
const MINUTE_MARKS_DEGREES = 6;
const SECOND_MARKS_DEGREES = 6;

var updateClock = function() {
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();
    let currentSecond = currentTime.getSeconds();

    let hourHandAngle = currentHour * HOUR_MARKS_DEGREES;
    let minuteHandAngle = currentMinute * MINUTE_MARKS_DEGREES;
    let secondHandAngle = currentSecond * SECOND_MARKS_DEGREES;

    HOUR_HAND.style.transform = "rotate(" + hourHandAngle + "deg)";
    MINUTE_HAND.style.transform = "rotate(" + minuteHandAngle + "deg)";
    SECOND_HAND.style.transform = "rotate(" + secondHandAngle + "deg)";
}

setInterval(updateClock, 1000);