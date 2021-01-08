import React from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import { api } from './utils/api.js';

import './index.css';

function App () {
  const [isEditAvatarPopupOpen, setStateAvatar] = React.useState(false);  
  const [isEditProfilePopupOpen, setStateProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setStateAddPlace] = React.useState(false);

  const [userName, setUserName] = React.useState([]);
  const [userDescription , setuserDescription] = React.useState([]);
  const [userAvatar, setUserAvatar] = React.useState([]);  

  const [selectedCard, setSelectedCard] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  React.useEffect(()=> {
    api.getUser()
    .then((profile)=>{
      setUserName(profile.name)
      setuserDescription(profile.about)
      setUserAvatar(profile.avatar)
    })
  }, [])

  React.useEffect(()=> {
    api.getCards()
    .then((cards)=>{
      setCards(cards)
    })
  }, [])

  const handleEditAvatarClick = () => { 
    setStateAvatar(true)
  }

  const handleEditProfileClick = () => {
    setStateProfile(true)
  }

  const handleAddPlaceClick = () => {
    setStateAddPlace(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }
  
  const closeAllPopups = () => {
    setStateAvatar(false)
    setStateProfile(false)
    setStateAddPlace(false)
    setSelectedCard(false)
  }
  
  const closeAllPopupsOverlay = (evt) => {
    if (evt.target === evt.currentTarget){
      setStateAvatar(false)
      setStateProfile(false)
      setStateAddPlace(false)
      setSelectedCard(false)
    }
  }

  return (
        <>
          <Header />
          <Main 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}

            userName = {userName}
            userDescription = {userDescription}
            userAvatar = {userAvatar}

            cards={cards}
            onCardClick={handleCardClick}
          />
          <Footer />
          <PopupWithForm namePopup="popup" nameForm="form" title="Редактировать профиль" button="Сохранить" buttonLoad="Сохранение..." isOpened = {isEditProfilePopupOpen} onClose = {closeAllPopups} onCloseOverlay = {closeAllPopupsOverlay}>
              <>
                <input type="text" required minLength={2} maxLength={40} id="name" name="name" placeholder="Имя" className="form__name form__name_top" />
                <span id="name-error" className="form__error" />
                <input type="text" required minLength={2} maxLength={200} id="about" name="about" placeholder="О себе" className="form__name form__name_bottom" />
                <span id="about-error" className="form__error" />
              </>
          </PopupWithForm>
          <PopupWithForm namePopup="popup popup-add" nameForm="form form-add" title="Новое место" button="Сохранить" buttonLoad="Сохранение..." isOpened = {isAddPlacePopupOpen} onClose = {closeAllPopups} onCloseOverlay = {closeAllPopupsOverlay}>
              <>
                <input type="text" required minLength={2} maxLength={30} id="nameadd" name="name" placeholder="Название" className="form__name form__name_top_add-name" />
                <span id="nameadd-error" className="form__error" />
                <input type="url" required minLength={8} id="url" name="url" placeholder="Ссылка на картинку" className="form__name form__name_bottom_add-place" />
                <span id="url-error" className="form__error" />
              </> 
          </PopupWithForm>
          <PopupWithForm namePopup="popup popup-profile" nameForm="form form-profile" title="Обновить аватар" button="Сохранить" buttonLoad="Сохранение..." heading="form__heading_profile" isOpened = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onCloseOverlay = {closeAllPopupsOverlay}>
              <>
                <input type="url" required minLength={8} id="url" name="avatar" placeholder="Введите ссылку" className="form__name form__name_profile" />
                <span id="url-error" className="form__error" />
              </>
          </PopupWithForm>
          <PopupWithForm namePopup="popup popup-delete" nameForm="form form-delete" title="Вы уверены?" heading="form__heading_delete-form"
          button="Да" buttonLoad="..." buttonStyle="form__button_delete-form" onClose = {closeAllPopups} 
          />
          <PopupWithImage namePopup="popup popup-pic" card={selectedCard} onClose = {closeAllPopups} onCloseOverlay = {closeAllPopupsOverlay}/>
        </>
    );

  }
  

export default App;
