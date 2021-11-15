const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserHousing = document.querySelector('.ad-form__upload input[type=file]');
const previewHousing = document.querySelector('.ad-form__photo');

const appendPhoto = (fileChooser, preview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (fileChooser === fileChooserHousing) {
    preview.innerHTML = '';
    const imgHousing = document.createElement('img');
    imgHousing.style.width = '70px';
    imgHousing.style.height = '70px';
    preview.append(imgHousing);
    preview = document.querySelector('.ad-form__photo img');
  }
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

fileChooserAvatar.addEventListener('change', () => {
  appendPhoto(fileChooserAvatar, previewAvatar);
});

fileChooserHousing.addEventListener('change', () => {
  appendPhoto(fileChooserHousing, previewHousing);
});


