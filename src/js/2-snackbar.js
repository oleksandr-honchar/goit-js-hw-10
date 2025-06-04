form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const { delay, state } = event.target.elements;

  const delayValue = +delay.value;
  const stateValue = state.value;

  setTimeout(() => {
    new Promise((resolve, reject) => {
      if (stateValue === 'fulfilled') {
        console.log(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        console.log(`❌ Rejected promise in ${delay}ms`);
      }
    })
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }, delayValue);
}
