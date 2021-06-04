import {cerrarSesion, filtrarPorBusqueda, mostrarUsuarioLogueado, mostrarGenerosHtml,recorrerArreglo, crearPaginacion, crearPaginacionFiltro, crearPaginacionFecha} from "./helpers/helpers.js";

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
    ultimasPeliculasActualizadas();
    paginacion();

    obtenerFechasEnTiempoReal();
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

async function filtrarPorFecha( fechaInicial, fechaFinal ){
    const alertaPrevia = document.querySelector('.alerta');
    console.log(alertaPrevia)
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    const fechaInicialInput = document.querySelector('#fecha-inicial');

    if (fechaInicial > fechaFinal) {
        fechaInicialInput.style.background = "red";
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

async function paginacion() {
    const datos = await obtenerPeliculasPaginacion();
    const {results, total_pages} = datos;

    crearPaginacion( total_pages);
}

function obtenerFechasEnTiempoReal(){
    const fechaInicial = document.querySelector('#fecha-inicial');
    const fechaFinal = document.querySelector('#fecha-final');

    // const fechaActual = new Date();
    // const diaActual = fechaActual.getDate();
    // const mesActual = fechaActual.getMonth()+1;
    // const yearActual = fechaActual.getFullYear();

    // let formatoActual;
    // if (diaActual < 10 && mesActual < 10) {
    //     formatoActual = `${yearActual}-0${mesActual}-0${diaActual}`
    // }else if (day < 10) {
    //     formatoActual = `${yearActual}-${mesActual}-0${diaActual}`
    // }else{
    //     formatoActual = `${yearActual}-0${mesActual}-${diaActual}`
    // }

    /* Bloqueamos fechas anteriores a la que el usuario ingreso en la fecha inicial */
    // fechaFinal.value = formatoActual;
    
    fechaInicial.addEventListener('input', () => {
        const fechaInicialDate = new Date(fechaInicial.value);
        console.log("Dia : "+(fechaInicialDate.getDate()))
        // Extraemos el formato AAAA-MM-DD
        const year = fechaInicialDate.getFullYear();
        const day = fechaInicialDate.getDate()+1;
        const mounth = fechaInicialDate.getMonth()+1;

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


