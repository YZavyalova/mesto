
export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then(this._errorHandler);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(this._errorHandler);
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH', 
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.job
            })
        }).then(this._errorHandler);
    }

    postCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(this._errorHandler);
    }

    deleteCard({_id}) {
        return fetch(`${this._url}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._errorHandler);
    }

    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data['link-avatar']
            })
        }).then(this._errorHandler);
    }

    setLike({_id}) {
        return fetch(`${this._url}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._errorHandler);
    }

    unsetLike({_id}) {
        return fetch(`${this._url}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._errorHandler);
    }

    _errorHandler(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
}
