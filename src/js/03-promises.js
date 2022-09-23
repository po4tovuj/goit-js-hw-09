import { Notify } from 'notiflix';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(e) {
  e.preventDefault();
  const {
    elements: {
      delay: { value: delay },
      step: { value: step },
      amount: { value: amount },
    },
  } = e.currentTarget;

  let nextDelay = +delay;

  Array.from(Array(+amount)).forEach((item, i) => {
    nextDelay += i ? Number(step) : 0;
    createPromise(i + 1, nextDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          position: 'center-top',
          fontSize: '20px',
          width: '370px',
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          position: 'center-top',
          fontSize: '20px',
          width: '370px',
        });
      });
  });
  Promise.allSettled(promises);
}
