const MAX_CHARS = 150;
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';

const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector('.spinner');

//Counter Component
const inputHandler = () => {
    counterEl.textContent = MAX_CHARS - textareaEl.value.length;
};

textareaEl.addEventListener('input', inputHandler);

// FORM Component

const showVisualIndicator = (textCheck) => {

    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';

    formEl.classList.add(className);
    
    setTimeout(() => {
        formEl.classList.remove(className);
    }, 2000)

}

const submitHandler = (event) => {
    //prevent default browser action
    event.preventDefault();



    const text = textareaEl.value;

    //validate text
    if(text.includes("#") && text.length >= 5){
        showVisualIndicator('valid');
    }else{
        showVisualIndicator('invalid');
        textareaEl.focus();

        return;
    }

    //extract other info
    const hashtag = text.split(" ").find(word => word.includes('#'));
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;

    feedbackItem = {
        upvoteCount: upvoteCount,
        company: company,
        badgeLetter: badgeLetter,
        daysAgo: daysAgo,
        text: text
    };

    renderFeedbackItem(feedbackItem);

    fetch(`${BASE_API_URL}/feedbacks`, {
        method: "POST",
        body: JSON.stringify(feedbackItem),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(response => {
        if(!response.ok){
            console.log("Something went wrong");
            return;
        }
        console.log("Successfully submitted");

    }).catch(error => console.log(error) );

    textareaEl.value = "";

    submitBtnEl.blur();

    counterEl.textContent = MAX_CHARS;

};

const renderFeedbackItem = (feedbackItem) => {

    const feedbackItemHTML = `
        <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${feedbackItem.upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${feedbackItem.company}</p>
                <p class="feedback__text">${feedbackItem.text}</p>
            </div>
            <p class="feedback__date">${feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
        </li>`;        
        feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);

};

formEl.addEventListener('submit', submitHandler);

// FEEDBACK COMPONENT
const clickHandler = (event) => {
    const clickedEl = event.target;

    const upvoteIntention = clickedEl.className.includes('upvote');

    if(upvoteIntention){
        const upvoteBtnEl = clickedEl.closest('.upvote');

        const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__count');
        upvoteCountEl.textContent = ++upvoteCountEl.textContent;

        upvoteBtnEl.disabled = true;

    }else{
        clickedEl.closest('.feedback').classList.toggle('feedback--expand');
    }

    console.log(clickedEl);
}

feedbackListEl.addEventListener('click', clickHandler);

fetch(`${BASE_API_URL}/feedbacks`).then(response => {
    if(!response.ok){
        console.log("ERROR has occurred with fetching");
        return;
    }
    return response.json();
}).then(data => {
    spinnerEl.remove();
    console.log(data.feedbacks[5]);

    data.feedbacks.forEach(feedbackItem => {
        renderFeedbackItem(feedbackItem);
    });

}).catch(error => {
    feedbackListEl.textContent = `Failed to fetch feedback item. Error message ${error.message}`;
});