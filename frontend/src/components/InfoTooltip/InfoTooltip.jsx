import closeIcon from "../../images/closeIcon.svg";

export const InfoTooltip = ({ img, text, handleClose }) => {
  return (
    <div className="info_tooltip_popup" onClick={handleClose}>
      <div className="info_tooltip_background"></div>
      <div className="info_tooltip">
        <button onClick={handleClose} className="info_tooltip_close">
          <img src={closeIcon} alt="Cerrar ventana" />
        </button>
        <div className="info_tooltip_content">
          <img src={img} alt={text} className="info_tooltip_icon" />
          <p className="info_tooltip_text">{text}</p>
        </div>
      </div>
    </div>
  );
};
