// Function to fetch episodes based on user input
function fetchEpisodes() {
  const inputValue = document.getElementById('episode-input').value;

  // Using Fetch to get the API episodes
  fetch(`https://rickandmortyapi.com/api/episode/${inputValue}`)
    .then(resp => resp.json())
    .then(data => {
      if (data.error) {
        displayNotFound();
      } else {
        const limitedResults = [data];

        formatEpisodes(limitedResults);
      }
    });
}

// Function to display "Episode not found" message
function displayNotFound() {
  const episodeDiv = document.getElementById('episodes');
  episodeDiv.innerHTML = '<p><b>Episode not found.</b></p>';
}

// Function to format and display the fetched episodes
function formatEpisodes(episodes) {
  const episodeDiv = document.getElementById('episodes');
  episodeDiv.innerHTML = '';

  episodes.forEach(episode => {
    const episodeName = episode.name;
    const episodeAirDate = episode.air_date;


    episodeDiv.innerHTML += `<div><h2>${episodeName}</h2><p>Air Date: ${episodeAirDate}</p><p>Episode Code: ${episode.episode}</p></div>`;
  });
}
