import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

require('flatpickr/dist/themes/dark.css');

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// class CountdownTimer {
//   constructor({ selector, targetDate }) {
//     this.targetDate = targetDate;
//     this.selector = selector;
//     this.btnTimerStart = document.querySelector('[data-start]');
//     this.daysSpan = document.querySelector('[data-days]');
//     this.hoursSpan = document.querySelector('[data-hours]');
//     this.minsSpan = document.querySelector('[data-minutes]');
//     this.secsSpan = document.querySelector('[data-seconds]');
//     // this.updateTimer();
//     this.btnTimerStart.disabled = true;
//   }

const refs = {
  btnTimerStart: document.querySelector('[data-start]'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minsSpan: document.querySelector('[data-minutes]'),
  secsSpan: document.querySelector('[data-seconds]'),
};

document.body.style.backgroundColor = 'yellow';

//   updateTimer() {
//     setInterval(() => {
//       const currentTime = Date.now();
//       const delta = this.targetDate - currentTime;
//       const { days, hours, minutes, seconds } = this.convert(delta);
//       this.daysSpan.textContent = days;
//       this.hoursSpan.textContent = hours;
//       this.minsSpan.textContent = minutes;
//       this.secsSpan.textContent = seconds;
//     }, 1000);
//   }
// }

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

// const timer = new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Jan 1, 2023'),
// });
refs.btnTimerStart.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  // altInput: true,
  // weekNumbers: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      refs.btnTimerStart.disabled = false;
    } else {
      refs.btnTimerStart.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function onTimerStart() {
  const selectedDate = fp.selectedDates[0];

  timerId = setInterval(() => {
    const startTime = new Date();
    const countdown = selectedDate - startTime;
    refs.btnTimerStart.disabled = true;

    if (countdown < 0) {
      clearInterval(timerId);
      return;
    }
    updateTimerFace(convertMs(countdown));
  }, 1_000);
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.daysSpan.textContent = addLeadingZero(days);
  refs.hoursSpan.textContent = addLeadingZero(hours);
  refs.minsSpan.textContent = addLeadingZero(minutes);
  refs.secsSpan.textContent = addLeadingZero(seconds);
}

const fp = flatpickr('#datetime-picker', options);

refs.btnTimerStart.addEventListener('click', onTimerStart);
