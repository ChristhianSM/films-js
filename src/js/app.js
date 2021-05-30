/* Variables Globales */
const registrosPorPagina = 10;
let totalPaginas;
let iterador;
let paginaActual = 1;

// Variables de html
const resultadoEstrenos = document.querySelector('.contenedor-estrenos');
const resultadoPeliculasActualizadas = document.querySelector('.contenedor-peliculas-actualizadas');
const buscarPelicula = document.querySelector('.buscarPelicula');

// Boton Cerrar sesion
const btnCerrarSesion = document.querySelector('.cerrar-sesion');

// selector para la paginacion
const contenedorPaginacion = document.querySelector('.contenedor-paginacion')

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

    /* Funcion para iniciar nuestro generador */
    totalPaginas = calcularPaginas(listaPeliculas.length);
    imprimirPaginador();
    
    /* Trae los generos */
    generarGeneros();
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

function calcularPaginas(total){
    return parseInt(Math.ceil(total/registrosPorPagina));
}

function imprimirPaginador(){
    iterador = crearPaginador(totalPaginas);
    const paginaInicial = document.querySelector('.pagina-inicial');
    const paginaFinal = document.querySelector('.pagina-final');
    while(true){
        const {value, done} = iterador.next();

        if (done) return;

        /* En caso de que aun no llegue a done, crea un boton por cada elemento del generador */
        const boton = document.createElement('a');
        boton.href = "#"
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('boton-paginador');
        boton.onclick = ()=> {
            paginaActual = value;
        }

        paginaFinal.textContent = value;
        contenedorPaginacion.appendChild(boton);

    }
}


