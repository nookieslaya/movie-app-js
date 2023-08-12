const url = '3ec38e84a0b560dd9b09c620f3b8fefc'

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
			console.log('Home')
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
