const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close-btn");
const popupOpenButtonElement = document.querySelector(".profile__edit-btn");
const formElement = popupElement.querySelector(".popup__form");
const nameInput = popupElement.querySelector(".popup__input_type_name");
const jobInput = popupElement.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

//добавляет элемент для открытия и закрытия попапа
const togglePopupVisibility = function () {
    popupElement.classList.toggle("popup_opened");
};
//для закрытия попапа по клику на область
const closePopupByClickOverlay = function (event) {
    if (event.target === event.currentTarget) {
        togglePopupVisibility();}
};

//изменение данных в полях ввода
function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopupVisibility();
} 

popupOpenButtonElement.addEventListener("click", togglePopupVisibility);
popupCloseButtonElement.addEventListener("click", togglePopupVisibility);
popupElement.addEventListener("click", closePopupByClickOverlay);
formElement.addEventListener("submit", formSubmitHandler);
