import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const btnEl = document.querySelector('button');
const inputEl = document.querySelector('#datetime-picker');
btnEl.disabled = true;

const elements = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
const { days, hours, minutes, seconds } = elements;

btnEl.addEventListener('click', starttimerFunction);
const dataObj = {
    selectData: 0,
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    dataObj.selectData = selectedDates[0];
    if (selectedDates[0] > new Date()) {
      btnEl.disabled = false;
    } else {
      btnEl.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(b) {
  days.textContent = String(b.days).padStart(2, '00');
  hours.textContent = String(b.hours).padStart(2, '00');
  minutes.textContent = String(b.minutes).padStart(2, '00');
  seconds.textContent = String(b.seconds).padStart(2, '00');
}

function starttimerFunction(e) {
  inputEl.disabled = true;
  btnEl.disabled = true;
   const timerrun = setInterval(() => {
    let restData = dataObj.selectData.getTime() - new Date().getTime();
    addLeadingZero(convertMs(restData - 1000));
    if (restData<2000){
        clearTimeout(timerrun);
        inputEl.disabled = false;
        btnEl.disabled = true;
   }
  }, 1000);
}
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
