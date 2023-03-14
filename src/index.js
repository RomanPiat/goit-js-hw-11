import './css/styles.css';
import {fetchImages} from './fetch';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const submitSearch= document.getElementById('search-form')
const listDivEl= document.querySelector('.gallery-cards')
const simplelightbox = new SimpleLightbox('.gallery-cards a', { 
  captions: true,
  captionsData: 'alt',
  captionDelay: 300,
});

let query = ''
let page = 1
let perPage = 40

submitSearch.addEventListener('submit', onSearchForm)

function onSearchForm(e) {
    e.preventDefault();  
    listDivEl.innerHTML =''
    query = e.currentTarget.searchQuery.value.trim()

   // console.log(query);

    //    alert('yes');

        fetchImages(query, page, perPage) 
        .then(({data}) => {

            if (data.totalHits === 0) {
                alert('нет информации');
            }
            console.log({data})







// вывод галереи SimpleLightbox
function createGallery({hits}) {
console.log({hits})

const markup = hits.map(({ largeImageURL, webformatURL, tags, likes, views,comments, downloads } ) => `<div class="photo-card">
<a class="gallery-item" href="${largeImageURL}"><img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
<div class="info">
<p class="info-item">
    <b>Likes: </b></br>${likes}
</p>
<p class="info-item">
    <b>Views: </b></br>${views}
</p>
<p class="info-item">
    <b>Comments: </b></br>${comments}
</p>
<p class="info-item">
    <b>Downloads: </b></br>${downloads}
</p>
</div></div>`);

return markup.join('')
}





console.log('data ----',{data})

// const addCreateGallery = createGallery(data);

listDivEl.insertAdjacentHTML('beforeEnd', createGallery(data));
simplelightbox.refresh();




/* new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 300,
});
 */



      


        }) 
        .catch(error => {
          console.log('error catch', error.message)
          if (error.message == 404){
            Notify.failure("Oops, there is no country with that name")
            listDivEl.innerHTML = '';
          };
        })
}




