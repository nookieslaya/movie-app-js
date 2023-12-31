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

//Popular TV shows
async function displayPopularShows() {
	const { results } = await fetchAPIData('tv/popular')
	console.log(results)

	results.forEach(show => {
		const div = document.createElement('div')
		div.classList.add('card')
		div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
           ${
							show.poster_path
								? ` <img
           src="https://image.tmdb.org/t/p/w500${show.poster_path}"
           class="card-img-top"
           alt="Movie Title"
         />`
								: ` <img
         src="images/no-image.jpg"
         class="card-img-top"
         alt="${show.name}"
       />`
						}
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">On air: ${show.first_air_date}</small>
            </p>
          </div>
        `
		document.querySelector('#popular-shows').appendChild(div)
	})
}

async function displayMovieDetails() {
	const movieId = window.location.search.split('=')[1]
	const movie = await fetchAPIData(`movie/${movieId}`)

	displayBackgroundImage('movie', movie.backdrop_path)

	const div = document.createElement('div')

	console.log(movie)

	div.innerHTML = `<div class="details-top">
	<div>
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
	</div>
	<div>
	  <h2>${movie.title}</h2>
	  <p>
		<i class="fas fa-star text-primary"></i>
		${movie.vote_average.toFixed(1)} / 10
	  </p>
	  <p class="text-muted">Release Date: ${movie.release_date}</p>
	  <p>
		${movie.overview}
	  </p>
	  <h5>Genres</h5>
	  <ul class="list-group">
		${movie.genres.map(genre => `<li>${genre.name}.</li>`).join('')}
	  </ul>
	  <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
	</div>
  </div>
  <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $ ${addCommasToNumber(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $ ${addCommasToNumber(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
						.map(company => `<span>${company.name}.</span>`)
						.join(', ')}</div>
        </div> 
  `

	document.querySelector('#movie-details').appendChild(div)
}

async function displayShowDetails() {
	const showId = window.location.search.split('=')[1]
	const show = await fetchAPIData(`tv/${showId}`)

	displayBackgroundImage('tv', show.backdrop_path)

	const div = document.createElement('div')
	console.log(show)
	div.innerHTML = `<div class="details-top">
	<div>
	${
		show.poster_path
			? ` <img
src="https://image.tmdb.org/t/p/w500${show.poster_path}"
class="card-img-top"
alt="show Title"
/>`
			: ` <img
src="images/no-image.jpg"
class="card-img-top"
alt="${show.name}"
/>`
	}
	</div>
	<div>
	  <h2>${show.name}</h2>
	  <p>
		<i class="fas fa-star text-primary"></i>
		${show.vote_average.toFixed(1)} / 10
	  </p>
	  <p class="text-muted">Release Date: ${show.last_air_date}</p>
	  <p>
		${show.overview}
	  </p>
	  <h5>Genres</h5>
	  <ul class="list-group">
		${show.genres.map(genre => `<li>${genre.name}.</li>`).join('')}
	  </ul>
	  <a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>
	</div>
  </div>
  <div class="details-bottom">
          <h2>Movie Info</h2>
      
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
						.map(company => `<span>${company.name}.</span>`)
						.join(', ')}</div>
        </div> 
  `
	document.querySelector('#show-details').appendChild(div)
}

function displayBackgroundImage(type, backgroundPath) {
	const overlayDiv = document.createElement('div')

	overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`
	overlayDiv.style.backgroundSize = 'cover'
	overlayDiv.style.backgroundPosition = 'center'
	overlayDiv.style.backgroundRepeat = 'no-repeat'
	overlayDiv.style.height = '100vh'
	overlayDiv.style.width = '100vw'
	overlayDiv.style.position = 'absolute'
	overlayDiv.style.position = 'fixed'
	overlayDiv.style.top = '0'
	overlayDiv.style.left = '0'
	overlayDiv.style.zIndex = '-1'
	overlayDiv.style.opacity = '0.1'

	if (type === 'movie') {
		document.querySelector('#movie-details').appendChild(overlayDiv)
	} else {
		document.querySelector('#show-details').appendChild(overlayDiv)
	}
}

// slider

const displaySlider = async () => {
	const { results } = await fetchAPIData('movie/now_playing')
	console.log(results)

	results.forEach(movie => {
		const div = document.createElement('div')
		div.classList.add('swiper-slide')

		div.innerHTML = `
		<a href="movie-details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Title" />
          </a>
          <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
          </h4>
		`
		document.querySelector('.swiper-wrapper').appendChild(div)

		initSwiper()
	})
}

const initSwiper = () => {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		autoplay: {
			delay: 4000,
		},
		breakpoints: {
			500: {
				slidesPerView: 1,
			},
			700: {
				slidesPerView: 2,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	})
}

async function fetchAPIData(endpoint) {
	const API_KEY = '3ec38e84a0b560dd9b09c620f3b8fefc'
	const API_URL = 'https://api.themoviedb.org/3/'

	showSpinner()

	const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
	const data = await response.json()
	hideSpinner()
	console.log(data)
	return data
}

const global = {
	currentPage: window.location.pathname,
}

function showSpinner() {
	document.querySelector('.spinner').classList.add('show')
}
function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show')
}
function hightlightActiveLink() {
	const links = document.querySelectorAll('.nav-link')
	links.forEach(link => {
		if (link.getAttribute('href') === global.currentPage) {
			link.classList.add('active')
		}
	})
}

function addCommasToNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displayPopularMovies()
			displaySlider()
			break
		case '/shows.html':
			displayPopularShows()
			break
		case '/movie-details.html':
			displayMovieDetails()
		case '/tv-details.html':
			displayShowDetails()
			break
		case '/search.html':
			console.log('Search')
	}
	hightlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init)
