import './css/styles.css';
import {fetchImages} from './fetch';
import {createGallery} from './render-gallery';
import SimpleLightbox from "simplelightbox";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "simplelightbox/dist/simple-lightbox.min.css";
const submitSearch= document.getElementById('search-form')
const listDivEl= document.querySelector('.gallery-cards')
const listEnd= document.querySelector('.end-gallery')
const simplelightbox = new SimpleLightbox('.gallery-cards a', { 
  captions: true,
  captionsData: 'alt',
  captionDelay: 300,
});

let query = ''
let page = 1
let perPage = 40
window.preventAction = true;
let newSearch = true;
let errorFlagUrl = false;

listEnd.classList.add('hidden');


submitSearch.addEventListener('submit', startSearch)

// отлавливаю конец страницы при скроле
function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      console.log('eND')
      page += 1
      onSearchForm()
    }
  });
}
let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.end-gallery');
for (let elm of elements) {
  observer.observe(elm);
}

// запуск поиска и сброс параметров
function startSearch(e) {
query = ''
page = 1
window.preventAction = true; 
listDivEl.innerHTML = '';
listEnd.classList.add('hidden');
onSearchForm(e)
}

// поиск
function onSearchForm(e) {
  console.log('page', page)
  console.log('window', window.preventAction)
  console.log('errorFlagUrl', errorFlagUrl)
  if(errorFlagUrl) return


  if (window.preventAction) {
    e.preventDefault();
    query = e.currentTarget.searchQuery.value.trim()
    window.preventAction = false;
  }

    fetchImages(query, page, perPage) 
        .then(({data}) => {
          alertTotalHits(data);
            if (data.totalHits !== 0) {
            
            console.log({data})

        listDivEl.insertAdjacentHTML('beforeEnd', createGallery(data));
        simplelightbox.refresh();
        listEnd.classList.remove('hidden'); // скрываю элемент конца страницы
          }
        }) 

        .catch(error => {
          alertTotalHits(data);
          errorFlagUrl = true;
          console.log('ошибка catch----', error.response.status);
        })
}

function alertTotalHits(data) {
  console.log('match', Math.ceil(data.totalHits/perPage+1), 'page', page)

  if (page === Math.ceil(data.totalHits/perPage+1)) {
  Notify.warning("We're sorry, but you've reached the end of search results.")
  }  

  if (data.totalHits === 0) {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  } 

  if (page === 1) {
  Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }

}

