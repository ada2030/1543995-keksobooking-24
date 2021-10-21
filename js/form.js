const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomsSelect = document.querySelector('#room_number');
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

if (roomsSelect.value === '1') {
  allGuests.value = 1;
} else if (roomsSelect.value === '2') {
  allGuests.value = 2;
} else if (roomsSelect.value === '3') {
  allGuests.value = 3;
} else if (roomsSelect.value === '100') {
  allGuests.value = 0;
}

guests.forEach((guest) => {
  guest.classList.add('hidden');
});

allRooms.forEach((rooms) => {
  rooms.addEventListener('change', () => {
    if (rooms.value === '1') {
      allGuests.value = 1;
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
      allGuests.value = 2;
      guests.forEach((guest) => {
        guest.classList.remove('hidden');
        if (guest.value > rooms.value) {
          guest.classList.add('hidden');
        } else if (guest.value === '0') {
          guest.classList.add('hidden');
        }
      });
    } else if (rooms.value === '3') {
      allGuests.value = 3;
      guests.forEach((guest) => {
        guest.classList.remove('hidden');
        if (guest.value > rooms.value) {
          guest.classList.add('hidden');
        } else if (guest.value === '0') {
          guest.classList.add('hidden');
        }
      });
    } else if (rooms.value === '100') {
      allGuests.value = 0;
      guests.forEach((guest) => {
        guest.classList.add('hidden');
        if (guest.value === '0') {
          guest.classList.remove('hidden');
        }
      });
    }
  });
});
// мне кажется я сильно усложнил себе задачу:), но как говорится все работает))
