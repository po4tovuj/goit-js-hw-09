import { Notify } from 'notiflix';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve().then(() => {
      setTimeout(() => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          position: 'center-top',
          fontSize: '20px',
          width: '370px',
        });
      }, delay);
    });
  } else {
    return Promise.reject().catch(() => {
      setTimeout(() => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          position: 'center-top',
          fontSize: '20px',
          width: '370px',
        });
      }, delay);
    });
  }
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
  const promises = Array.from(Array(+amount)).map((item, i) => {
    nextDelay += i ? Number(step) : 0;
    createPromise(i + 1, nextDelay);
  });
  Promise.allSettled(promises);
}
