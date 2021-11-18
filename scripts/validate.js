const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
}; 

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}; 

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости
const isValid = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
}; 


const setEventListeners = (formElement, validationConfig) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, buttonElement, validationConfig);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, validationConfig);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
}; 

const enableValidation = (validationConfig) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
        });
    setEventListeners(formElement, validationConfig);
    });
};

  // Функция принимает массив полей
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    })
}; 

  // Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
      // иначе сделай кнопку активной
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}; 
    // Вызовем функцию
enableValidation(validationConfig); 
