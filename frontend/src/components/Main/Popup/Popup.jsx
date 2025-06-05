import closeButton from "../../../images/closeIcon.svg";

const Popup = (props) => {
  const { onClose, title, children } = props;

  return (
    <div className="popup">
      <div className="popup__background"></div>
      <div className={`popup__content ${!title ? "popup__image" : ""}`}>
        <button className="popup__close">
          <img
            id="image-closeIcon"
            src={closeButton}
            alt="boton de cerrar"
            className="popup__button-close"
            onClick={onClose}
          />
        </button>
        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Popup;
