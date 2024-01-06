const MAX_CHARS = 150;


const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector(".submit-btn");

//Counter Component
const inputHandler = () => {
    counterEl.textContent = MAX_CHARS - textareaEl.value.length;
};

textareaEl.addEventListener('input', inputHandler);

// FORM Component
const submitHandler = (event) => {
    //prevent default browser action
    event.preventDefault();

    const text = textareaEl.value;

    //validate text
    if(text.includes("#") && text.length >= 5){
        formEl.classList.add('form--valid');

        setTimeout(() => {
            formEl.classList.remove('form--valid');
        }, 2000)

    }else{
        formEl.classList.add('form--invalid');

        setTimeout(() => {
            formEl.classList.remove('form--invalid');
        }, 2000)
        
        textareaEl.focus();

        return;
    }

    //extract other info
    const hashtag = text.split(" ").find(word => word.includes('#'));
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;

    //new feedback item html
    const feedbackItemHTML = `
        <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${company}</p>
                <p class="feedback__text">${text}</p>
            </div>
            <p class="feedback__date">${daysAgo === 0 ? "NEW" : `${daysAgo}d`}</p>
        </li>
    `;
    
    //insert into HTML
    feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);

    textareaEl.value = "";

    submitBtnEl.blur();

    counterEl.textContent = MAX_CHARS;

};

formEl.addEventListener('submit', submitHandler);