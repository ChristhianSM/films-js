import {consultandoBusquedaPorPalabra,
    consultandoPeliculasPorGeneros,
    obtenerPeliculasEstrenos,
    obtenerPeliculasPaginacion,
    obtenerPeliculasPaginacionFiltro,
    obtenerPeliculasPorFechas,
    obtenerPeliculasPorIdioma,
    obtenerPeliculasYearActual,
    obtenerSeries
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

export function spinner(){
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-circle');
    divSpinner.innerHTML = 
    `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `
    return divSpinner;
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

/* ------------------Series, Estrenos, peliculas 2021 ------------------------*/
export async function buscarSeries(){
    const listadoSeries = [];
    const series = await obtenerSeries();

    const {total_pages, results} = series
    console.log(results)

    results.forEach( serie => {
        const {id, genre_ids, original_name,first_air_date,  overview, poster_path,vote_average, original_language} = serie;

        const newPelicula = new Pelicula(id, original_name, genre_ids, first_air_date, overview, poster_path,vote_average, original_language, true);
        listadoSeries.push(newPelicula);
    });

    const resultadoFiltro = document.querySelector('.resultadoFiltro');
    const contenedorFiltros = document.querySelector('.contenedor-filtros');
    resultadoFiltro.classList.remove('display-none');
    resultadoFiltro.classList.add('display-block');
    
    const bloquePeliculas = document.querySelector('.peliculas');
    bloquePeliculas.classList.add('display-none')

    ui.limpiarHTML(contenedorFiltros);
    ui.mostrarSeriesHtml(listadoSeries, contenedorFiltros);
    crearPaginacionSeries(total_pages)
}

export async function buscarPeliculasYearActual(){
    const listadoPeliculas2021 = [];
    const yearActual = new Date().getFullYear();
    
    const peliculas2021 = await obtenerPeliculasYearActual(yearActual);

    const {total_pages, results} = peliculas2021

    results.forEach( pelicula => {
        const {id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language} = pelicula;

        const newPelicula = new Pelicula(id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language);
        listadoPeliculas2021.push(newPelicula);
    });

    const resultadoFiltro = document.querySelector('.resultadoFiltro');
    const contenedorFiltros = document.querySelector('.contenedor-filtros');
    resultadoFiltro.classList.remove('display-none');
    resultadoFiltro.classList.add('display-block');
    
    const bloquePeliculas = document.querySelector('.peliculas');
    bloquePeliculas.classList.add('display-none')

    ui.limpiarHTML(contenedorFiltros);
    ui.mostrarPeliculasHTML(listadoPeliculas2021, contenedorFiltros);
    crearPaginacionPeliculas2021(yearActual,total_pages)
}

export async function buscarPeliculasEstreno(){
    const listadoPeliculasEstreno = [];
    const fecha = dayjs().format('YYYY-MM-DD')
    const fechaEstreno = dayjs(fecha).subtract(30, 'day').format('YYYY-MM-DD');

    const fechaActual = dayjs().format('YYYY-MM-DD');
    
    const buscarPeliculasEstreno = await obtenerPeliculasEstrenos(fechaEstreno, fechaActual);
    const {total_pages, results} = buscarPeliculasEstreno

    results.forEach( pelicula => {
        const {id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language} = pelicula;

        const newPelicula = new Pelicula(id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language);
        listadoPeliculasEstreno.push(newPelicula);
    });

    const resultadoFiltro = document.querySelector('.resultadoFiltro');
    const contenedorFiltros = document.querySelector('.contenedor-filtros');
    resultadoFiltro.classList.remove('display-none');
    resultadoFiltro.classList.add('display-block');
    
    const bloquePeliculas = document.querySelector('.peliculas');
    bloquePeliculas.classList.add('display-none')

    ui.limpiarHTML(contenedorFiltros);
    ui.mostrarPeliculasHTML(listadoPeliculasEstreno, contenedorFiltros);
    crearPaginacionPeliculasEstreno(fechaEstreno, fechaActual,total_pages)
}

/* Funcion que realiza el recorrido de un arreglo de peliculas y las series y genera un nuevo objeto */
export function recorrerArreglo(datos, arregloNuevo){
    const contenedorFiltros = document.querySelector('.contenedor-filtros');
    datos.forEach( pelicula => {
        const {id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language, media_type, original_name} = pelicula;

        let esSerie =  false, newPelicula;
        if (media_type === "tv" && poster_path !== null) {
            console.log("Es serie")
            esSerie = true;
            newPelicula = new Pelicula(id, original_name, genre_ids, release_date, overview, poster_path,vote_average, original_language, esSerie);
            arregloNuevo.push(newPelicula);
        }else if(media_type === "movie" && poster_path !== null){
            console.log("Es pelicula")
            newPelicula = new Pelicula(id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language, esSerie);
            arregloNuevo.push(newPelicula);
        }else if(media_type === undefined && poster_path !== null){
            newPelicula = new Pelicula(id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language, esSerie);
            arregloNuevo.push(newPelicula);
        }

        console.log(arregloNuevo)

        const resultadoFiltro = document.querySelector('.resultadoFiltro');
        resultadoFiltro.classList.add('display-block');
        
        const bloquePeliculas = document.querySelector('.peliculas');
        bloquePeliculas.classList.add('display-none')
        
    })

    arregloNuevo.sort( function (a, b) {
        if (a.puntuacion < b.puntuacion) {
            return 1;
          }
          if (a.puntuacion > b.puntuacion) {
            return -1;
          }
          // a must be equal to b
          return 0;
    })

    ui.limpiarHTML(contenedorFiltros);
    ui.mostrarPeliculasHTML(arregloNuevo,contenedorFiltros);
}

export function recorrerArregloSeries(datos, arregloNuevo){

    const contenedorFiltros = document.querySelector('.contenedor-filtros');

    datos.forEach( pelicula => {
        const {id, original_name, genre_ids, first_air_date, overview, poster_path,vote_average, original_language} = pelicula;

        const newPelicula = new Pelicula(id, original_name, genre_ids, first_air_date, overview, poster_path,vote_average, original_language);
        arregloNuevo.push(newPelicula);
        
        const resultadoFiltro = document.querySelector('.resultadoFiltro');
        resultadoFiltro.classList.add('display-block');
        
        const bloquePeliculas = document.querySelector('.peliculas');
        bloquePeliculas.classList.add('display-none')
        
    })

    arregloNuevo.sort( function (a, b) {
        if (a.puntuacion < b.puntuacion) {
            return 1;
          }
          if (a.puntuacion > b.puntuacion) {
            return -1;
          }
          // a must be equal to b
          return 0;
    })

    ui.limpiarHTML(contenedorFiltros);
    ui.mostrarPeliculasHTML(arregloNuevo,contenedorFiltros);
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

export async function crearPaginacionSeries(total_pages){
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
            const series = await obtenerSeries(i);
            recorrerArregloSeries(series.results, peliculasPorPagina);
        }
        contenedorPaginacion.appendChild(boton);  
    }
}

export async function crearPaginacionPeliculasEstreno(fechaEstreno, fechaActual, total_pages){
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
            const peliculasEstreno = await obtenerPeliculasEstrenos(fechaEstreno,fechaActual,i);
            recorrerArreglo(peliculasEstreno.results, peliculasPorPagina);
        }
        contenedorPaginacion.appendChild(boton);  
    }
}

export async function crearPaginacionPeliculas2021(yearActual, total_pages){
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
            const peliculas2021 = await obtenerPeliculasYearActual(yearActual,i);
            recorrerArreglo(peliculas2021.results, peliculasPorPagina);
        }
        contenedorPaginacion.appendChild(boton);  
    }
}
