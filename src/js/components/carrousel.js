
import { obtenerPeliculas} from '../api.js'




  document.addEventListener( 'DOMContentLoaded', async function () {

    const listadoPeliculas = [];
      const peliculas = await obtenerPeliculas();
    
      peliculas.forEach( pelicula => {
          const {id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language} = pelicula;

          const newPelicula = new Pelicula(id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language);
          listadoPeliculas.push(newPelicula);
      })


    iniciarCarrouselConImagenes(listadoPeliculas);
    new Splide( '#secondary-slider', {
      fixedWidth : 230,
      height     : 250,
	    perPage: 3,
      gap        : 10,
      rewind     : true,
      cover      : false,
      pagination : false,
      type    : 'loop',
	    autoplay: true,
      breakpoints : {
        '768': {
          fixedWidth: 235,
          height    : 250,
        },
        '600': {
          fixedWidth: 66,
          height    : 40,
        },
        '480': {
          fixedWidth: 200,
          perPage: 1,
          gap    : '1rem',
        },
      }
    }).mount();

    
  } );

  async function iniciarCarrouselConImagenes(listadoPeliculas) {

      const splideList = document.querySelector('.splide__list');

      listadoPeliculas.forEach(peli => {
          const {img}  = peli;

          const li = document.createElement('li');
          li.classList.add('splide__slide')

          const imagen = document.createElement('img');
          imagen.style.height = "100%"
          imagen.src = img

          li.appendChild(imagen);

          splideList.appendChild(li);
      })
  } 
