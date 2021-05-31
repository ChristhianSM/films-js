const API_KEY = "7e608905ab2997944f984ad29bcc298e";
const URL_BASE = "https://api.themoviedb.org/3";

let generos;

async function obtenerPeliculas(){

    const respuesta = await fetch(`${URL_BASE}/movie/now_playing?api_key=${API_KEY}`);
    const datos = await respuesta.json();

    return datos.results
}

consultandoGeneros();
async function consultandoGeneros(){

    const respuesta = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=7e608905ab2997944f984ad29bcc298e`);
    const datos = await respuesta.json();
    generos = datos;
    console.log(datos)
    return generos.genres
}

