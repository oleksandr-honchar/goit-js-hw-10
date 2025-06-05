import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form'); // Ensure your form has a proper reference

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const { delay, state } = event.target.elements;

  const delayValue = +delay.value;
  const stateValue = state.value;

  // Use setTimeout for the delay
  setTimeout(() => {
    // Simulate a Promise with resolve or reject based on state value
    new Promise((resolve, reject) => {
      if (stateValue === 'fulfilled') {
        resolve(); // Fulfilled state, resolve the promise
      } else {
        reject(); // Rejected state, reject the promise
      }
    })
      .then(() => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${delayValue}ms`, // Corrected `delay` reference
          position: 'topRight',
        });
      })
      .catch(() => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delayValue}ms`, // Corrected `delay` reference
          position: 'topRight',
        });
      });
  }, delayValue); // Apply the delay before triggering the promise
}
