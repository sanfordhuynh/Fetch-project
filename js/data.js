/* exported data */
//  const api =
//    'https://api.content.tripadvisor.com/api/v1/location/search?key=5859D966AFCD4FBB9F8883B3C5C5951C&searchQuery=san%20francisco';

const locationAPI = 'https://api.content.tripadvisor.com/api/v1/location/60713/details?key=5859D966AFCD4FBB9F8883B3C5C5951C&language=en&currency=USD';

fetch(locationAPI)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((response) => console.log('response: ', response))
  .catch((error) => console.log('Error: ', error));


//Search Location result
  /*
address_obj:{state: 'California', country: 'United States', address_string: 'San Francisco, CA'}
location_id:"60713" name: "San Francisco"
  */


//Location Description
/*
{location_id: '60713', name: 'San Francisco', description: 'Every neighborhood in San Francisco has its own pe…el at the Dutch Windmill across from Ocean Beach.', web_url: 'https://www.tripadvisor.com/Tourism-g60713-San_Francisco_California-Vacations.html?m=66827', address_obj: {…}, …}
address_obj
:
{state: 'California', country: 'United States', address_string: 'San Francisc
*/
