import {cerrarSesion, filtrarPorBusqueda, mostrarUsuarioLogueado, mostrarGenerosHtml, crearPaginacion} from "./helpers/helpers.js";

// Variables
const resultadoPeliculasActualizadas = document.querySelector('.contenedor-peliculas-actualizadas');
const buscarPelicula = document.querySelector('.buscarPelicula');

// Boton Cerrar sesion
const btnCerrarSesion = document.querySelector('.cerrar-sesion');

// selector para la paginacion
const contenedorPaginacion = document.querySelector('.contenedor-paginacion');

// Instanciamos el objeto UI
const ui = new UI();

eventosListener();
function eventosListener(){

    buscarPelicula.addEventListener('keyup', (e) => {
        filtrarPorBusqueda(e.target.value)
    })

    mostrarPeliculasActualizadas();

    // Evento Cerrar Sesion
    btnCerrarSesion.addEventListener('click', cerrarSesion);
}

// Eventos
document.addEventListener('DOMContentLoaded',  () => {
    mostrarUsuarioLogueado();
    mostrarGeneros();
    generarAnnosLanzamiento();
    ultimasPeliculasActualizadas();
    
    paginacion();
})

function mostrarPeliculasActualizadas(){
    ui.mostrarPeliculasHTML(listaPeliculas, resultadoPeliculasActualizadas);
}

async function mostrarGeneros() {
    const menuGenero = document.querySelector('.menu-genero');
    const contenedorGenero = document.querySelector('.contenedor-generos');
    
    const generos = await consultandoGeneros();
    mostrarGenerosHtml(generos, contenedorGenero); /* Mando los generos y mando la ubicacion donde se mostraran */

    mostrarGenerosHtml(generos, menuGenero); /* Mando los generos y mando la ubicacion donde se mostraran */
}

function generarAnnosLanzamiento() {
    const fechaActual = new Date().getFullYear();
    const enlaceAnnos = document.querySelector('.enlace-annos');
    
    for (let i = fechaActual; i > 1990; i--) {
        const a = document.createElement('A');
        a.textContent = i;
        a.href = "#";
        a.onclick = (e) => {
             /* Agregar activo al link que se apreto click */
             const claseActivoYear = document.querySelector('.activo-year');
             const claseActivo = document.querySelector('.activo');
             if (claseActivo ) {
                claseActivo.classList.remove('activo');
            }else if (claseActivoYear) {
                claseActivoYear.classList.remove('activo-year');
            }
             e.target.classList.add('activo-year');
            filtrarYear(i);
        };
        enlaceAnnos.appendChild(a)
    }
}

function ultimasPeliculasActualizadas(){
    const contenedorUltimas = document.querySelector('.contenedor-ultimas');
    listaPeliculas.forEach( pelicula => {
        if (pelicula.estreno) {
            const contenedorImagen = document.createElement('A');
            contenedorImagen.href = "#"
            const img = document.createElement('IMG');
            img.classList.add('imagen')
            img.src = `${pelicula.img}`
            contenedorImagen.appendChild(img);
            contenedorUltimas.appendChild(contenedorImagen);
        }

        

    })
}

function filtrarYear(year){
    const peliculas = listaPeliculas.filter(pelicula => {
        return pelicula.year === year;
    })

    const resultadoFiltro = document.querySelector('.resultadoFiltro');
    resultadoFiltro.classList.add('display-block');
    
    const bloquePeliculas = document.querySelector('.peliculas');
    bloquePeliculas.classList.add('display-none');

    const contenedorFiltros = document.querySelector('.contenedor-filtros');

    ui.limpiarHTML(contenedorFiltros);
    ui.mostrarPeliculasHTML(peliculas,contenedorFiltros);
}

async function paginacion() {
    const datos = await obtenerPeliculasPaginacion();
    const {results, total_pages} = datos;

    crearPaginacion( total_pages);
}


