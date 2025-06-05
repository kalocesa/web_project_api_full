import { useState } from "react";

const NewCard = (props) => {
  const { handleCreateCard } = props;
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    handleCreateCard(title, link);
  };

  const handleTitleSubmit = (evt) => {
    setTitle(evt.target.value);
  };

  const handleLinkSubmit = (evt) => {
    setLink(evt.target.value);
  };

  return (
    <form name="add" className="popup__form" noValidate>
      <input
        type="text"
        required
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_title"
        id="title"
        name="title"
        placeholder="Título"
        value={title}
        onChange={handleTitleSubmit}
      />
      <span className="popup__input-error title-error"></span>
      <input
        type="url"
        required
        className="popup__input popup__input_link"
        id="link"
        name="link"
        placeholder="Imagen (URL)"
        value={link}
        onChange={handleLinkSubmit}
      />
      <span className="popup__input-error link-error"></span>
      <button
        id="add-submit"
        type="submit"
        className="popup__button-submit"
        onClick={handleSubmitForm}
      >
        Guardar
      </button>
    </form>
  );
};

export default NewCard;
