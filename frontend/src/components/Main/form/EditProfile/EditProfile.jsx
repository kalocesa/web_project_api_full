import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

const EditProfile = ({ closePopup }) => {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({ name, about: description });
    closePopup();
  };

  return (
    <form
      name="profile"
      className="popup__form popup__form-profile"
      id="profile_form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        required
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_name"
        id="name"
        name="name"
        placeholder="Nombre"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__input-error name-error"></span>
      <input
        type="text"
        required
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_aboutme"
        id="aboutme"
        name="description"
        placeholder="Acerca de mí"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error aboutme-error"></span>
      <button type="submit" className="popup__button-submit">
        Guardar
      </button>
    </form>
  );
};

export default EditProfile;
