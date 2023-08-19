class Api {
    constructor(options) {
        this._url = options.baseUrl;
    }

    getInitialCards() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
            .then(handleResponse)

    }

    getInfoAboutUser() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
            .then(handleResponse)
    }

    setInfoAboutUser(name, about) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(handleResponse)
    }

    addUserCard(name, link) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(handleResponse)
    }

    setAvatar(link) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(handleResponse)
    }

    deleteCard(id) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
            .then(handleResponse)
    }

    setLike(id) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
            .then(handleResponse)
    }

    deleteLike(id) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
            .then(handleResponse)
    }
}

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(new Error("Произошла ошибка"));
}

const api = new Api({
    baseUrl: 'http://localhost:3000',
});

export default api;