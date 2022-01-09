import { Popup } from "./Popup";
export class PopupWithImage  extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPic = this._popup.querySelector('.popup__pic');
        this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
    }
    open (data) {
        this._popupPic.src = data.link;
        this._popupFigcaption.textContent = data.name;
        this._popupPic.alt = data.name;
        super.open();
    }
}