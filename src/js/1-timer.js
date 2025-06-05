import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timerDisplay = document.querySelector('.timer');

let timerId = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  defaultDate: new Date(),
  onChange(selectedDates, dateStr, instance) {
    selectedDate = selectedDates[0];

    if (selectedDate > new Date()) {
      startButton.disabled = false;
      instance.close();
    } else {
      iziToast.error({
        title: 'Invalid Date',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
      datePicker.value = '';
    }
  },
};

startButton.disabled = true;
flatpickr(datePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatTime({ days, hours, minutes, seconds }) {
  return `${String(days).padStart(2, '0')}d : ${String(hours).padStart(
    2,
    '0'
  )}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(
    2,
    '0'
  )}s`;
}

startButton.addEventListener('click', () => {
  if (!selectedDate || selectedDate <= new Date()) return;

  startButton.disabled = true;
  datePicker.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const timeDiff = selectedDate - now;

    if (timeDiff <= 0) {
      clearInterval(timerId);
      timerDisplay.textContent = '00 : 00 : 00 : 00';

      datePicker.disabled = false;
      selectedDate = null;
      startButton.disabled = true;
      return;
    }

    const time = convertMs(timeDiff);
    timerDisplay.textContent = formatTime(time);
  }, 1000);
});
