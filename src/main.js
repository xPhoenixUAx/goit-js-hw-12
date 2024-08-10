import { getPicturesByQuery } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more-button');

let query = '';
let page = 1;
const perPage = 15;

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  query = document.getElementById('search-input').value.trim();
  page = 1;

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query' });
    return;
  }

  clearGallery();
  showLoader();
  loadMoreBtn.style.display = 'none';

  try {
    const data = await getPicturesByQuery(query, page, perPage);
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderImages(data.hits);
      if (data.totalHits > perPage) {
        loadMoreBtn.style.display = 'block';
      }
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images' });
  } finally {
    hideLoader();
    searchForm.reset();
  }
});

loadMoreBtn.addEventListener('click', async function () {
  page += 1;
  showLoader();
  loadMoreBtn.style.display = 'none';

  try {
    const data = await getPicturesByQuery(query, page, perPage);
    renderImages(data.hits);
    scrollPage();
    if (page * perPage < data.totalHits) {
      loadMoreBtn.style.display = 'block';
    } else {
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images' });
  } finally {
    hideLoader();
  }
});

function scrollPage() {
  const gallery = document.getElementById('gallery');
  const firstCard = gallery.querySelector('a');
  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
