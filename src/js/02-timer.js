import flatpickr from 'flatpickr';
import { Notify } from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const pickerInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const elements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
startBtn.setAttribute('disable', '');
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
let timerId = null;
const updateTimer = milliseconds => {
  const data = convertMs(milliseconds);
  Object.keys(data).forEach(item => {
    elements[item].innerText = addLeadingZero(data[item]);
  });
};
const clearTimer = () => {
  startBtn.setAttribute('disable', '');
  startBtn.removeEventListener('click', startTimer);
  selectedDate = null;
  clearInterval(timerId);
  updateTimer(0);
};

const startTimer = () => {
  timerId = setInterval(() => {
    let timeLeft = selectedDate - new Date();
    updateTimer(timeLeft);
    if (timeLeft < 0) {
      clearTimer();
    }
  }, 1000);
};
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    clearTimer();
    if (new Date(selectedDates[0]) < new Date()) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-top',
        fontSize: '20px',
        width: '370px',
      });
      return;
    }

    selectedDate = new Date(selectedDates[0]);
    updateTimer(selectedDate - new Date());
    startBtn.addEventListener('click', startTimer);
    startBtn.removeAttribute('disable');
  },
};

flatpickr(pickerInput, options);
