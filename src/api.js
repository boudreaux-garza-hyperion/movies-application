import { OMDb_KEY } from "./keys";

const $ = require("jquery");

const movies = (obj) => {
    // set loading placeholder
    $("#movieList").html("<div class='mx-auto loader'></div>");
    $("#edit-tab").addClass("disabled");
    if (Object.keys(obj).length < 2) {
        return fetch(obj.url)
            .then(response => response.json());
    } else {
        return fetch(obj.url, obj.options)
            .then(response => response.json());
    }
}

const getMovieInfo = (title) => {
    fetch(`http://www.omdbapi.com/?apikey=${OMDb_KEY}&t=${title}`)
        .then(response => response.json());
}

const getMovies = () => {
    return movies({ url: '/api/movies' });
}

// function to add a new movie
const addMovie = (movie) => {
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie)
    };
    return movies({ url, options });
}

// function to edit a movie
const editMovie = (id, movie) => {
    const url = `/api/movies/${id}`;
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie)
    };
    return movies({ url, options });
}

// function to delete a movie
const deleteMovie = (id) => {
    const url = `/api/movies/${id}`;
    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    };
    return movies({ url, options });
}

export { getMovies, addMovie, editMovie, deleteMovie, getMovieInfo };
