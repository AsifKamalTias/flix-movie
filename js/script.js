const currentPath = window.location.pathname;
const spinner = document.querySelector('.spinner');
const API_KEY = 'd9fe6978552dd91e63399b09bcd91dfa';
const API_URL = 'https://api.themoviedb.org/3';

const searchParams = {
    type: '',
    query: '',
    page: 1,
    totalPage: 1
}


const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const showSpinner = () => {
    if (spinner) {
        spinner.classList.add('show');
    }
}

const hideSpinner = () => {
    if (spinner) {
        spinner.classList.remove('show');
    }
}

const initSwiper = () => {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            }
        }
    });
}

const nextBTN = document.querySelector('#next');
const prevBTN = document.querySelector('#prev');

const getData = async endpoint => {
    try {
        showSpinner();
        const response = await fetch(`${API_URL}/${endpoint}?api_key=${API_KEY}`);
        const data = await response.json();
        hideSpinner();
        return data;
    }
    catch (error) {
        hideSpinner();
        return error;
    }
}

const getPopularMovies = async () => {
    const popularMovies = await getData('movie/popular');
    popularMovies.results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
                <a href="movie-details.html?id=${movie.id}">
                    ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />` : `<img src="../images/no-image.jpg" class="card-img-top" alt="${movie.title}" />`}
                </a>
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">
                        <small class="text-muted">Release: ${movie.release_date}</small>
                    </p>
                </div>
                `;

        document.querySelector('#popular-movies').appendChild(div);
    });
}

const getMovie = async () => {
    const id = window.location.search.split('=')[1];
    const movie = await getData(`movie/${id}`);

    const movieDetails = document.querySelector('#movie-details');

    movieDetails.innerHTML = `
    <div class="details-top">
        <div>
          <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `../images/no-image.jpg`}" class="card-img-top" alt="${movie.title}" />
        </div>
        <div>
          <h2>${movie.title}</h2>
          <p>
            <i class="fas fa-star text-primary"></i>
            ${(movie.vote_average).toFixed(1)}
          </p>
          <p class="text-muted">Release Date: ${movie.release_date}</p>
          <p>
            ${movie.overview}
          </p>
          <h5>Genres</h5>
          <ul class="list-group">
           ${movie.genres.map((genre) =>
        `<li>${genre.name}</li>`
    ).join('')}
          </ul>
          <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
      </div>
      <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
          <li><span class="text-secondary">Budget:</span> $${numberWithCommas(movie.budget)}</li>
          <li><span class="text-secondary">Revenue:</span> $${numberWithCommas(movie.revenue)}</li>
          <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
          <li><span class="text-secondary">Status:</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">
            ${movie.production_companies.map(company => {
        return `${company.name}`
    })}
        </div>
      </div>
    `;
};

