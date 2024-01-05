const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');

const inputHandler = () => {
    const maxNumberChar = 150;
    counterEl.textContent = maxNumberChar - textareaEl.value.length;
};

textareaEl.addEventListener('input', inputHandler);