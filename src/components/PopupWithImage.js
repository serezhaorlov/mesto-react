import React from 'react';

function PopupWithImage ({ namePopup, card, onClose }){

    const closeAllPopupsOverlay = (evt) => {
        if (evt.target === evt.currentTarget){
          onClose()
        }
      }

        return (
            <section className={card ? `${namePopup} popup_is-opened` : namePopup} onClick={closeAllPopupsOverlay}> 
                <div className="popup-pic__content-container">
                    <button id="button-close" type="button" className="popup-pic__close-button-pic" onClick={onClose}/>
                    <img src={card.link} alt={card.name} className="popup-pic__image"/>
                    <p className="popup-pic__text">{card.name}</p>
                </div>
            </section>
        )
}


export default PopupWithImage;