const getPopularShows = async () => {
    const popularShows = await getData('tv/popular');
    popularShows.results.forEach(show => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
                <a href="tv-details.html?id=${show.id}">
                    ${show.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}" />` : `<img src="../images/no-image.jpg" class="card-img-top" alt="${show.name}" />`}
                </a>
                <div class="card-body">
                    <h5 class="card-title">${show.name}</h5>
                    <p class="card-text">
                        <small class="text-muted">Air Date: ${show.first_air_date}</small>
                    </p>
                </div>
                `;

        document.querySelector('#popular-shows').appendChild(div);
    });
}

const getShow = async () => {
    const id = window.location.search.split('=')[1];
    const show = await getData(`tv/${id}`);

    const tvDetails = document.querySelector('#show-details');

    tvDetails.innerHTML = `
    <div class="details-top">
        <div>
          <img src="${show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : `../images/no-image.jpg`}" class="card-img-top" alt="${show.name}" />
        </div>
        <div>
          <h2>${show.name}</h2>
          <p>
            <i class="fas fa-star text-primary"></i>
            ${(show.vote_average).toFixed(1)}
          </p>
          <p class="text-muted">Release Date: ${show.first_air_date}</p>
          <p>
            ${show.overview}
          </p>
          <h5>Genres</h5>
          <ul class="list-group">
           ${show.genres.map((genre) =>
        `<li>${genre.name}</li>`
    ).join('')}
          </ul>
          <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
      </div>
      <div class="details-bottom">
        <h2>Show Info</h2>
        <ul>
          <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
          <li><span class="text-secondary">Last Episode:</span> ${show.last_episode_to_air.name}</li>
          <li><span class="text-secondary">Status:</span> ${show.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">
            ${show.production_companies.map(company => {
        return `${company.name}`
    })}
        </div>
      </div>
    `;
};

const getNowPlaying = async () => {
    const { results } = await getData('movie/now_playing');
    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML =
            `
            <a href="movie-details.html?id=${movie.id}">
              <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `../images/no-image.jpg`}" alt="${movie.name}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i>${(movie.vote_average).toFixed(1)}/10
            </h4>
        `;
        document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
    });
}

const handlePagination = () => {
    const div = document.createElement('div');
    div.classList.add('pagination');
    div.innerHTML = `
        <button class="btn btn-primary" id="prev" ${searchParams.page === 1 ? 'disabled' : ''}>Prev</button>
        <button class="btn btn-primary" id="next" ${searchParams.page === searchParams.totalPage ? 'disabled' : ''}>Next</button>
        <div class="page-counter">Page ${searchParams.page} of ${searchParams.totalPage}</div>
    `;

    document.querySelector('#pagination').appendChild(div);

    document.querySelector('#prev').addEventListener('click', () => {
        searchParams.page = searchParams.page - 1;
        search();
    });

    document.querySelector('#next').addEventListener('click', () => {
        searchParams.page = searchParams.page + 1;
        search();
    });
}


const search = async () => {
    searchParams.type = (new URLSearchParams(window.location.search)).get('type');
    searchParams.query = (new URLSearchParams(window.location.search)).get('search-term');

    if (searchParams.query && searchParams.query !== '' && searchParams.type && searchParams.type !== '') {
        try {

            document.querySelector('#search-results').innerHTML = '';
            document.querySelector('#search-results-heading').innerHTML = '';
            document.querySelector('#pagination').innerHTML = '';

            const response = await fetch(`${API_URL}/search/${searchParams.type}?api_key=${API_KEY}&query=${searchParams.query}&page=${searchParams.page}`);
            const data = await response.json();

            searchParams.page = data.page;
            searchParams.totalPage = data.total_pages;

            if (data.results.length > 0) {
                data.results.forEach(result => {
                    const div = document.createElement('div');
                    div.classList.add('card');
                    div.innerHTML = `
                            <a href="${searchParams.type}-details.html?id=${result.id}">
                                ${result.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${result.poster_path}" class="card-img-top" alt="${searchParams.type === 'movie' ? `${result.title}` : `${result.name}`}" />` : `<img src="../images/no-image.jpg" class="card-img-top" alt="${searchParams.type === 'movie' ? `${result.title}` : `${result.name}`}" />`}
                            </a>
                            <div class="card-body">
                                <h5 class="card-title">${searchParams.type === 'movie' ? `${result.title}` : `${result.name}`}</h5>
                                <p class="card-text">
                                    <small class="text-muted">${searchParams.type === 'movie' ? 'Release Date' : 'On Air Date'}: ${searchParams.type === 'movie' ? `${result.release_date}` : `${result.first_air_date}`}</small>
                                </p>
                            </div>
                            `;

                    document.querySelector('#search-results').appendChild(div);
                });
            }

            handlePagination();
            document.querySelector('#search-results-heading').innerHTML = `<h2>Showing ${data.results.length} of ${data.total_results} results</h2>`;
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        alert('Please enter something to search');
    }
}


const makeLinkActive = () => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(element => {
        if (element.getAttribute('href') === currentPath) {
            element.classList.add('active');
        }
    });
}

const init = () => {
    switch (currentPath) {
        case '/':
        case '/index.html':
            getNowPlaying();
            getPopularMovies();
            break;
        case '/movie-details.html':
            getMovie();
            break;
        case '/search.html':
            search();
            break;
        case '/shows.html':
            getPopularShows();
            break;
        case '/tv-details.html':
            getShow();
            break;
        default:
            console.log('404');
    }

    makeLinkActive();
}

window.addEventListener('DOMContentLoaded', init);