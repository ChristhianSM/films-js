import {obtenerDatosPelicula, obtenerDatosSerie, obtenerSeries, obtenerRepartoSerie} from './api.js'
import { mostrarUsuarioLogueado } from './helpers/helpers.js';

/* Eventos */
const fondos = document.querySelector('.pagina-fondos');
const poster = document.querySelector('.pagina-posters');

eventosListener();
function eventosListener() {
    fondos.addEventListener('click', cambiarPagina);
    poster.addEventListener('click', cambiarPagina);
}

document.addEventListener('DOMContentLoaded', async ()=> {
    mostrarUsuarioLogueado();

    const parametrosURL = new URLSearchParams(document.location.search);
    const idSerie = (parametrosURL.get('id'));
    const nombrePelicula = (parametrosURL.get('nombrePelicula'));

    const serie = await obtenerDatosSerie(idSerie, nombrePelicula);

    $('.contenedor-pelicula').prepend( mostrarInformacionPelicula(serie)); 
    animaciones();
    
})

function mostrarInformacionPelicula(serie,reparto){
    const {genres, homepage, original_language, original_name, overview,poster_path,first_air_date,vote_average, vote_count, tagline, created_by} = serie;

    const yearPelicula = new Date(first_air_date);

    let listaGenero = "";
    genres.forEach(genero => {
        listaGenero += ` - ${genero.name}\n\t`
    });

    let maquillaje = "", escritores = "", editores = "", directores = "",productores = ""
    created_by.forEach(persona=> {
        directores += `-${persona.name}\n` 
    })

    return `
            <img src = "https://image.tmdb.org/t/p/w500/${poster_path}">
            <div class="informacion">
                <h2 class="titulo-pelicula">${original_name} <span class="year">(${yearPelicula.getFullYear()})</span></h2>
                <div class="subtitulo-informacion">
                    <p class="fecha-pelicula">${first_air_date}</p>
                    <p class="generos">${listaGenero}</p>
                    <p class="duracion"></p>
                </div>
                <div class="vista-general">
                    <h3> Vista General</h3>
                    <p class="tagline">${tagline}</p>
                    <p class="descripcion">${overview}</p>
                </div>
                <div class = "ficha-tecnica">
                    <div>
                        <h3>Creador : </h3>
                        <p>${directores}</p>
                    </div>
                </div>
            </div> 
    `
}

function cambiarPagina(e){
    if (e.target.classList.contains('pagina-fondos')) {
        document.querySelector('.swiper-posters').classList.add('display-none');
        document.querySelector('.swipper-backdrops').classList.remove('display-none');
        document.querySelector('.swipper-backdrops').classList.add('display-block');
    }else{ 
        document.querySelector('.swiper-posters').classList.remove('display-none');
        document.querySelector('.swipper-backdrops').classList.add('display-none');
        document.querySelector('.swipper-backdrops').classList.remove('display-block');
    }
}

function animaciones() {

    $('.contenedor-pelicula').animate({
        padding : '5rem 0 5rem 5rem',
    }, 3000) 

    $('.contenedor-pelicula').css({
        borderBottom : '2px solid'
    }, 3000) 

    $('.contenedor-pelicula img').animate({
        boxShadow: '5px 8px',
        borderRadius: '10%',
    }, 2000).click( function() {
        $('.contenedor-pelicula img').animate({
            borderRadius: '50%',
        }, 1000)
    })

    $('.mostrar-reparto')
        .css({
            padding: '1rem',
            fontSize: '1.5rem'
        })
        .click( function() {
        $('.reparto').fadeToggle();
    });

}
