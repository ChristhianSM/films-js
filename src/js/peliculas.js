const generos = ['Accion', 'Terror', 'Animacion', 'Aventura', 'Comedia', 'Documental', 'Familia', 'Misterio', 'Romance', 'Historia', 'Suspenso', 'C.Ficcion', 'Drama', 'Infantil', 'Crimen', 'Fantasia', 'Musica', 'Superheroes', 'Guerra', 'Crimen'];

// Variables
const resultadoPeliculasActualizadas = document.querySelector('.contenedor-peliculas-actualizadas');
const buscarPelicula = document.querySelector('.buscarPelicula');

// Boton Cerrar sesion
const btnCerrarSesion = document.querySelector('.cerrar-sesion');

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
document.addEventListener('DOMContentLoaded', () => {
    // mostrarCantidadPeliculas();
    mostrarUsuarioLogueado();
    generarGeneros();
    generarAnnosLanzamiento();
    ultimasPeliculasActualizadas();
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

function generarGeneros() {
    const menuGenero = document.querySelector('.menu-genero');

    generos.forEach( genero => {
        const  li = document.createElement('LI');
        const a = document.createElement('A');
        a.href = '#'
        a.classList.add(`btn${genero}`);
        a.innerHTML = 
            `&#9205;${genero}
            <span class="total${genero}"></span>
            `
        a.onclick = () => {
            filtrarPelicula(genero)
        };

        li.appendChild(a);
        menuGenero.appendChild(li)
    })
    // mostrarCantidadPeliculas();
}

function generarAnnosLanzamiento() {
    const fechaActual = new Date().getFullYear();
    const enlaceAnnos = document.querySelector('.enlace-annos');
    
    for (let i = fechaActual; i > 1990; i--) {
        const a = document.createElement('A');
        a.textContent = i;
        a.href = "#";
        a.onclick = () => {
            filtrarYear(i)
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


