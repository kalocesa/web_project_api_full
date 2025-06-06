import avatarEdit from "../../images/pencil.svg";
import profileButton from "../../images/editButton.svg";
import addButton from "../../images/addButton.svg";
import Popup from "./Popup/Popup";
import NewCard from "./form/NewCard/NewCard";
import EditAvatar from "./form/EditAvatar/EditAvatar";
import EditProfile from "./form/EditProfile/EditProfile";
import Card from "./components/Card/Card";
import Api from "../../utils/api";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getToken } from "../../utils/token";

const Main = () => {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, setCurrentUser } = userContext;
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const token = getToken();

  const api = new Api({
    baseUrl: "https://api.aroundmx.mooo.com",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  const handleCreateCard = (title, link) => {
    api.addCards({ name: title, link }).then((response) => {
      setCards((state) => [response, ...state]);
      setPopup(null);
    });
  };

  const handleChangeAvatar = (avatar) => {
    api.avatarProfile(avatar).then((response) => {
      setCurrentUser(response);
      setPopup(null);
    });
  };

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard handleCreateCard={handleCreateCard} />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile closePopup={handleClosePopup} />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar handleChangeAvatar={handleChangeAvatar} />,
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  async function handleCardLike(card) {
    const isLiked = card.likes.some((userId) => userId === currentUser._id); // ✅ Verifica si ya está en la lista de likes

    await api
      .likeCard(card._id, isLiked)
      .then((updatedCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? updatedCard : c))
        );
      })
      .catch((error) => console.error("Error al actualizar el like:", error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        handleClosePopup();
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    api.getProfileInfo().then((response) => {
      setCurrentUser(response);
    });
    api.getInitialCards().then((response) => {
      setCards(response);
    });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content-avatar">
          <img
            id="image-avatar"
            src={currentUser.avatar}
            alt="avatar"
            className="profile__avatar"
          />
          <div
            className="profile__content-edit_profile"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img
              id="image-avatar-edit"
              src={avatarEdit}
              alt="avatar-edit"
              className="profile__avatar-edit"
            />
          </div>
        </div>
        <div className="profile__content-edit">
          <h1 className="profile__name">{currentUser.name}</h1>
          <img
            id="image-editButton"
            src={profileButton}
            alt="botón para editar el perfil"
            className="profile__button-edit"
            onClick={() => handleOpenPopup(editProfilePopup)}
          />
          <p className="profile__explorer">{currentUser.about}</p>
        </div>
        <div className="profile__content-add">
          <img
            id="image-addButton"
            src={addButton}
            alt="botón para añadir lugares"
            className="profile__add-button"
            onClick={() => handleOpenPopup(newCardPopup)}
          />
        </div>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            currentUser={currentUser}
            handleOpenPopup={handleOpenPopup}
            handleLikeClick={handleCardLike}
            handleCardDelete={handleCardDelete}
          />
        ))}
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
};

export default Main;
