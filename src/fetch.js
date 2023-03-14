import axios from 'axios';


const API_KEY= '33909260-89de06c1dbdf0a64f541db612';
axios.defaults.baseURL = 'https://pixabay.com/api/';

 export async function fetchImages(query, page, perPage) {
try {
    const response = await axios.get(`?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);

        return response;
} catch (error) {
    console.log('ошибка catch', error);
}
    }


