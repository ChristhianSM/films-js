import {
    mostrarUsuarioLogueado,
    cerrarSesion, 
    filtrarPorBusqueda,
    mostrarGenerosHtml, 
    crearPaginacion,
    crearPaginacionSeries} from "./helpers/helpers.js";

import {
    consultandoGeneros, 
    obtenerPeliculasPaginacion, 
    obtenerPeliculas,
    obtenerSeries} from './api.js'

/* Variables header */
const series = document.querySelector('.series');

// Boton Cerrar sesion
const btnCerrarSesion = document.querySelector('.cerrar-sesion');

// Eventos cuando la pagina carda
document.addEventListener('DOMContentLoaded', () => {
    mostrarUsuarioLogueado();

    /* Trae los generos */
    mostrarGeneros();
    
    paginacion();
})

eventosListener();
function eventosListener(){
    buscarPelicula.addEventListener('keyup', (e) => {
        filtrarPorBusqueda(e.target.value)
    })

    /* Eventos del header */
    series.addEventListener('click', buscarSeries);

    // Evento Cerrar Sesion
    btnCerrarSesion.addEventListener('click', cerrarSesion);
}

// Instanciamos el objeto UI
const ui = new UI();

async function mostrarGeneros(){
    const generos = await consultandoGeneros();
    const contenedorGenero = document.querySelector('.contenedor-generos');
    mostrarGenerosHtml(generos, contenedorGenero); /* Mando los generos y mando la ubicacion donde se mostraran */
}

async function buscarSeries(){
    const listadoSeries = [];
    const series = await obtenerSeries();

    const {total_pages, results} = series

    results.forEach( serie => {
        const {id, genre_ids, first_air_date, original_name,  overview, poster_path,vote_average, original_language} = serie;

        const newPelicula = new Pelicula(id, original_name, genre_ids, first_air_date, overview, poster_path,vote_average, original_language);
        listadoSeries.push(newPelicula);
    });

    console.log(results)
    console.log(listadoSeries)
    const resultadoFiltro = document.querySelector('.resultadoFiltro');
    const contenedorFiltros = document.querySelector('.contenedor-filtros');
    resultadoFiltro.classList.remove('display-none');
    resultadoFiltro.classList.add('display-block');
    
    const bloquePeliculas = document.querySelector('.peliculas');
    bloquePeliculas.classList.add('display-none')

    ui.limpiarHTML(contenedorFiltros);
    ui.mostrarPeliculasHTML(listadoSeries, contenedorFiltros);
    crearPaginacionSeries(total_pages)
}

async function buscarEstrenos(){
    console.log("BuscandoSeries")
}
async function buscarpeliculas2021(){
    console.log("BuscandoSeries")
}

async function paginacion() {
    const datos = await obtenerPeliculasPaginacion();
    const {results, total_pages} = datos;
    console.log(datos)

    crearPaginacion(total_pages);
}



