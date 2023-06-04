let currentPage = 1;
const resultsPerPage = 9;

// Function to fetch locations based on user input
function fetchLocations() {
  const inputValue = document.getElementById('location-input').value;

  // Using Fetch to get the API locations
  fetch(`https://rickandmortyapi.com/api/location/?name=${inputValue}`)
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        displayNotFound();
      } else {
        const totalResults = data.results.length;
        const startIndex = (currentPage - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        const limitedResults = data.results.slice(startIndex, endIndex);

        formatLocations(limitedResults);

        updatePaginationButtons(totalResults);
      }
    });
}

// Function to fetch the next page of locations
function fetchNextPage() {
  currentPage++;
  fetchLocations();
}

// Function to fetch the previous page of locations
function fetchPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchLocations();
  }
}

// Function to update the pagination buttons based on the current page and total results
function updatePaginationButtons(totalResults) {
  const nextPageButton = document.getElementById('next-page-button');
  const previousPageButton = document.getElementById('previous-page-button');

  nextPageButton.disabled = currentPage * resultsPerPage >= totalResults;
  previousPageButton.disabled = currentPage === 1;
}

// Function to display "Location not found" message
function displayNotFound() {
  const locationDiv = document.getElementById('locations');
  locationDiv.innerHTML = '<p><b>Location not found.</b></p>';
}

// Function to format and display the fetched locations
function formatLocations(locations) {
  const locationDiv = document.getElementById('locations');
  locationDiv.innerHTML = '';

  locations.forEach(location => {
    locationDiv.innerHTML += `<div><h2>${location.name}</h2><p>Type: ${location.type}</p><p>Dimension: ${location.dimension}</p></div>`;
  });
}
