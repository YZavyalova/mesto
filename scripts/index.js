const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close-btn");
const popupOpenButtonElement = document.querySelector(".profile__edit-btn");
const formElement = popupElement.querySelector(".popup__form");
const nameInput = popupElement.querySelector(".popup__input_type_name");
const jobInput = popupElement.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const likeButton = document.querySelectorAll(".photo-card__like-btn");

// добавляет модификатор active на like-btn
const makeLike = function() {
    this.classList.toggle("photo-card__like-btn_active");
};

for (let index=0; index < likeButton.length; ++index) {
    likeButton[index].addEventListener("click", makeLike);

}

//добавляет элемент для открытия и закрытия попапа + присваивает значения в полях
const openPopup = function() {
    popupElement.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

const closePopup = function() {
    popupElement.classList.remove("popup_opened");
}

//для закрытия попапа по клику на область
const closePopupByClickOverlay = function (event) {
    if (event.target === event.currentTarget) {
        closePopup();}
};

//изменение данных в полях ввода и закрытие
function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
} 

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
popupElement.addEventListener("click", closePopupByClickOverlay);
formElement.addEventListener("submit", formSubmitHandler);
