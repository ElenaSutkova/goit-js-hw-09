
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const button = document.querySelector('button');

form.addEventListener('submit', formSubmit);
function formSubmit(evt) {
  evt.preventDefault();

  const elementsForm = evt.currentTarget.elements;
  let delay = Number(elementsForm.delay.value);
  const step = Number(elementsForm.step.value);
  const amount = Number(elementsForm.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
    .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;    
  }
};

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({position, delay})
      };
    }, delay)
  })
}