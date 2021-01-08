import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';

import '../index.css';

function App () {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(false); //app

  const handleEditAvatarClick = () => { 
    setIsEditAvatarPopupOpen(true) //
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true) //
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true) //
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }
  
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false) //
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(false)
  }
  
  return (
        <>
          <Header />
          <Main 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}

            onCardClick={handleCardClick}
          />
          <Footer />
          <PopupWithForm namePopup="popup" nameForm="form" title="Редактировать профиль" button="Сохранить" buttonLoad="Сохранение..." isOpened = {isEditProfilePopupOpen} onClose = {closeAllPopups} >
              <>
                <input type="text" required minLength={2} maxLength={40} id="name" name="name" placeholder="Имя" className="form__name form__name_top" />
                <span id="name-error" className="form__error" />
                <input type="text" required minLength={2} maxLength={200} id="about" name="about" placeholder="О себе" className="form__name form__name_bottom" />
                <span id="about-error" className="form__error" />
              </>
          </PopupWithForm>
          <PopupWithForm namePopup="popup popup-add" nameForm="form form-add" title="Новое место" button="Сохранить" buttonLoad="Сохранение..." isOpened = {isAddPlacePopupOpen} onClose = {closeAllPopups} >
              <>
                <input type="text" required minLength={2} maxLength={30} id="nameadd" name="name" placeholder="Название" className="form__name form__name_top_add-name" />
                <span id="nameadd-error" className="form__error" />
                <input type="url" required minLength={8} id="url" name="url" placeholder="Ссылка на картинку" className="form__name form__name_bottom_add-place" />
                <span id="url-error" className="form__error" />
              </>
          </PopupWithForm>
          <PopupWithForm namePopup="popup popup-profile" nameForm="form form-profile" title="Обновить аватар" button="Сохранить" buttonLoad="Сохранение..." heading="form__heading_profile" isOpened = {isEditAvatarPopupOpen} onClose = {closeAllPopups} >
              <>
                <input type="url" required minLength={8} id="url" name="avatar" placeholder="Введите ссылку" className="form__name form__name_profile" />
                <span id="url-error" className="form__error" />
              </>
          </PopupWithForm>
          <PopupWithForm namePopup="popup popup-delete" nameForm="form form-delete" title="Вы уверены?" heading="form__heading_delete-form"
          button="Да" buttonLoad="..." buttonStyle="form__button_delete-form" onClose = {closeAllPopups} />
          <PopupWithImage namePopup="popup popup-pic" card={selectedCard} onClose = {closeAllPopups} />
        </>
    );
  }
  

export default App;
