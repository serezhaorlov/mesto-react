export const loadingButtonState = (state) =>{ //сделал
  if(state) {
    const openedButton = document.querySelector('.popup_is-opened .form__button')
    openedButton.textContent = 'Сохранение...'
  } else {
    const openedButton = document.querySelector('.popup_is-opened .form__button')
    openedButton.textContent = 'Сохранение';
  }
}

export const apiObj = {
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-18/cards', //вынести в объект и подключить через константы
  headers: {
    'authorization': '265b2265-ae2c-4200-8a02-8c26528e2a21',
    "content-type": "application/json"
  },
  myProfileUrl: 'https://mesto.nomoreparties.co/v1/cohort-18/users/me',
}