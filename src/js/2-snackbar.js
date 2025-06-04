const formData = {
  email: '',
  message: '',
};

const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
if (savedData) {
  formData.email = savedData.email;
  formData.message = savedData.message;

  document.querySelector('input[name="email"]').value = formData.email;
  document.querySelector('textarea[name="message"]').value = formData.message;
}

const form = document.querySelector('.feedback-form');

form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name in formData) {
    formData[name] = value.trim();
  }

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
  } else {
    console.log(formData);

    form.reset();
    localStorage.removeItem('feedback-form-state');
    Object.keys(formData).forEach(key => (formData[key] = ''));
  }
});
