const DeleteCard = (props) => {
  const { handleDeleteCard, card } = props;
  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    handleDeleteCard(card);
  };

  return (
    <form name="add" className="popup__form" noValidate>
      <button
        id="add-submit"
        type="submit"
        className="popup__button-submit"
        onClick={handleSubmitForm}
      >
        Si
      </button>
    </form>
  );
};

export default DeleteCard;
