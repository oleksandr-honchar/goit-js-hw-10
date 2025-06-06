import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const { delay, state } = event.target.elements;

  const delayValue = +delay.value;
  const stateValue = state.value;

  setTimeout(() => {
    new Promise((resolve, reject) => {
      if (stateValue === 'fulfilled') {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    })
      .then(() => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${delayValue}ms`,
          position: 'topRight',
        });
      })
      .catch(() => {
        iziToast.error({
          message: `❌ Rejected promise in ${delayValue}ms`,
          position: 'topRight',
        });
      });
  }, delayValue);
}
