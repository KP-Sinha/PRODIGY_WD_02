let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');
let lapBtn = document.getElementById('lap');
 
let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let timer = false;

let lapTimes = [];
let lapCounter = 1;
 
startBtn.addEventListener('click', function () {
    timer = true;
    stopWatch();
});
 
stopBtn.addEventListener('click', function () {
    timer = false;
});
 
resetBtn.addEventListener('click', function () {
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    lapTimes = [];
    lapCounter = 0;
    updateDisplay();
    updateLapList();
});
 
lapBtn.addEventListener('click', function () {
    if (timer) {
        const lapTime = formatTime(hour * 3600000 + minute * 60000 + second * 1000 + count * 10);
        lapTimes.push(`Lap ${lapCounter}: ${lapTime}`);
        lapCounter++;
        updateLapList();
    }
});

function stopWatch() {
    if (timer) {
        count++;
 
        if (count == 100) {
            second++;
            count = 0;
        }
 
        if (second == 60) {
            minute++;
            second = 0;
        }
 
        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }
 
        updateDisplay();
        setTimeout(stopWatch, 10);
    }
}

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(2);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}

function updateDisplay() {
    document.getElementById('hr').innerHTML = hour < 10 ? `0${hour}` : hour;
    document.getElementById('min').innerHTML = minute < 10 ? `0${minute}` : minute;
    document.getElementById('sec').innerHTML = second < 10 ? `0${second}` : second;
    document.getElementById('count').innerHTML = count < 10 ? `0${count}` : count;
}

function updateLapList() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = '';
    lapTimes.forEach((lapTime) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapList.appendChild(lapItem);
    });
}

