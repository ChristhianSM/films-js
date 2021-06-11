const API_KEY = "7e608905ab2997944f984ad29bcc298e";
const URL_BASE = "https://api.themoviedb.org/3";

export async function obtenerPeliculas(){

    const respuesta = await fetch(`${URL_BASE}/movie/now_playing?api_key=${API_KEY}&page=2`);
    const datos = await respuesta.json();
    return datos.results
}

export async function obtenerPeliculasPaginacion(pagina = 1){
    const respuesta = await fetch(`${URL_BASE}/movie/now_playing?api_key=${API_KEY}&page=${pagina}`);
    const datos = await respuesta.json();
    return datos
}

export async function obtenerPeliculasPaginacionFiltro(pagina, query){
    const respuesta = await fetch(`http://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${pagina}&query= ${query}`);
    const datos = await respuesta.json();
    return datos
}

export async function consultandoGeneros(){

    const respuesta = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=7e608905ab2997944f984ad29bcc298e`);
    const datos = await respuesta.json();
    return datos.genres
}

export async function consultandoBusquedaPorPalabra(terminoBusqueda) {
    const respuesta = await fetch(`http://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query= ${terminoBusqueda}`);
    const datos = await respuesta.json();
    return datos
}

export async function consultandoPeliculasPorGeneros(generos, page = 1){
    const respuesta = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${generos}&page=${page}`);
    const datos = await respuesta.json();
    return datos
}

export async function obtenerPeliculasPorFechas(fechaInicial, fechaFinal, page = 1){
    const respuesta = await fetch(`${URL_BASE}/discover/movie?api_key=${API_KEY}&primary_release_date.lte=${fechaFinal}&primary_release_date.gte=${fechaInicial}&page=${page}`);
    const datos = await respuesta.json();
    return datos
}

export async function obtenerIdiomasAPI(){
    const respuesta = await fetch(`${URL_BASE}/configuration/languages?api_key=${API_KEY}`);
    const datos = await respuesta.json();
    return datos
}

export async function obtenerPeliculasPorIdioma(idioma, page=1){
    const respuesta = await fetch(`${URL_BASE}/discover/movie?api_key=${API_KEY}&language=${idioma}&page=${page}`);
    const datos = await respuesta.json();
    return datos
}



/* Obtenemos datos de la pelicula */
export async function obtenerDatosPelicula(id){
    const respuesta = await fetch(`${URL_BASE}/movie/${id}?api_key=${API_KEY}`);
    const datos = await respuesta.json();
    return datos
}

export async function obtenerRepartoPelicula(id){
    const respuesta = await fetch(`${URL_BASE}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
    const datos = await respuesta.json();
    return datos
}

export async function obtenerPostersPelicula(id){
    const respuesta = await fetch(`${URL_BASE}/movie/${id}/images?api_key=${API_KEY}`);
    const datos = await respuesta.json();
    return datos
}

export async function obtenerRecomendacionesPelicula(id){
    const respuesta = await fetch(`${URL_BASE}/movie/${id}/recommendations?api_key=${API_KEY}`);
    const datos = await respuesta.json();
    return datos
}
