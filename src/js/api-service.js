// import axios from "axios"

// export default class PicturesApiService {
//   constructor() {
//     this.searchQuery = ''
//     this.page = 1
//   }

//   async getImages() {
//     console.log(this);

//     const BASE_URL = `https://pixabay.com/api/?key=24494444-2fcf9d7148d7c7c0b9406343f&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=20&page=${this.page}`

//     const response = await axios.get(BASE_URL)
//     this.page += 1
//     return response.data

//   }

//   resetPage() {
//     this.page = 1
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery
//   }
// }


import axios from 'axios';

export async function getImages(name, page, per_page) {
  const searchParams = {
    params: {
      key: '24494444-2fcf9d7148d7c7c0b9406343f',
      q: `${name}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page,
    },
  };

  const response = await axios.get('https://pixabay.com/api/', searchParams);
  return response.data;
}