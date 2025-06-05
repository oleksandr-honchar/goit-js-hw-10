import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timerDisplay = document.querySelector('.timer');
let timerId = null;
let selectedDate = null;
flatpickr(datePicker, options);
startButton.disabled = true;
datePicker.addEventListener('input', () => {
  selectedDate = new Date(datePicker.value);
  if (selectedDate > new Date()) {
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
  }
});
startButton.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
  }
  timerId = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = selectedDate - currentTime;
    if (timeDifference <= 0) {
      clearInterval(timerId);
      timerDisplay.textContent = 'Time is up!';
      return;
    }
    const hours = String(
      Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
    ).padStart(2, '0');
    const minutes = String(
      Math.floor((timeDifference / (1000 * 60)) % 60)
    ).padStart(2, '0');
    const seconds = String(Math.floor((timeDifference / 1000) % 60)).padStart(
      2,
      '0'
    );

    timerDisplay.textContent = `${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
});
