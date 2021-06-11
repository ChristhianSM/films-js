import {obtenerDatosPelicula, obtenerRepartoPelicula} from './api.js'
import { mostrarUsuarioLogueado } from './helpers/helpers.js';

/* Eventos */
const fondos = document.querySelector('.pagina-fondos');
const poster = document.querySelector('.pagina-posters');

eventosListener();
function eventosListener() {
    fondos.addEventListener('click', cambiarPagina);
    poster.addEventListener('click', cambiarPagina);
}

document.addEventListener('DOMContentLoaded', async ()=> {
    mostrarUsuarioLogueado();

    const parametrosURL = new URLSearchParams(document.location.search);
    const idPelicula = (parametrosURL.get('id'));

    const pelicula = await obtenerDatosPelicula(idPelicula);
    const reparto = await obtenerRepartoPelicula(idPelicula);

    $('.contenedor-pelicula').prepend( mostrarInformacionPelicula(pelicula,reparto)); 
    animaciones();
    
})

function mostrarInformacionPelicula(pelicula,reparto){
    const {genres, homepage, original_language, original_title, overview,poster_path,release_date,vote_average, vote_count, tagline} = pelicula;

    const yearPelicula = new Date(release_date);

    let listaGenero = "";
    genres.forEach(genero => {
        listaGenero += ` - ${genero.name}\n\t`
    });

    let maquillaje = "", escritores = "", editores = "", directores = "",productores = ""
    reparto.crew.forEach(persona=> {
        switch (persona.known_for_department) {
            case "Costume & Make-Up":
                maquillaje += `- ${persona.name} \n\n` 
                break;
            case "Writing":
                escritores += `- ${persona.name} \n\n` 
                break;
            case "Editing":
                editores += `- ${persona.name} \n\n` 
                break;
            case "Directing":
                directores += `- ${persona.name} \n\n` 
                break;
            case "Production":
                productores += `- ${persona.name} \n\n` 
                break;
            default:
                break;
        }
    })

    return `
            <img src = "https://image.tmdb.org/t/p/w500/${poster_path}">
            <div class="informacion">
                <h2 class="titulo-pelicula">${original_title} <span class="year">(${yearPelicula.getFullYear()})</span></h2>
                <div class="subtitulo-informacion">
                    <p class="fecha-pelicula">${release_date}</p>
                    <p class="generos">${listaGenero}</p>
                    <p class="duracion"></p>
                </div>
                <div class="vista-general">
                    <h3> Vista General</h3>
                    <p class="tagline">${tagline}</p>
                    <p class="descripcion">${overview}</p>
                </div>
                <div class = "ficha-tecnica">
                    <div>
                        <h3>Directores : </h3>
                        <p>${directores}</p>
                    </div>
                    <div>
                        <h3>Escritores : </h3>
                        <p>${escritores}</p>
                    </div>
                    <div>
                        <h3>Editores : </h3>
                        <p>${editores}</p>
                    </div>
                    <div>
                        <h3>Productores : </h3>
                        <p>${productores}</p>
                    </div>
                    <div>
                        <h3>Maquillaje : </h3>
                        <p>${maquillaje}</p>
                    </div>
                </div>
            </div> 
    `
}

function cambiarPagina(e){
    if (e.target.classList.contains('pagina-fondos')) {
        document.querySelector('.swiper-posters').classList.add('display-none');
        document.querySelector('.swipper-backdrops').classList.remove('display-none');
        document.querySelector('.swipper-backdrops').classList.add('display-block');
    }else{ 
        document.querySelector('.swiper-posters').classList.remove('display-none');
        document.querySelector('.swipper-backdrops').classList.add('display-none');
        document.querySelector('.swipper-backdrops').classList.remove('display-block');
    }
}

function animaciones() {

    $('.contenedor-pelicula').animate({
        padding : '5rem 0 5rem 5rem',
    }, 3000) 

    $('.contenedor-pelicula').css({
        borderBottom : '2px solid'
    }, 3000) 

    $('.titulo-pelicula').animate({
        'font-size': '4.5rem',
    }, 2000, function() {
        $('p').animate( {
            fontSize : '1.7rem'
        }, 2000)

        $('h3').animate({
            fontSize : '2rem'
        })
    })

    $('.contenedor-pelicula img').animate({
        boxShadow: '5px 8px',
        borderRadius: '10%',
    }, 2000).click( function() {
        $('.contenedor-pelicula img').animate({
            borderRadius: '50%',
        }, 1000)
    })

    $('.mostrar-reparto')
        .css({
            padding: '1rem',
            fontSize: '1.5rem'
        })
        .click( function() {
        $('.reparto').fadeToggle();
    });

}
