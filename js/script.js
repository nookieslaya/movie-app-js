const url = '3ec38e84a0b560dd9b09c620f3b8fefc'

//Display movies
async function displayPopularMovies() {
	const { results } = await fetchAPIData('movie/popular')
	console.log(results)

	results.forEach(movie => {
		const div = document.createElement('div')
		div.classList.add('card')
		div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
           ${
							movie.poster_path
								? ` <img
           src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
           class="card-img-top"
           alt="Movie Title"
         />`
								: ` <img
         src="images/no-image.jpg"
         class="card-img-top"
         alt="${movie.title}"
       />`
						}
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release:${movie.release_date}</small>
            </p>
          </div>
        `
		document.querySelector('#popular-movies').appendChild(div)
	})
}

async function fetchAPIData(endpoint) {
	const API_KEY = '3ec38e84a0b560dd9b09c620f3b8fefc'
	const API_URL = 'https://api.themoviedb.org/3/'

	const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
	const data = await response.json()
	console.log(data)
	return data
}

const global = {
	currentPage: window.location.pathname,
}
function hightlightActiveLink() {
	const links = document.querySelectorAll('.nav-link')
	links.forEach(link => {
		if (link.getAttribute('href') === global.currentPage) {
			link.classList.add('active')
		}
	})
}

function init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displayPopularMovies()
			break
		case '/shows.html':
			console.log('Shows')
			break
		case '/movie-details.html':
			console.log('Movie Details')
		case '/tv-details.html':
			console.log('Tv Details')
		case '/search.html':
			console.log('Search')
	}
	hightlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init)
