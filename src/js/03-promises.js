import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmitPromise);

function onSubmitPromise(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget.elements;

  if (amount.value <= 0 || step.value < 0 || delay.value < 0) {
    Notiflix.Notify.failure(`❌ Write number > 0`);
  } else {
    for (let i = 0; i < amount.value; i++) {
      let position = 1;
      position += i;
      const delays = Number(delay.value) + Number(step.value) * i;

      createPromise(position, delays)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
