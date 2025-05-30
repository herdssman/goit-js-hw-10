import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
const btn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

btn.disabled = true;

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
        if (userSelectedDate < new Date()) {
            iziToast.error({
                message: 'Please choose a date in the future',
            });
            btn.disabled = true;
        } else {
            btn.disabled = false;
      }
    }
});

btn.addEventListener("click", () => {
    input.disabled = true;
    btn.disabled = true;

    const interval = setInterval(() => {
        const timeLeft = userSelectedDate - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval);
            input.disabled = false;
            btn.disabled = true;
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(timeLeft);

        document.querySelector('[data-days]').textContent = addLeadingZero(days);
        document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);

    }, 1000)
});

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
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