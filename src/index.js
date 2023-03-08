import './css/styles.css';
import {fetchImages} from './fetch';
const submitSearch= document.getElementById('search-form')
const listDivEl= document.querySelector('div')


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

            if (data.totalHits === 0) {
                alert('нет информации');
            }
            console.log(data)



      


        }) 
        .catch(error => {
          console.log('error catch', error.message)
          if (error.message == 404){
            Notify.failure("Oops, there is no country with that name")
            listDivEl.innerHTML = '';
          };
        })
}
