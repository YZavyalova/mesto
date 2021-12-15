export class UserInfo {
    constructor({profileName, profileJob}) {
        this._profileName = document.querySelector(profileName);
        this._profileJob = document.querySelector(profileJob);
        this._nameInput = document.querySelector('.popup__input_type_name');
        this._jobInput = document.querySelector('.popup__input_type_job');
    }
    getUserInfo() {
        const userData = {
            name: this._profileName.textContent,
            about: this._profileJob.textContent,
        }
        return userData;
    }
    setUserInfo() {
        this._profileName.textContent = this._nameInput.value;
        this._profileJob.textContent = this._jobInput.value;
    }
}
