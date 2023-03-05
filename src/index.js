import './css/styles.css';
import {fetchImages} from './fetch';
const submitSearch= document.getElementById('search-form')
const listDivEl= document.querySelector('div')
const fetchImages = new fetchImages();

let query = ''
let page = 1
let perPage = 40

submitSearch.addEventListener('submit', onSearchForm)

function onSearchForm(e) {
    e.preventDefault();  
    query = e.currentTarget.searchQuery.value.trim()

   // console.log(query);

    //    alert('yes');

        fetchImages(query, page, perPage) 
        .then(({data}) => {
            alert('yes');
            if (data.totalHits === 0) {
                alert('нет информации');
            }


      


        }) 
        .catch(error => {
          console.log('error catch', error.message)
          if (error.message == 404){
            Notify.failure("Oops, there is no country with that name")
            listDivEl.innerHTML = '';
          };
        })
}


function renderSearchCard(searchCard) {
    console.log('searchCard')
}

/* 

// import './css/styles.css';
//import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import fetchSearch from './fetch.js';

// читаю форму
const submitSearch= document.querySelector('#search-form')
const listDivEl= document.querySelector('div')

let query ='';
let input ='';
submitSearch.addEventListener('submit', onSearchForm)

function onSearchForm(e) {
    query = e.currentTarget.searchQuery.value.trim();
    console.log(query)
}
 */

// evt => {
//input = evt.target.value.trim(" ");



/* fetchSearch(input) 
.then(renderSearchCard) 
.catch(error => {
  console.log('eror catch', error.message)
  if (error.message == 404){
    Notify.failure("Oops, there is no country with that name")
    refs.listDivEl.innerHTML = '';
  };
}) */




/* 
// function renderCountryCard(countryCard) {
function renderSearchCard(searchCard) {
  let markup = '';
  
  console.log(searchCard)
  if (searchCard.length > 10) {
    refs.listDivEl.innerHTML = '';
    Notify.success("Too many matches found. Please enter a more specific name.")
    return
  }
  else if (searchCard.length > 1) {
     markup = markupCountries(searchCard);
     refs.listEl.innerHTML = markup;
     refs.listDivEl.innerHTML = '';
  } 
  else if (searchCard.length === 1) {
     markup = markupCountry(searchCard);
     refs.listDivEl.innerHTML = markup;
  }
}
// форма вывода карточки
 function markupCountry(item) {
  return item.map(item =>
    `<h1><li class="header"><img src="${item.flag}" alt="flag" width="80" height ="60">
  <p>  ${item.name}</p></h1><p> Capital: ${item.capital}</p><p> Population: ${item.population}</p><p> Languages: ${item.languages.map(lang => lang.name)}</p></li>`).join("");
} 
// форма вывода списка
  function markupCountries(items) {
  return items.map(item => `<li><img src="${item.flag}" alt="flag" width="40" height ="30">
          <p>  ${item.name}</p></li>`).join("");
}  */