import {cerrarSesion, 
    filtrarPorBusqueda, 
    mostrarUsuarioLogueado, 
    mostrarGenerosHtml,
    recorrerArreglo, 
    crearPaginacion, 
    crearPaginacionFiltro, 
    crearPaginacionFecha, 
    crearPaginacionIdiomas} from "./helpers/helpers.js";

import {
    obtenerPeliculas,
    consultandoGeneros,
    obtenerPeliculasPorFechas,
    obtenerIdiomasAPI,
    obtenerPeliculasPorIdioma,
    obtenerPeliculasPaginacion,
} from './api.js'

// Variables
const resultadoPeliculasActualizadas = document.querySelector('.contenedor-peliculas-actualizadas');
const buscarPelicula = document.querySelector('.buscarPelicula');

// Boton Cerrar sesion
const btnCerrarSesion = document.querySelector('.cerrar-sesion');

// selector para la paginacion
const contenedorPaginacion = document.querySelector('.contenedor-paginacion');

// Seleccionar los button de busqueda de fechas
const btnBuscarFecha = document.querySelector('.btn-buscar-fecha');

// Instanciamos el objeto UI
const ui = new UI();

eventosListener();
function eventosListener(){

    buscarPelicula.addEventListener('keyup', (e) => {
        filtrarPorBusqueda(e.target.value)
    })

    btnBuscarFecha.addEventListener('click', () => {
        const activo = document.querySelector('.activo');
        if (activo) {
            activo.classList.remove('activo')
        }
        const fechaInicial = document.querySelector('#fecha-inicial').value;
        const fechaFinal = document.querySelector('#fecha-final').value;
        filtrarPorFecha(fechaInicial, fechaFinal)
    } )

    mostrarPeliculasActualizadas();

    // Evento Cerrar Sesion
    btnCerrarSesion.addEventListener('click', cerrarSesion);
}

// Eventos
document.addEventListener('DOMContentLoaded',  () => {
    mostrarUsuarioLogueado();
    mostrarGeneros();
    obtenerFechasEnTiempoReal();

    /* Idiomas */
    mostrarIdiomas();
    obtenerIdiomas();

    ultimasPeliculasActualizadas();
    paginacion();

})

async function mostrarPeliculasActualizadas(){
    const listadoPeliculas = [];
    const peliculas = await obtenerPeliculas();
    
    peliculas.forEach( pelicula => {
        const {id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language} = pelicula;

        const newPelicula = new Pelicula(id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language);
        listadoPeliculas.push(newPelicula);
    })

    ui.mostrarPeliculasHTML(listadoPeliculas, resultadoPeliculasActualizadas);
}

async function mostrarGeneros() {

    const menuGenero = document.querySelector('.menu-genero');
    const contenedorGenero = document.querySelector('.contenedor-generos');
    
    const generos = await consultandoGeneros();
    mostrarGenerosHtml(generos, contenedorGenero); /* Mando los generos y mando la ubicacion donde se mostraran */

    mostrarGenerosHtml(generos, menuGenero); /* Mando los generos y mando la ubicacion donde se mostraran */

}

async function filtrarPorFecha( fechaInicial, fechaFinal ){
    const alertaPrevia = document.querySelector('.alerta');
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    const fechaInicialInput = document.querySelector('#fecha-inicial');

    if (fechaFinal !== "") {
        if (fechaInicial > fechaFinal) {
            fechaInicialInput.style.background = "red";
        }
    }

    const peliculas = await obtenerPeliculasPorFechas(fechaInicial, fechaFinal);
    const {results, total_pages} = peliculas;
    console.log(results.length)
    
    const resultadoFiltro = document.querySelector('.resultadoFiltro');

    if (results.length === 0) {
        console.log(resultadoFiltro)
        const contenedorFiltros = document.querySelector('.contenedor-filtros')
        ui.limpiarHTML(contenedorFiltros);
        ui.limpiarHTML(document.querySelector('.contenedor-paginacion'));
        ui.mostrarMensajes('No existen peliculas en el rango indicado, intente con otras fechas', 'error', resultadoFiltro);
        return;
    }

    const peliculasPorFechas = [];
    recorrerArreglo(results, peliculasPorFechas);
    crearPaginacionFecha(fechaInicial, fechaInicial, total_pages);
}

