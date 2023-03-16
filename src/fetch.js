import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const API_KEY= '33909260-89de06c1dbdf0a64f541db612';
axios.defaults.baseURL = 'https://pixabay.com/api/';

 export async function fetchImages(query, page, perPage) {
try {
    const response = await axios.get(`?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);

        return response;
} catch (error) {
    console.log('ошибка catch', error.response.status);
   if ( error.response.status = 400) Notify.warning("We're sorry, but you've reached the end of search results.")
}
    }


