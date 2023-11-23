const searchButton = document.querySelector('.search-panel button');
const resultsCointainer = document.querySelector('.resultsContainer');

function fetchLocationName() {
  const locationName = 'https://api.content.tripadvisor.com/api/v1/location/search?key=5859D966AFCD4FBB9F8883B3C5C5951C&language=en'

  const inputField = document.querySelector('.search-panel input');
}
function fetchLocationData() {
  const locationAPI = 'https://api.content.tripadvisor.com/api/v1/location/60713/details?key=5859D966AFCD4FBB9F8883B3C5C5951C&language=en&currency=USD'

  fetch(locationAPI)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      renderLocation(data);
    })
    .catch((error) => {
      console.error('Error fetching data: ', error);
    });
}

function renderLocation(data) {
  resultsCointainer.innerHTML = '';

  const {name, description, web_url, address_obj} = data;

  //Create the DOM element
  const locationName = document.createElement('h3');
  locationName.textContent = name;

  const locationDescription = document.createElement('p');
  locationDescription.textContent = description;

  const locationLink = document.createElement('a');
  locationLink.href = web_url;
  locationLink.textContent = 'Read more on TripAdvisor';
  locationLink.target = '_blank';

  resultsCointainer.appendChild(locationName);
  resultsCointainer.appendChild(locationDescription);
  resultsCointainer.appendChild(locationLink);
}

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  fetchLocationData();
})
