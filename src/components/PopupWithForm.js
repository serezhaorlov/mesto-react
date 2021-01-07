import React from 'react';

function PopupWithForm({isOpened, namePopup, onCloseOverlay, nameForm, heading, title, children, buttonStyle, button, buttonLoad, onClose}) {
  return (
    <section className={isOpened ? `${namePopup} popup_is-opened` : namePopup} onClick={onCloseOverlay}> 
      <form id="form" className={nameForm} name="form" noValidate>
        <h2 className={`form__heading ${heading}`}>{title}</h2>
        {children}
        <button type="submit" id="submit-button" value="Сохранить" className={`form__button ${buttonStyle}`}>{button}</button>
        <button type="submit" id="submit-button-active" value="Сохранить" className="form__button form__button_loading">{buttonLoad}</button>
        <button id="button-close" type="button" className="form__close-button" onClick={onClose} />
      </form>
    </section>
  )
} 

export default PopupWithForm;