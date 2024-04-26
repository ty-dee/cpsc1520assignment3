async function appInit() {
  const res = await fetch('https://66136ea153b0d5d80f676284.mockapi.io/api/v1/albums');
  const payload = await res.json();
  console.log(payload);

  // Get reference to the search results container and favorites tab
  const searchResults = document.getElementById("search-results");
  const favoritesTab = document.getElementById("favorites-tab");
  const favoritesList = document.getElementById("my-albums");

  // Data store for favorite albums
  let favoriteAlbums = [];

  // Function to render favorite albums
  function renderFavoriteAlbums() {
    // Clear previous favorite albums
    favoritesList.innerHTML = "";

    // Render each favorite album using the provided template
    favoriteAlbums.forEach(album => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");

      listItem.innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">${album.albumName}<span class="badge bg-primary rounded-pill">${album.averageRating}</span></div>
          <span>${album.artistName}</span>
        </div>
        <button type="button" class="btn btn-danger remove-from-favorites">Remove from Favorites</button>
      `;

      favoritesList.appendChild(listItem);
    });
  }

  // Function to add an album to favorites
  async function addToFavorites(albumData) {
    // Flag to indicate if the album is a duplicate
    let isDuplicate = false;
  
    // Check if the album is already in favorites
    for (const album of favoriteAlbums) {
      if (album.albumName === albumData.albumName) {
        isDuplicate = true;
      }
    }
  
    if (!isDuplicate) {
      // Add the album to the favorite albums data store
      favoriteAlbums.push(albumData);
  
      // Render the updated list of favorite albums
      renderFavoriteAlbums();
  
      // Send POST request to save favorite album in Mock API
      const res = await fetch('https://66136ea153b0d5d80f676284.mockapi.io/api/v1/favorites', {
        method: 'POST',
        // Had to look this part up so that it wouldn't return lorem in the API
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(albumData)
      });
    }
      else {
      console.log('Album already in favorites');
      }
  }

  // Function to remove an album from favorites
  function removeFromFavorites(index) {
    // Remove the album from the favorite albums data store
    favoriteAlbums.splice(index, 1);

    // Render the updated list of favorite albums
    renderFavoriteAlbums();
  }

  // Function to switch to the favorites tab
  function switchToFavoritesTab() {
    searchResults.classList.add("d-none");
    favoritesTab.classList.remove("d-none");
    renderFavoriteAlbums();
  }

  // Function to switch back to the search tab
  function switchToSearchTab() {
    searchResults.classList.remove("d-none");
    favoritesTab.classList.add("d-none");
  }

  // Function to render search results
  function renderSearchResults(results) {
    // Clear previous search results
    searchResults.innerHTML = "";

    // Render each search result using the provided template
    results.forEach(result => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");

      listItem.innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">${result.albumName}<span class="badge bg-primary rounded-pill">${result.averageRating}</span></div>
          <span>${result.artistName}</span>
        </div>
        <button type="button" class="btn btn-success add-to-favorites" data-album='${JSON.stringify(result)}'>Add to Favorites</button>
      `;

      searchResults.appendChild(listItem);
    });
  }

  // Function to perform album search
  async function searchAlbums(query) {
    
      // Fetch album data from the API
      const res = await fetch('https://66136ea153b0d5d80f676284.mockapi.io/api/v1/albums');
      const albums = await res.json();

      // Filter albums based on the search query
      const searchResults = albums.filter(album =>
        album.albumName.toLowerCase().includes(query.toLowerCase()) ||
        album.artistName.toLowerCase().includes(query.toLowerCase())
      );
      // Render search results
      renderSearchResults(searchResults);
  }

  // Function to handle search form submission
  function handleSearchFormSubmit(event) {
    event.preventDefault();

    // Get the search query from the form input
    const query = event.target.querySelector("#query").value;

    // Perform album search
    searchAlbums(query);
  }

// click events
document.addEventListener('click', function(event) {
  const targetId = event.target.id;
  const targetClass = event.target.className;

  if (targetId === 'favorites-button') {
    event.preventDefault();
    switchToFavoritesTab();
  }

  if (targetId === 'search-button') {
    event.preventDefault();
    switchToSearchTab();
  }

  if (targetClass.includes('add-to-favorites')) {
    const albumData = JSON.parse(event.target.getAttribute("data-album"));
    addToFavorites(albumData);
  }

  if (targetClass.includes('remove-from-favorites')) {
    const index = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
    removeFromFavorites(index);
  }
});

  // Add event listener for search form submission
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", handleSearchFormSubmit);
}

appInit();