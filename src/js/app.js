// Variables
const resultadoEstrenos = document.querySelector('.contenedor-estrenos');
const resultadoPeliculasActualizadas = document.querySelector('.contenedor-peliculas-actualizadas');
const buscarPelicula = document.querySelector('.buscarPelicula');

// Boton Cerrar sesion
const btnCerrarSesion = document.querySelector('.cerrar-sesion');

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

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarEstrenos();
    mostrarPeliculasActualizadas();
    mostrarUsuarioLogueado();
})

function mostrarEstrenos(){
    const estreno = listaPeliculas.filter( pelicula => {
        return pelicula.estreno === true;
    })

    ui.mostrarPeliculasHTML(estreno, resultadoEstrenos);
}

function mostrarPeliculasActualizadas(){
    ui.mostrarPeliculasHTML(listaPeliculas, resultadoPeliculasActualizadas);
}

function filtrarPorBusqueda(termino){
    const texto = termino.toLowerCase();
    const peliculas = listaPeliculas.filter( pelicula => {
        return (pelicula.nombre.toLowerCase()).indexOf(texto) !== -1
    })
    
    const contenedorFiltros = document.querySelector('.contenedor-filtros');

    if (peliculas.length > 0) {
        
        const resultadoFiltro = document.querySelector('.resultadoFiltro');
        resultadoFiltro.classList.add('display-block');
        
        const bloquePeliculas = document.querySelector('.peliculas');
        bloquePeliculas.classList.add('display-none')
        
        ui.limpiarHTML(contenedorFiltros);
        ui.mostrarPeliculasHTML(peliculas,contenedorFiltros);
    }else{
        ui.limpiarHTML(contenedorFiltros);
        const resultadoFiltro = document.querySelector('.resultadoFiltro');
        ui.mostrarMensajes('Pelicula no encontrada, ingrese otro termino de busqueda', 'error' , resultadoFiltro)
    }
}


