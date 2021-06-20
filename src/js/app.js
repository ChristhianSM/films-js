import {
    mostrarUsuarioLogueado,
    cerrarSesion, 
    filtrarPorBusqueda,
    mostrarGenerosHtml, 
    crearPaginacion,
    buscarSeries,
    buscarPeliculasYearActual,
    buscarPeliculasEstreno,
    spinner} from "./helpers/helpers.js";

import {
    consultandoGeneros, 
    obtenerPeliculasPaginacion, 
    obtenerPeliculas,
} from './api.js'

// Variables de html
const resultadoEstrenos = document.querySelector('.contenedor-estrenos');
const resultadoPeliculasActualizadas = document.querySelector('.contenedor-peliculas-actualizadas');
const buscarPelicula = document.querySelector('.buscarPelicula');

/* Variables header */
const series = document.querySelector('.series');
const estrenos = document.querySelector('.estrenos');
const peliculas2021 = document.querySelector('.peliculas-2021');

// Boton Cerrar sesion
const btnCerrarSesion = document.querySelector('.cerrar-sesion');

// Eventos cuando la pagina carda
document.addEventListener('DOMContentLoaded', () => {
    mostrarEstrenos();
    mostrarPeliculasActualizadas();
    mostrarUsuarioLogueado();

    /* Trae los generos */
    mostrarGeneros();
    
    /* Llamar a la api */
    obtenerPeliculas();

    paginacion();
})

eventosListener();
function eventosListener(){
    buscarPelicula.addEventListener('keyup', (e) => {
        filtrarPorBusqueda(e.target.value)
    })

    /* Eventos del header */
    series.addEventListener('click', ()=> {
        const activo = document.querySelector('.activo');
        if (activo) {
            activo.classList.remove('activo');
        }
        series.classList.add('activo')

        /* Mostramos lo que estamos filtrando */
        const tituloFiltro = document.querySelector('.titulo-filtro');
        tituloFiltro.innerHTML = `Series :
            <a href="./peliculas.html">Ver todo</a> `

        buscarSeries();
    });
    estrenos.addEventListener('click', ()=> {
        const activo = document.querySelector('.activo');
        if (activo) {
            activo.classList.remove('activo');
        }
        estrenos.classList.add('activo');

        /* Mostramos lo que estamos filtrando */
        const tituloFiltro = document.querySelector('.titulo-filtro');
        tituloFiltro.innerHTML = `Estrenos :
            <a href="./peliculas.html">Ver todo</a> `

        buscarPeliculasEstreno();
    });
    peliculas2021.addEventListener('click', ()=> {
        const activo = document.querySelector('.activo');
        if (activo) {
            activo.classList.remove('activo');
        }
        peliculas2021.classList.add('activo');

        /* Mostramos lo que estamos filtrando */
        const tituloFiltro = document.querySelector('.titulo-filtro');
        tituloFiltro.innerHTML = `Peliculas estrenadas este año :
        <a href="./peliculas.html">Ver todo</a> `

        buscarPeliculasYearActual();
    });

    // Evento Cerrar Sesion
    btnCerrarSesion.addEventListener('click', cerrarSesion);
}

// Instanciamos el objeto UI
const ui = new UI();

async function mostrarEstrenos(){
    const listadoEstrenos = [];
    const estrenos = await obtenerPeliculas();
    
    const spinner1 = spinner();

    ui.limpiarHTML(resultadoEstrenos);
    resultadoEstrenos.appendChild(spinner1);

    estrenos.forEach( pelicula => {
        const {id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language} = pelicula;

        const newPelicula = new Pelicula(id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language, false);
        listadoEstrenos.push(newPelicula);
    })

    const estreno = listadoEstrenos.filter( pelicula => {
        return pelicula.estreno === true;
    })

    ui.limpiarHTML(resultadoEstrenos)
    ui.mostrarPeliculasHTML(estreno, resultadoEstrenos);
}

async function mostrarPeliculasActualizadas(){
    const listadoPeliculas = [];
    const peliculas = await obtenerPeliculas();

    const spinner1 = spinner();

    ui.limpiarHTML(resultadoPeliculasActualizadas);
    resultadoPeliculasActualizadas.appendChild(spinner1);

    peliculas.forEach( pelicula => {
        const {id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language} = pelicula;

        const newPelicula = new Pelicula(id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language, false);
        listadoPeliculas.push(newPelicula);
    })

    ui.limpiarHTML(resultadoPeliculasActualizadas)
    ui.mostrarPeliculasHTML(listadoPeliculas, resultadoPeliculasActualizadas);
}

async function mostrarGeneros(){
    const generos = await consultandoGeneros();
    const contenedorGenero = document.querySelector('.contenedor-generos');
    mostrarGenerosHtml(generos, contenedorGenero); /* Mando los generos y mando la ubicacion donde se mostraran */
}

async function paginacion() {
    const datos = await obtenerPeliculasPaginacion();
    const {results, total_pages} = datos;

    crearPaginacion(total_pages);
}



