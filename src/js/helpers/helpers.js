import {consultandoBusquedaPorPalabra,
    consultandoPeliculasPorGeneros,
    obtenerPeliculasPaginacion,
    obtenerPeliculasPaginacionFiltro,
    obtenerPeliculasPorFechas,
    obtenerPeliculasPorIdioma
} from '../api.js'

const ui = new UI();

// Funcion que muestra Si hay usuario logueado
export function mostrarUsuarioLogueado(){
    const usuarioLogueado = JSON.parse(localStorage.getItem('UsuarioActual'))|| null;

    if (usuarioLogueado !== null) {
        const btnIngresar = document.querySelector('.btn-ingresar');
        btnIngresar.classList.add('display-none');
        
        const usuario = document.querySelector('.usuario');
        const menuSesion = document.querySelector('.menu-sesion');
        menuSesion.classList.remove('display-none');
        menuSesion.classList.add('display-block');

        usuario.innerHTML = 
        `
        <span class="material-icons">
            account_circle
        </span>
        ${usuarioLogueado.username}
        `
    }
}

export function cerrarSesion() {
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

export async function mostrarGenerosHtml(generos, localizacion) {
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
            /* Seteamos la fecha para solo filtrar por genero */
            document.querySelector('#fecha-inicial').value = "";
            document.querySelector('#fecha-final').value = "";

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
        
        localizacion.appendChild(li);
    }
}

export async function filtrarPorBusqueda(termino){
    /* Arreglo que contendra las peliculas filtradas */
    const peliculasPorBusqueda = [];
    
    const contenedorFiltros = document.querySelector('.contenedor-filtros');
    
    if (termino === "") {
        const resultadoFiltro = document.querySelector('.resultadoFiltro');
        const resultadoPeliculas = document.querySelector('.peliculas');

        resultadoFiltro.classList.remove('display-block');
        resultadoPeliculas.classList.remove('display-none');

        const datos = await obtenerPeliculasPaginacion();
        const {total_pages} = datos;

        crearPaginacion( total_pages);

        return;
    }

    const texto = termino.toLowerCase();
    const datos = await consultandoBusquedaPorPalabra(texto)|| [];

    const {results,total_pages } = datos /* Extraemos los resultados y el total de paginas para realizar la paginacion */
    
    if (results.length > 0) {
        /* Buscamos si hay una alerta previa  */
        const alertaPrevia = document.querySelector('.alerta');
        if (alertaPrevia) {
            alertaPrevia.remove();
        }
        
        recorrerArreglo(results, peliculasPorBusqueda);
        crearPaginacionBusqueda(termino, total_pages)

    }else{
        ui.limpiarHTML(contenedorFiltros);
        const resultadoFiltro = document.querySelector('.resultadoFiltro');
        ui.mostrarMensajes('Pelicula no encontrada, ingrese otro termino de busqueda', 'error' , resultadoFiltro);
    }
}

async function filtrarPelicula(filtro){

    const peliculasPorGenero = [];
    // const contenedorFiltros = document.querySelector('.contenedor-filtros');

    const datos = await consultandoPeliculasPorGeneros(filtro.id);
    const {results, total_pages} = datos;
    recorrerArreglo(results, peliculasPorGenero);
    crearPaginacionFiltro(total_pages, filtro);
}

/* Funcion que realiza el recorrido de un arreglo de peliculas y genera un nuevo objeto */
export function recorrerArreglo(datos, arregloNuevo){

    const contenedorFiltros = document.querySelector('.contenedor-filtros');

    datos.forEach( pelicula => {
        const {id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language} = pelicula;

        const newPelicula = new Pelicula(id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language);
        arregloNuevo.push(newPelicula);
        
        const resultadoFiltro = document.querySelector('.resultadoFiltro');
        resultadoFiltro.classList.add('display-block');
        
        const bloquePeliculas = document.querySelector('.peliculas');
        bloquePeliculas.classList.add('display-none')
        
        ui.limpiarHTML(contenedorFiltros);
        ui.mostrarPeliculasHTML(arregloNuevo,contenedorFiltros);
    })
}

