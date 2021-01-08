import React from 'react';


function Card ({card, onCardClick}) {

    return (
        <li className="elements__item">
            <img src={card.link} alt={card.name} className="elements__pic" onClick={() => onCardClick(card)}/>
            <button type="button" className="elements__delete-button" />
            <div className="elements__container">
                <h2 className="elements__place-name">{card.name}</h2>
                <div className="elements__like-container">
                    <button type="button" className="elements__like-button" />
                    <p className="elements__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}


export default Card;