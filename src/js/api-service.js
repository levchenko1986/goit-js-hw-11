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
