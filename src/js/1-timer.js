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
    window.alert('Please choose a date in the future');
    datePicker.value = '';
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

    console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
    console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
    console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    timerDisplay.textContent = `${String(days).padStart(2, '0')} : ${String(
      hours
    ).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(
      seconds
    ).padStart(2, '0')}`;
  }, 1000);
});
