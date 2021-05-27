// Variables
const resultadoEstrenos = document.querySelector('.contenedor-estrenos');
const resultadoPeliculasActualizadas = document.querySelector('.contenedor-peliculas-actualizadas');
const buscarPelicula = document.querySelector('.buscarPelicula');

const totalAccion = document.querySelector('.totalAccion');
const totalTerror = document.querySelector('.totalTerror');
const totalAnimacion = document.querySelector('.totalAnimacion');

// Botones
const btnAccion = document.querySelector('.btnAccion');
const btnAnimacion = document.querySelector('.btnAnimacion');
const btnTerror = document.querySelector('.btnTerror');

// Boton Cerrar sesion
const btnCerrarSesion = document.querySelector('.cerrar-sesion');

eventosListener();
function eventosListener(){
    btnAccion.addEventListener('click', (e) => {
        e.preventDefault();
        filtrarPelicula("Accion");
    })

    btnAnimacion.addEventListener('click', (e) => {
        e.preventDefault();
        filtrarPelicula("Animacion");
    })
    btnTerror.addEventListener('click', (e) => {
        e.preventDefault();
        filtrarPelicula("Terror");
    })

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
    mostrarCantidadPeliculas();
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

function mostrarCantidadPeliculas(){
    const genero = {
        accion : "Accion",
        terror : 'Terror',
        animacion: 'Animacion'
    }
    
    const cantidadTerror = listaPeliculas.filter( pelicula => {
        return pelicula.genero === genero.terror;
    }).length

    ui.mostrarCantidadPeliculasHTML(cantidadTerror,totalTerror )
    const cantidadAnimacion = listaPeliculas.filter( pelicula => {
        return pelicula.genero === genero.animacion;
    }).length

    ui.mostrarCantidadPeliculasHTML(cantidadAnimacion,totalAnimacion )
    const cantidadAccion = listaPeliculas.filter( pelicula => {
        return pelicula.genero === genero.accion;
    }).length
    ui.mostrarCantidadPeliculasHTML(cantidadAccion, totalAccion)


}

function filtrarPelicula(filtro){
    const peliculas = listaPeliculas.filter( pelicula => {
        return pelicula.genero === filtro;
    })
    const resultadoFiltro = document.querySelector('.resultadoFiltro');
    resultadoFiltro.classList.add('display-block');
    
    const bloquePeliculas = document.querySelector('.peliculas');
    bloquePeliculas.classList.add('display-none')

    const contenedorFiltros = document.querySelector('.contenedor-filtros');
    ui.limpiarHTML(contenedorFiltros);
    ui.mostrarPeliculasHTML(peliculas,contenedorFiltros);

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


// Funcion que muestra Si hay usuario logueado
function mostrarUsuarioLogueado(){
    const usuarioLogueado = JSON.parse(localStorage.getItem('UsuarioActual'));
    console.log(usuarioLogueado);

    if (usuarioLogueado !== null) {
        const btnIngresar = document.querySelector('.btn-ingresar');
        btnIngresar.classList.add('display-none');
        
        const usuario = document.querySelector('.usuario');
        const menuSesion = document.querySelector('.menu-sesion');
        menuSesion.classList.remove('display-none');
        menuSesion.classList.add('display-block');
    
        console.log(usuario)
        usuario.innerHTML = 
        `
        <span class="material-icons">
            account_circle
        </span>
        ${usuarioLogueado}
        `
    }
}

function cerrarSesion() {
    localStorage.removeItem('UsuarioActual');
    const menuSesion = document.querySelector('.menu-sesion');
    menuSesion.classList.remove('display-block');
    menuSesion.classList.add('display-none');

    const btnIngresar = document.querySelector('.btn-ingresar');
    btnIngresar.classList.remove('display-none');

    setTimeout(() => {
        window.location = "./index.html"
    }, 1000);
}