import throttle from 'lodash.throttle';

const FEEDBACK_ENUM = 'feedback-form-state';
const UPDATE_FREQUENCY = 500;
const formElement = document.querySelector('form');

const saveForm = form => {
  localStorage.setItem(FEEDBACK_ENUM, JSON.stringify(form));
};

const clearForm = () => {
  localStorage.removeItem(FEEDBACK_ENUM);
  formElement.reset();
};
const parseFormElements = () => {
  try {
    const {
      elements: {
        email: { value: email },
        message: { value: message },
      },
    } = formElement;
    return { email, message };
  } catch (error) {
    console.error(error);
  }
};
const onFormChange = () => {
  const formObject = parseFormElements();
  saveForm(formObject);
};
const handleSubmit = event => {
  event.preventDefault();
  clearForm();
};
const checkDataInCache = () => {
  return JSON.parse(localStorage.getItem(FEEDBACK_ENUM)) || null;
};
window.onload = () => {
  const formData = checkDataInCache();
  if (!formData) return;
  Object.keys(formData).forEach(
    elementName =>
      (formElement.elements[elementName].value = formData[elementName])
  );
};
formElement.addEventListener('input', throttle(onFormChange, UPDATE_FREQUENCY));
formElement.addEventListener('submit', handleSubmit);