async function mostrarIdiomas(){
    let listadoIdiomas = [];
    const idiomas = await obtenerIdiomasAPI();
    
    // Verificar los idiomas que tienen nombre
    idiomas.forEach( idioma => {
        const {iso_639_1, name, english_name} = idioma;
        if (name !== "") {
            const objetoIdioma = {
                name,
                iso_639_1,
                english_name
            }
            listadoIdiomas = [...listadoIdiomas, objetoIdioma]
        }
    })

    const idiomaInput = document.querySelector('#idiomas');
    
    listadoIdiomas.forEach( idioma => {
        const {iso_639_1, name, english_name} = idioma;
        const option = document.createElement('option');
        option.textContent = name;
        option.value = iso_639_1;
        idiomaInput.appendChild(option)
    })
}

function obtenerIdiomas(){

    idiomas.addEventListener('change', async (e)=> {
        const peliculasPorIdiomas = [];
        const idiomaSeleccionado = e.target.value;
        console.log(idiomaSeleccionado)
        const peliculas = await obtenerPeliculasPorIdioma(idiomaSeleccionado);
        const {results, total_pages} = peliculas
        console.log(results)

        recorrerArreglo(results ,peliculasPorIdiomas);
        crearPaginacionIdiomas( results, total_pages);
    })
}

async function ultimasPeliculasActualizadas(){
    const contenedorUltimas = document.querySelector('.contenedor-ultimas');

    const listadoPeliculas = [];
    const peliculas = await obtenerPeliculas();
    
    peliculas.forEach( pelicula => {
        const {id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language} = pelicula;

        const newPelicula = new Pelicula(id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language);
        listadoPeliculas.push(newPelicula);
    })

    listadoPeliculas.forEach( pelicula => {
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

async function paginacion() {
    const datos = await obtenerPeliculasPaginacion();
    const {results, total_pages} = datos;

    crearPaginacion( total_pages);
}

function obtenerFechasEnTiempoReal(){
    const fechaInicial = document.querySelector('#fecha-inicial');
    const fechaFinal = document.querySelector('#fecha-final');
    
    fechaInicial.addEventListener('input', () => {
        const fechaInicialDate = new Date(fechaInicial.value);
        console.log("Dia : "+(fechaInicialDate.getDate()))
        // Extraemos el formato AAAA-MM-DD
        const year = fechaInicialDate.getFullYear();
        const mounth = fechaInicialDate.getMonth()+1;
        const day = fechaInicialDate.getDate()+1;

        let formato;
        if (day < 10 && mounth < 10) {
            formato = `${year}-0${mounth}-0${day}`
        }else if (day < 10) {
            formato = `${year}-${mounth}-0${day}`
        }else{
            formato = `${year}-0${mounth}-${day}`
        }

        /* Bloqueamos fechas anteriores a la que el usuario ingreso en la fecha inicial */
        fechaFinal.min = formato;
        console.log(formato)
    });

    fechaFinal.addEventListener('input', () => {
        const fechaFinalInput = new Date(fechaFinal.value);
        console.log("Dia : "+(fechaFinalInput.getDate()))
        // Extraemos el formato AAAA-MM-DD
        const year = fechaFinalInput.getFullYear();
        const day = fechaFinalInput.getDate()+1;
        const mounth = fechaFinalInput.getMonth()+1;

        let formato;
        if (day < 10 && mounth < 10) {
            formato = `${year}-0${mounth}-0${day}`
        }else if (day < 10) {
            formato = `${year}-${mounth}-0${day}`
        }else{
            formato = `${year}-0${mounth}-${day}`
        }

        /* Bloqueamos fechas anteriores a la que el usuario ingreso en la fecha inicial */
        fechaInicial.max = formato;
        console.log(formato)
    });

}


