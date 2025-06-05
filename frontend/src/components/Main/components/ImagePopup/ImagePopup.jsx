const ImagePopup = (props) => {
  const { name, link } = props;

  return (
    <form name="open" className="popup__form" noValidate>
      <button className="popup__close">
        <img
          id="image-closeIcon"
          src=""
          alt=""
          className="popup__button-close"
        />
      </button>
      <img src={link} alt="" className="popup__image" />
      <p className="popup__text">{name}</p>
    </form>
  );
};

export default ImagePopup;
