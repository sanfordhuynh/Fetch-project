const searchButton = document.querySelector('.search-panel button');
const resultsContainer = document.querySelector('.resultsContainer');

function fetchLocationName() {
  const inputField = document.querySelector('.search-panel input');
  const query = inputField.value.trim();

  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  document.querySelector('.container.homepage').style.display = 'none';

  resultsContainer.style.display = 'block';

  const searchAPI = `https://api.content.tripadvisor.com/api/v1/location/search?key=5859D966AFCD4FBB9F8883B3C5C5951C&searchQuery=${encodeURIComponent(query)}&language=en`;

  fetch(searchAPI)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const locationID = data.data[0].location_id;
      console.log("The locationID is:", locationID);
      if (locationID) {
        fetchLocationData(locationID);
      } else {
        console.error('No location found for the search query.');
      }
    })
    .catch(error => {
      console.error('Error fetching location ID: ', error);
    });
}

// Function to fetch location details using the location ID
function fetchLocationData(locationID) {
  const locationDetailsAPI = `https://api.content.tripadvisor.com/api/v1/location/${locationID}/details?key=5859D966AFCD4FBB9F8883B3C5C5951C&language=en&currency=USD`;
  const locationPhotosAPI = `https://api.content.tripadvisor.com/api/v1/location/${locationID}/photos?key=5859D966AFCD4FBB9F8883B3C5C5951C&language=en`;

  Promise.all([
    fetch(locationDetailsAPI).then(response => response.json()),
    fetch(locationPhotosAPI).then(response => response.json())
  ])
  .then(([detailsData, photosData]) => {
    renderLocation(detailsData);
    if (photosData.data) {
      renderPhotos(photosData.data);
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}


function renderLocation(data) {
  resultsContainer.innerHTML = '';

  const {name, description, web_url} = data;

  const locationName = document.createElement('h3');
  locationName.textContent = name;

  const locationDescription = document.createElement('p');
  locationDescription.textContent = description;

  const locationLink = document.createElement('a');
  locationLink.href = web_url;
  locationLink.textContent = 'Read more on TripAdvisor';
  locationLink.target = '_blank';

  resultsContainer.appendChild(locationName);
  resultsContainer.appendChild(locationDescription);
  resultsContainer.appendChild(locationLink);
}

function renderPhotos(photoDataArray) {
  let photosContainer = resultsContainer.querySelector('.photos-container');
  if (!photosContainer) {
    photosContainer = document.createElement('div');
    photosContainer.className = 'photos-container';
    resultsContainer.insertBefore(photosContainer, resultsContainer.firstChild);
  }

  photosContainer.innerHTML = '';

  // Use slice to get the first two photos from the array
  const firstTwoPhotos = photoDataArray.slice(0, 2);

  firstTwoPhotos.forEach(photoData => {
    const img = document.createElement('img');
    img.src = photoData.images.large.url;
    img.alt = photoData.caption || 'Location Photo';
    img.className = 'location-photo';
    photosContainer.appendChild(img);
  });
}

document.querySelector('.search-panel button').addEventListener('click', (event) => {
  event.preventDefault();
  fetchLocationName();
});

document.querySelector('.fa-magnifying-glass').addEventListener('click', (event) => {
  event.preventDefault();
  fetchLocationName();
});


document.addEventListener('DOMContentLoaded', () => {
  function updateActiveCategory(clickedLinkId, titleText) {
    // Update the page title
    document.getElementById('page-title').textContent = titleText;

    document.querySelectorAll('.category-link').forEach(link => {
      link.classList.remove('active');
    });

    document.getElementById(clickedLinkId).classList.add('active');
  }

  document.getElementById('destination-link').addEventListener('click', (e) => {
    e.preventDefault();
    updateActiveCategory('destination-link', 'Travel Destination? 👀');
  });

  document.getElementById('hotels-link').addEventListener('click', (e) => {
    e.preventDefault();
    updateActiveCategory('hotels-link', 'A place to rest💤');
  });

  document.getElementById('attractions-link').addEventListener('click', (e) => {
    e.preventDefault();
    updateActiveCategory('attractions-link', 'Find an attraction!');
  });

  document.getElementById('restaurants-link').addEventListener('click', (e) => {
    e.preventDefault();
    updateActiveCategory('restaurants-link', 'Places to eat!');
  });
});
