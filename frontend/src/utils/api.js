import { getToken } from "./token";
const token = getToken();

class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl; //token personal y se le agregarán las direcciones de usuario o tarjeta
    this.headers = headers; // mi encabezado contiene la autorización y el Content-type: application/jason.
  }

  async checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const errorMessage = await res.text();
    throw new Error(`Error ${res.status}: ${errorMessage}`);
  }

  getProfileInfo() {
    //listo
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this.checkResponse);
  }

  getInitialCards() {
    //listo
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this.checkResponse);
  }

  editProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    }).then(this.checkResponse);
  }

  avatarProfile(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH", //método para actualizar el perfil de un usuario.
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this.checkResponse);
  }

  addCards(name, link) {
    //listo
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST", //método para enviar datos que pueden ser editados
      headers: this.headers,
      body: JSON.stringify(name, link),
    }).then(this.checkResponse);
  }

  likeCard(cardId, isLike) {
    //listo
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLike ? "DELETE" : "PUT", //actualiza el recurso, para poner el corazón de like, en vez del dislike.
      headers: this.headers,
    }).then(this.checkResponse);
  }

  dislikeCard(cardId) {
    //listo
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE", //elimina el recurso del corazón del like y se queda en su estado original de dislike.
      headers: this.headers,
    }).then(this.checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE", //elimina la tarjeta
      headers: this.headers,
    }).then(this.checkResponse);
  }
}

export const api = new Api({
  baseUrl: "https://api.aroundmx.mooo.com",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    authorization: `Bearer ${token}`,
  },
});

/*{"usuario":{"nombre": "Jacques Cousteau", "acerca de": "Explorador", 
"avatar": "https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg", 
// "_id": "d9ba1594d5a101fce59f4e7b"}, "token": "06f837c5-1d9d-4c0c-961a-18b129b4677f"}*/
