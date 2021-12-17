export class UserInfo {
    constructor({profileName, profileJob}) {
        this._profileName = document.querySelector(profileName);
        this._profileJob = document.querySelector(profileJob);
    }
    getUserInfo() {
        const userData = {
            name: this._profileName.textContent,
            about: this._profileJob.textContent,
        }
        return userData;
    }
    setUserInfo({name, job}) {
        this._profileName.textContent = name;
        this._profileJob.textContent = job;
    }
}
