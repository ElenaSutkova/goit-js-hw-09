import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const selectors = {
  button: document.querySelector('button[data-start]'),
  day: document.querySelector('.value[data-days]'),
  hour: document.querySelector('.value[data-hours]'),
  minute: document.querySelector('.value[data-minutes]'),
  second: document.querySelector('.value[data-seconds]')
}

selectors.button.disabled = true;
let time = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
          selectors.button.disabled = true;
          Notify.failure("Please choose a date in the future");
      } else {
          selectors.button.disabled = false;
          time = selectedDates[0];
      }
  },
};

flatpickr("#datetime-picker", options)



selectors.button.addEventListener('click', btnClick);

function btnClick() {
  selectors.button.disabled = true;
  const interval = setInterval(() => {
    const currentTime = new Date();
    const periodTime = time - currentTime;
    if (periodTime <= 0) {
      clearInterval(interval);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(periodTime);

    const timeDay = addLeadingZero(days);
    const timeHour = addLeadingZero(hours);
    const timeMinute = addLeadingZero(minutes);
    const timeSecond = addLeadingZero(seconds);

    selectors.day.textContent = timeDay;
    selectors.hour.textContent = timeHour;
    selectors.minute.textContent = timeMinute;
    selectors.second.textContent = timeSecond;
  }, 1000)
}

function convertMs(ms) {
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

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

