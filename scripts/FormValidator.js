
export class FormValidator {
    constructor(data, formElement) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }
    _showInputError(inputElement, errorMessage)  {
        // Находим элемент ошибки внутри самой функции
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError (inputElement) {
        // Находим элемент ошибки
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }; 
    
    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    // Метод принимает массив полей ввода
    // и элемент кнопки, состояние которой нужно менять
    _toggleButtonState (inputList, buttonElement) {
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
            buttonElement.classList.add(this._inactiveButtonClass);// при открытии попапа кнопка неактивная 
            buttonElement.disabled = true;
        } else {
        // иначе сделай кнопку активной
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

  // метод принимает массив полей
    _hasInvalidInput (inputList) {
    // проходим по этому массиву методом some
        return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся фунцкция
        // hasInvalidInput вернёт true
            return !inputElement.validity.valid;
        });
    }

    clearValidation () {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState(this._inputList, this._buttonElement);
    }

    _setEventListeners() {
        // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
        this._toggleButtonState(this._inputList, this._buttonElement);
        // Обойдём все элементы полученной коллекции
        this._inputList.forEach((inputElement) => {
          // каждому полю добавим обработчик события input
            inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            this._toggleButtonState(this._inputList, this._buttonElement);
            });
        });
    };

    enableValidation () {

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };
}