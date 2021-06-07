import {obtenerDatosPelicula} from './api.js'

document.addEventListener('DOMContentLoaded', ()=> {
    const parametrosURL = new URLSearchParams(document.location.search);
    const idPelicula = (parametrosURL.get('id'));

    mostrarDatosPelicula(idPelicula);
})

async function mostrarDatosPelicula(id){
    const pelicula = await obtenerDatosPelicula(id);
    console.log(pelicula)

    const {genres, homepage, original_language, original_title, overview,poster_path,release_date,vote_average, vote_count, tagline} = pelicula;

    /* Seleccionamos los elementos del html */
    const imagen = document.querySelector('.imagen-pelicula');
    imagen.src = `https://image.tmdb.org/t/p/w500/${poster_path}`

    const h2 = document.querySelector('.titulo-pelicula');
    h2.textContent = original_title;

    const year = document.querySelector('.year');
    console.log(year)

    const fechaPelicula = document.querySelector('.fecha-pelicula');
    fechaPelicula.textContent = release_date;

    const generos = document.querySelector('.generos');
    let listaGenero = "";
    genres.forEach(genero => {
        listaGenero += ` ${genero.name}`
    });
    generos.textContent = listaGenero

    const tag = document.querySelector('.tagline');
    tag.textContent = tagline;
    tag.style.textTransform = 'italy'

    const descripcion = document.querySelector('.descripcion');
    descripcion.textContent = overview;
    
    // const year = document.querySelector('.year-pelicula');
    // year.textContent = release_date;



}