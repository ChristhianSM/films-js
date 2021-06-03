const API_KEY = "7e608905ab2997944f984ad29bcc298e";
const URL_BASE = "https://api.themoviedb.org/3";

async function obtenerPeliculas(){

    const respuesta = await fetch(`${URL_BASE}/movie/now_playing?api_key=${API_KEY}&page=2`);
    const datos = await respuesta.json();
    return datos.results
}

async function obtenerPeliculasPaginacion(pagina = 1){
    const respuesta = await fetch(`${URL_BASE}/movie/now_playing?api_key=${API_KEY}&page=${pagina}`);
    const datos = await respuesta.json();
    return datos
}

async function obtenerPeliculasPaginacionFiltro(pagina, query){
    const respuesta = await fetch(`http://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${pagina}&query= ${query}`);
    const datos = await respuesta.json();
    return datos
}

async function consultandoGeneros(){

    const respuesta = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=7e608905ab2997944f984ad29bcc298e`);
    const datos = await respuesta.json();
    return datos.genres
}


async function consultandoBusquedaPorPalabra(terminoBusqueda) {
    const respuesta = await fetch(`http://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query= ${terminoBusqueda}`);
    const datos = await respuesta.json();
    return datos
}

async function consultandoPeliculasPorGeneros(generos, page = 1){
    const respuesta = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${generos}&page=${page}`);
    const datos = await respuesta.json();
    return datos
}


async function obtenerPeliculas2(){
    const respuesta = await fetch(`${URL_BASE}/movie/now_playing?api_key=${API_KEY}&page=2`);
    const datos = await respuesta.json();
    return datos
}