export async function crearPaginacion(total_pages){
    const contenedorPaginacion = document.querySelector('.contenedor-paginacion');
    contenedorPaginacion.innerHTML = "";

    for (let i = 1; i <= total_pages; i++) {
        const boton = document.createElement('a');
        boton.href = "#"
        boton.dataset.pagina = i;
        boton.textContent = i;
        boton.classList.add('boton-paginador');

        boton.onclick = async()=> {
            /* Mostrar en que pagina esta el usuario */
            const activo = document.querySelector('.boton-paginador.activo');
            if (activo) {
                activo.classList.remove('activo');
            }
            boton.classList.add('activo')

            let peliculasPorPagina = [];
            const peliculas = await obtenerPeliculasPaginacion(i);
            recorrerArreglo(peliculas.results, peliculasPorPagina);
        }
        contenedorPaginacion.appendChild(boton);  
    }
}

export async function crearPaginacionBusqueda(query, total_pages){
    const contenedorPaginacion = document.querySelector('.contenedor-paginacion');
    contenedorPaginacion.innerHTML = "";

    for (let i = 1; i <= total_pages; i++) {
        const boton = document.createElement('a');
        boton.href = "#"
        boton.dataset.pagina = i;
        boton.textContent = i;
        boton.classList.add('boton-paginador');
        boton.onclick = async()=> {
            const activo = document.querySelector('.boton-paginador.activo');
            if (activo) {
                activo.classList.remove('activo');
            }
            boton.classList.add('activo')
            
            let peliculasPorPagina = [];
            const peliculas = await obtenerPeliculasPaginacionFiltro(i,query);
            console.log(peliculas)
            recorrerArreglo(peliculas.results, peliculasPorPagina);
        }
        contenedorPaginacion.appendChild(boton);  
    }
}

export async function crearPaginacionFiltro(total_pages, filtro){
    const contenedorPaginacion = document.querySelector('.contenedor-paginacion');
    contenedorPaginacion.innerHTML = "";

    for (let i = 1; i <= total_pages; i++) {
        const boton = document.createElement('a');
        boton.href = "#"
        boton.dataset.pagina = i;
        boton.textContent = i;
        boton.classList.add('boton-paginador');
        
        boton.onclick = async()=> {
            const activo = document.querySelector('.boton-paginador.activo');
            if (activo) {
                activo.classList.remove('activo');
            }
            boton.classList.add('activo')

            let peliculasPorPagina = [];
            const peliculas = await consultandoPeliculasPorGeneros(filtro.id,i);
            recorrerArreglo(peliculas.results, peliculasPorPagina);
        }
        contenedorPaginacion.appendChild(boton);  
    }
}

export async function crearPaginacionFecha(fechaInicial, fechaFinal,total_pages){
    const contenedorPaginacion = document.querySelector('.contenedor-paginacion');
    contenedorPaginacion.innerHTML = "";

    for (let i = 1; i <= total_pages; i++) {
        const boton = document.createElement('a');
        boton.href = "#"
        boton.dataset.pagina = i;
        boton.textContent = i;
        boton.classList.add('boton-paginador');
        
        boton.onclick = async()=> {
            const activo = document.querySelector('.boton-paginador.activo');
            if (activo) {
                activo.classList.remove('activo');
            }
            boton.classList.add('activo')

            let peliculasPorPagina = [];
            const peliculas = await obtenerPeliculasPorFechas(fechaInicial, fechaFinal, i);
            recorrerArreglo(peliculas.results, peliculasPorPagina);
        }
        contenedorPaginacion.appendChild(boton);  
    }
}

export async function crearPaginacionIdiomas(idioma ,total_pages){
    const contenedorPaginacion = document.querySelector('.contenedor-paginacion');
    contenedorPaginacion.innerHTML = "";

    for (let i = 1; i <= total_pages; i++) {
        const boton = document.createElement('a');
        boton.href = "#"
        boton.dataset.pagina = i;
        boton.textContent = i;
        boton.classList.add('boton-paginador');
        
        boton.onclick = async()=> {
            const activo = document.querySelector('.boton-paginador.activo');
            if (activo) {
                activo.classList.remove('activo');
            }
            boton.classList.add('activo')

            let peliculasPorPagina = [];
            const peliculas = await obtenerPeliculasPorIdioma(idioma,i);
            recorrerArreglo(peliculas.results, peliculasPorPagina);
        }
        contenedorPaginacion.appendChild(boton);  
    }
}
