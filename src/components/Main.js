import React from 'react';
import Card from './Card.js';
import { api } from '../utils/api.js';


function Main ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

    const [userName, setUserName] = React.useState(''); //main
    const [userDescription , setuserDescription] = React.useState(''); //main
    const [userAvatar, setUserAvatar] = React.useState(''); //main
  
  
    const [cards, setCards] = React.useState([]); //main
  
    React.useEffect(()=> { //main
      api.getUser()
      .then((profile)=>{
        setUserName(profile.name)
        setuserDescription(profile.about)
        setUserAvatar(profile.avatar)
      }).catch((err)=>{
        console.log(err)
      })
    }, [])
  
    React.useEffect(()=> { //main
      api.getCards()
      .then((cards)=>{
        setCards(cards)
      }).catch((err)=>{
        console.log(err)
      })
    }, [])

    return (
        <main className="main">
            <section className="profile">
            <img src={userAvatar} alt="аватар" className="profile__avatar"/>
            <button type="button" className="profile__pic-edit" onClick={onEditAvatar}/>
            <div className="profile__info">
                <h1 className="profile__name">{userName}</h1>
                <p className="profile__sub-info">{userDescription}</p>
                <button type="button" className="profile__edit-button" onClick={onEditProfile}/>
            </div>
            <button type="button" className="profile__add-button" onClick={onAddPlace}/>
            </section>
            <ul className="elements">
                {cards.map((card) => (<Card key={card._id} card={card} onCardClick={onCardClick}/>))}
            </ul>
        </main>
    )
}
        

export default Main;


