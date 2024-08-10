import axios from 'axios';

const API_KEY = '45170299-c4257b7fc983e8ba1f62eed92';

export async function getPicturesByQuery(query, page = 1, perPage = 15) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  });

  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
