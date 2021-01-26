import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopupOpen from './DeleteCardPopupOpen.js';
import PopupWithImage from './PopupWithImage.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrenUserContext.js';
import { CardContext } from '../contexts/CardContext.js';
import '../index.css';

function App () {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(''); // вот здесь не совсем понятно, по идее начальный стейт должен быть объектом, но если я ставлю объект пустой, то открывается попап без всего, если не задавать стейт, то будет ошибка(

  const [cardToDelete, setCardToDelete] = React.useState({})// стейт для удаления карточки из попапа с подтверждением удаления

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id); //
    
    api.likesChanges(card._id, !isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        });
  } 

  function handleCardDelete(card) {
      const isOwner = card.owner._id === currentUser._id; //
      
      api.deleteCard(card._id, isOwner)
          .then((deletedCard) => {
            setCards(cards.filter(c => c._id !== card._id, console.log(deletedCard))) /* вывожу сообщение в консоль */
          });
  } 

  React.useEffect(()=> { //
    api.getUser()
    .then((profile)=>{
      setCurrentUser(profile)
    }).catch((err)=>{
      console.log(err)
    })
  }, [])

  React.useEffect(()=> { //
    api.getCards()
    .then((cards)=>{
      setCards(cards)
    }).catch((err)=>{
      console.log(err)
    })
  }, [])

  const handleEditAvatarClick = () => { 
    setIsEditAvatarPopupOpen(true) //
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true) //
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true) //
  }

  const handleDeletePlaceClick = (card) => {
    setCardToDelete(card)
    setIsDeleteCardPopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleUpdateUser = (data) => {
    api.editProfile(data)
    .then((data)=>{
      setCurrentUser(data)
      closeAllPopups()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handeUpdateAvatar = (data) => {
    api.changeUserPic(data)
    .then((data)=>{
      setCurrentUser(data)
      closeAllPopups()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleAddPlaceSubmit = (data) => {
    api.addCard(data)
    .then((newCard)=>{
      setCards([newCard, ...cards])
      closeAllPopups()
    }).catch((err)=>{
      console.log(err)
    })
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false) //
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setSelectedCard(false)
  }

  return (
      <>
        <CurrentUserContext.Provider value={ currentUser }>
          <CardContext.Provider value={ cards }>

            <Header />
            <Main 
              onEditProfile={ handleEditProfileClick } 
              onAddPlace={ handleAddPlaceClick }
              onEditAvatar={ handleEditAvatarClick }

              onCardClick={ handleCardClick }
              handleCardLike={ handleCardLike }
              handleCardDelete={ handleDeletePlaceClick } 
              cards = { cards }
            /> 
            <Footer />
            <EditProfilePopup isOpened = { isEditProfilePopupOpen } onClose = { closeAllPopups }  onUpdateUser ={ handleUpdateUser }/>
            <AddPlacePopup isOpened = { isAddPlacePopupOpen } onClose = { closeAllPopups } onAddCard = { handleAddPlaceSubmit }/>
            <EditAvatarPopup isOpened = { isEditAvatarPopupOpen } onClose = { closeAllPopups } onUpdateAvatar={ handeUpdateAvatar }/>
            <DeleteCardPopupOpen isOpened = { isDeleteCardPopupOpen } onClose = { closeAllPopups } handleCardDelete={ handleCardDelete } cardToDelete={ cardToDelete }/>
            <PopupWithImage namePopup="popup popup-pic" card={selectedCard} onClose = { closeAllPopups } />
            
          </CardContext.Provider>
        </CurrentUserContext.Provider>
      </>
    );
}
  

export default App;

