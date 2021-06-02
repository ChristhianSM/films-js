import {cerrarSesion, filtrarPorBusqueda, mostrarUsuarioLogueado} from "./helpers/helpers.js";

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
document.addEventListener('DOMContentLoaded',  async() => {
    // mostrarCantidadPeliculas();
    mostrarUsuarioLogueado();
    await generarGeneros();
    generarAnnosLanzamiento();
    ultimasPeliculasActualizadas();
})

function mostrarPeliculasActualizadas(){
    ui.mostrarPeliculasHTML(listaPeliculas, resultadoPeliculasActualizadas);
}

async function generarGeneros() {
    const menuGenero = document.querySelector('.menu-genero');
    const contenedorGenero = document.querySelector('.contenedor-generos');
    
    const generos = await consultandoGeneros();
    console.log(generos)

    for (let i = 0; i < generos.length; i++) {

        const  li = document.createElement('LI');
        const a = document.createElement('A');
        a.href = '#'
        a.classList.add(`btn${generos[i].name.replace(/\s+/g, '')}`);
        a.innerHTML = 
            `&#9205;${generos[i].name}
            <span class="total${generos[i].name}"></span>
            `
        a.onclick = (e) => {
            /* Agregar activo al link que se apreto click */
            const claseActivo = document.querySelector('.activo');
            const claseActivoYear = document.querySelector('.activo-year');
            if (claseActivo ) {
                claseActivo.classList.remove('activo');
            }else if (claseActivoYear) {
                claseActivoYear.classList.remove('activo-year');
            }
            e.target.classList.add('activo');
            filtrarPelicula(generos[i])
        };

        li.appendChild(a);
        
        menuGenero.appendChild(li);
    }
    for (let i = 0; i < generos.length; i++) {

        const  li = document.createElement('LI');
        const a = document.createElement('A');
        a.href = '#'
        a.classList.add(`btn${generos[i].name.replace(/\s+/g, '')}`);
        a.innerHTML = 
            `&#9205;${generos[i].name}
            <span class="total${generos[i].name}"></span>
            `
        a.onclick = (e) => {
            /* Agregar activo al link que se apreto click */
            const claseActivo = document.querySelector('.activo');
            const claseActivoYear = document.querySelector('.activo-year');
            if (claseActivo ) {
                claseActivo.classList.remove('activo');
            }else if (claseActivoYear) {
                claseActivoYear.classList.remove('activo-year');
            }
            e.target.classList.add('activo');
            filtrarPelicula(generos[i])
        };

        li.appendChild(a);
        
        contenedorGenero.appendChild(li);
    }
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
    console.log(filtro)
    console.log(listaPeliculas)
    let contenedorPeliculasFiltro = [];
    const peliculas = listaPeliculas.filter( pelicula => {
        for (let i = 0; i < pelicula.genero.length; i++) {
            if (pelicula.genero[i]=== filtro.id) {
                contenedorPeliculasFiltro = [...contenedorPeliculasFiltro, pelicula];
                return contenedorPeliculasFiltro
            }
        }
    })

    console.log(peliculas)
    const resultadoFiltro = document.querySelector('.resultadoFiltro');
    resultadoFiltro.classList.add('display-block');
    
    const bloquePeliculas = document.querySelector('.peliculas');
    bloquePeliculas.classList.add('display-none')

    const contenedorFiltros = document.querySelector('.contenedor-filtros');
    ui.limpiarHTML(contenedorFiltros);
    ui.mostrarPeliculasHTML(peliculas,contenedorFiltros);

}



