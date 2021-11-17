enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_state_invalid',
});

function enableValidation() {
	const forms = Array.from(document.querySelectorAll('.popup__form'));

	forms.forEach(addListenersToForm);
}

function addListenersToForm(form) {
	const inputs = Array.from(form.querySelectorAll('.popup__input'));
	inputs.forEach(addListenersToInput);

	form.addEventListener('submit', (evt)=> {
        evt.preventDefault();
    });

    form.addEventListener('input', handleFormInput);
    toggleButton(form);
}

function handleFormInput(evt) {
    toggleButton(evt.currentTarget);
}

function toggleButton(form) {
    const button = form.querySelector('.popup__button');
    const isFormInvalid = !form.checkValidity();

    button.disabled = isFormInvalid;
    button.classList.toggle('popup__button_invalid', isFormInvalid);
}

function addListenersToInput(input) {
	input.addEventListener('input', handleFieldValidation);
}

function handleFieldValidation(evt) {
	const element = evt.target;
	const errorContainer = document.querySelector(`#${element.id}-error`);
    errorContainer.textContent = element.validationMessage;

	element.classList.toggle(
		'popup__input_state_invalid',
		!element.validity.valid
	);
}

