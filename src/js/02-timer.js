import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const buttonStart = document.querySelector('button[data-start]');
const cunterDays = document.querySelector('span[data-days]');
const cunterHours = document.querySelector('span[data-hours]');
const cunterMinutes = document.querySelector('span[data-minutes]');
const cunterSeconds = document.querySelector('span[data-seconds]');
const inputDate = document.querySelector("#datetime-picker");
buttonStart.setAttribute('disabled', true);
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= options.defaultDate) {
            Notiflix.Notify.failure("Обери дату майбутнього!!!");
        }
        else if (selectedDates[0] > options.defaultDate) {
            buttonStart.removeAttribute('disabled');
        }
        buttonStart.addEventListener('click', () => {
            clearInterval(intervalId)
            intervalId = setInterval(() => {
                const time = selectedDates[0] - new Date();
                const { days, hours, minutes, seconds } = convertMs(time);
                cunterDays.textContent = days;
                cunterHours.textContent = hours;
                cunterMinutes.textContent = minutes;
                cunterSeconds.textContent = seconds;
                if (time <= 1000) {
                    clearInterval(intervalId);
                    buttonStart.setAttribute('disabled', true);
                }
                updateDates({ days, hours, minutes, seconds })
            }, 1000);
        })
    },
};
function updateDates({ days, hours, minutes, seconds }) {
    cunterDays.textContent = addLeadingZero(days);
    cunterHours.textContent = addLeadingZero(hours);
    cunterMinutes.textContent = addLeadingZero(minutes);
    cunterSeconds.textContent = addLeadingZero(seconds);
  }
function addLeadingZero(value){
    return value.toString().padStart(2, '0');
};

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


flatpickr(inputDate, options);