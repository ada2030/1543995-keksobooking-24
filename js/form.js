const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const allRooms = document.querySelectorAll('#room_number');
const allGuests = document.querySelector('#capacity');
const guests = allGuests.querySelectorAll('option');


titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_NAME_LENGTH } симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  const priceValue = priceInput.value;

  if (priceValue > MAX_PRICE) {
    priceInput.setCustomValidity(`Цена за ночь не может быть выше ${  MAX_PRICE } рублей`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

allRooms.forEach((rooms) => {
  rooms.addEventListener('blur', () => {
    if (rooms.value === '1') {
      guests.forEach((guest) => {
        if (guest.value > rooms.value) {
          guest.classList.add('hidden');
        } else if (guest.value === '0') {
          guest.classList.add('hidden');
        } else {
          guest.classList.remove('hidden');
        }
      });
    } else if (rooms.value === '2') {
      guests.forEach((guest) => {
        guest.classList.remove('hidden');
        if (guest.value > rooms.value) {
          guest.classList.add('hidden');
        } else if (guest.value === '0') {
          guest.classList.add('hidden');
        }
      });
    } else if (rooms.value === '3') {
      guests.forEach((guest) => {
        guest.classList.remove('hidden');
        if (guest.value > rooms.value) {
          guest.classList.add('hidden');
        } else if (guest.value === '0') {
          guest.classList.add('hidden');
        }
      });
    } else if (rooms.value === '100') {
      guests.forEach((guest) => {
        guest.classList.add('hidden');
        if (guest.value === '0') {
          guest.classList.remove('hidden');
        }
      });
    }
  });
});
