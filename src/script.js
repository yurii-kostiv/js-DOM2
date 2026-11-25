const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMore');
const clearGalleryBtn = document.getElementById('clearGallery');
const removeLastBtn = document.getElementById('removeLast');
const reverseGalleryBtn = document.getElementById('reverseGallery');
const shuffleGalleryBtn = document.getElementById('shuffleGallery');

let images = [];
let page = 1;

function renderGallery() {
  gallery.innerHTML = '';

  images.forEach(function (image) {
    const img = document.createElement('img');
    img.src = 'https://picsum.photos/id/' + image.id + '/300/200';
    img.alt = 'Фото від ' + image.author;
    gallery.appendChild(img);
  });
}

function loadImages(pageNumber, addToExisting) {
  fetch('https://picsum.photos/v2/list?page=' + pageNumber + '&limit=4')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (addToExisting) {
        data.forEach(function (image) {
          images.push(image);
        });
      } else {
        images = data;
      }
      renderGallery();
    });
}

loadImages(page, false);

loadMoreBtn.addEventListener('click', function () {
  page++;
  loadImages(page, true);
});

clearGalleryBtn.addEventListener('click', function () {
  images = [];
  renderGallery();
});

removeLastBtn.addEventListener('click', function () {
  images.pop();
  renderGallery();
});

reverseGalleryBtn.addEventListener('click', function () {
  images.reverse();
  renderGallery();
});

shuffleGalleryBtn.addEventListener('click', function () {
  images.sort(function () {
    return Math.random() - 0.5;
  });
  renderGallery();
});