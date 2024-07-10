const cardNumber = document.getElementById("card-number");
const cardName = document.getElementById("card-name");
const monthDate = document.getElementById("month-date");
const yearDate = document.getElementById("year-date");
const cardCvc = document.getElementById("card-cvc");

const form = document.getElementById("form");
const inputName = document.getElementById("input-name");
const inputNumber = document.getElementById("input-number");
const inputMonth = document.getElementById("input-month");
const inputYear = document.getElementById("input-year");
const inputCvc = document.getElementById("input-cvc");

const completeMessage = document.querySelector('.complete__message');
const btnContinue = document.getElementById('btnContinue');



function showError(input, message) {
    const small = input.parentElement.querySelector('small');
    small.innerText = message;
    small.classList.add('error');
    input.classList.add('inputError');
}

function clearError(input) {
    const small = input.parentElement.querySelector('small');
    small.innerText = '';
    small.classList.remove('error');
    input.classList.remove('inputError');
}

function nameValidate() {
    const regex = /^[a-zA-Z ]+$/;
    if (inputName.value === "") {
        showError(inputName, "Can't be blank");
    } else if (!regex.test(inputName.value)) {
        showError(inputName, "Wrong format, text only");
    } else {
        clearError(inputName);
        cardName.innerText = inputName.value;
    }
}

function numberValidate() {
    const regex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
    const cardNumberValue = inputNumber.value.replace(/\s/g, '');

    if (inputNumber.value === "") {
        showError(inputNumber, "Can't be blank");
    } else if (cardNumberValue.replace(/\s/g, '').length < 16) {
        showError(inputNumber, "Must be 16 digits");
    } else if (!regex.test(inputNumber.value)) {
        showError(inputNumber, "Wrong format, numbers only");
    } else {
        clearError(inputNumber);
        cardNumber.innerText = inputNumber.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    }
}

function monthValidate() {
    const regex = /^[0-9]{2}$/;
    const month = parseInt(inputMonth.value, 10);
    if (inputMonth.value === "") {
        showError(inputMonth, "Can't be blank");
    } else if (!regex.test(inputMonth.value) || month < 1 || month > 12) {
        showError(inputMonth, "Invalid month");
    } else {
        clearError(inputMonth);
        monthDate.innerText = inputMonth.value;
    }
}

function yearValidate() {
    const regex = /^[0-9]{2}$/;
    const year = parseInt(inputYear.value, 10);
    const currentYear = new Date().getFullYear() % 100;
    if (inputYear.value === "") {
        showError(inputYear, "Can't be blank");
    } else if (!regex.test(inputYear.value) || year < currentYear) {
        showError(inputYear, "Invalid year");
    } else {
        clearError(inputYear);
        yearDate.innerText = inputYear.value;
    }
}

function cvcValidate() {
    const regex = /^[0-9]{3}$/;
    if (inputCvc.value === "") {
        showError(inputCvc, "Can't be blank");
    } else if (!regex.test(inputCvc.value)) {
        showError(inputCvc, "Invalid CVC");
    } else {
        clearError(inputCvc);
        cardCvc.innerText = inputCvc.value;
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    nameValidate();
    numberValidate();
    monthValidate();
    yearValidate();
    cvcValidate();

    if (!inputName.classList.contains('inputError') &&
        !inputNumber.classList.contains('inputError') &&
        !inputMonth.classList.contains('inputError') &&
        !inputYear.classList.contains('inputError') &&
        !inputCvc.classList.contains('inputError')) {
        
        form.style.display = 'none';
        completeMessage.style.display = 'flex';
    }
});


btnContinue.addEventListener('click', () => {
    form.style.display = 'flex';
    completeMessage.style.display = 'none';

    cardNumber.innerText = '0000 0000 0000 0000';
    cardName.innerText = 'Jane Appleseed';
    monthDate.innerText = '00';
    yearDate.innerText = '00';
    cardCvc.innerText = '000';

    form.reset();
    clearError(inputName);
    clearError(inputNumber);
    clearError(inputMonth);
    clearError(inputYear);
    clearError(inputCvc);
});


inputName.addEventListener('input', () => {
    cardName.innerText = inputName.value || 'Jane Appleseed';
});
inputNumber.addEventListener('input', () => {
    cardNumber.innerText = inputNumber.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ') || '0000 0000 0000 0000';
});
inputMonth.addEventListener('input', () => {
    monthDate.innerText = inputMonth.value || '00';
});
inputYear.addEventListener('input', () => {
    yearDate.innerText = inputYear.value || '00';
});
inputCvc.addEventListener('input', () => {
    cardCvc.innerText = inputCvc.value || '000';
});
