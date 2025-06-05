import { useRef } from "react";

const EditAvatar = (props) => {
  const { handleChangeAvatar } = props;

  const inputAvatarRef = useRef(null);

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    handleChangeAvatar(inputAvatarRef?.current.value);
  };

  return (
    <form name="add" className="popup__form" noValidate>
      <input
        type="url"
        required
        className="popup__input popup__input_link-avatar"
        id="linkAvatar"
        name="avatar"
        placeholder="Imagen (URL)"
        ref={inputAvatarRef}
      />
      <span className="popup__input-error link_avatar-error"></span>
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

export default EditAvatar;
