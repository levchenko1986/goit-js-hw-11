import './sass/main.scss';
import { getImages }from './js/api-service';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const formElem = document.querySelector('#search-form');
const galleryElem = document.querySelector('.gallery');
const btnElem = document.querySelector('.load-more');

function markImage(images) {
  const mark = images
    .map(image => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
      return `<a class="gallery-item" href="${largeImageURL}">
    <div class="photo-card">
      <div class="container-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </div>  
      <div class="info">
        <p class="info-item">
          <b>Likes </b>${likes}
        </p>
        <p class="info-item">
          <b>Views </b>${views}
        </p>
        <p class="info-item">
          <b>Comments </b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads </b>${downloads}
        </p>
      </div>
    </div>
  </a>`;
    })
    .join('');
  galleryElem.insertAdjacentHTML('beforeend', mark);
}

btnElem.classList.add('hidden');
let page = 1;
const per_page = 40;
let inputName = '';
let gallery = {};
formElem.addEventListener('submit', onFormSubmit);
btnElem.addEventListener('click', onBtnclick);

async function onFormSubmit(e) {
  e.preventDefault();
  galleryElem.innerHTML = '';
  page = 1;
  btnElem.classList.add('hidden');
  inputName = e.target.searchQuery.value;

  if (inputName.trim() === '') {
    return;
  }
  try {
    const data = await getImages(inputName.trim(), page, per_page);
    console.log(getImages());
    if (data.hits.length === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.", {
        timeout: 5000,
      });
    } else {
      Notify.success(`Hooray! We found ${data.totalHits} images`, { timeout: 2000 });
      markImage(data.hits);
      gallery = new SimpleLightbox('.gallery a', {  });
      page * per_page <= data.totalHits && btnElem.classList.remove('hidden');

      page += 1;
    }
  } catch (error) {
    console.log(error.message);
  }
}
async function onBtnclick(e) {
  try {
    const data = await getImages(inputName.trim(), page, per_page);
    if (page * per_page >= data.totalHits) {
      btnElem.classList.add('hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
    markImage(data.hits);
    gallery.refresh();
    page += 1;
    const { height } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error.message);
  }
}


