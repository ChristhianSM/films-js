import {mostrarUsuarioLogueado,cerrarSesion, filtrarPorBusqueda,mostrarGenerosHtml, crearPaginacion} from "./helpers/helpers.js";

// Variables de html
const resultadoEstrenos = document.querySelector('.contenedor-estrenos');
const resultadoPeliculasActualizadas = document.querySelector('.contenedor-peliculas-actualizadas');
const buscarPelicula = document.querySelector('.buscarPelicula');

// Boton Cerrar sesion
const btnCerrarSesion = document.querySelector('.cerrar-sesion');

// selector para la paginacion
const contenedorPaginacion = document.querySelector('.contenedor-paginacion');

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

    // Evento Cerrar Sesion
    btnCerrarSesion.addEventListener('click', cerrarSesion);
}

// Instanciamos el objeto UI
const ui = new UI();

function mostrarEstrenos(){
    const estreno = listaPeliculas.filter( pelicula => {
        return pelicula.estreno === true;
    })

    ui.mostrarPeliculasHTML(estreno, resultadoEstrenos);
}

function mostrarPeliculasActualizadas(){
    ui.mostrarPeliculasHTML(listaPeliculas, resultadoPeliculasActualizadas);
}

async function mostrarGeneros(){
    const generos = await consultandoGeneros();
    const contenedorGenero = document.querySelector('.contenedor-generos');
    mostrarGenerosHtml(generos, contenedorGenero); /* Mando los generos y mando la ubicacion donde se mostraran */
}

async function paginacion() {
    const datos = await obtenerPeliculasPaginacion();
    const {results, total_pages} = datos;
    console.log(datos)

    crearPaginacion(total_pages);
}



