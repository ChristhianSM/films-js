import { obtenerRepartoSerie, obtenerRecomendacionesSerie, obtenerPostersSerie } from "../api.js";

let listaReparto = [];

document.addEventListener('DOMContentLoaded', async () => {
    const parametrosURL = new URLSearchParams(document.location.search);
    const idSerie = (parametrosURL.get('id'));

    const reparto = await obtenerRepartoSerie(idSerie);
    const posters = await obtenerPostersSerie(idSerie);
    const recomendaciones = await obtenerRecomendacionesSerie(idSerie);
    console.log(recomendaciones)

    reparto.cast.forEach( persona => {
        if (persona.profile_path !== null ) {
            listaReparto.push(persona)
        }
    })

    mostrarSliderReparto(listaReparto);
    mostrarSliderPosters(posters);
    mostrarSliderFondos(posters);
    mosstrarSliderRecomendaciones(recomendaciones);

    var swiper = new Swiper(".swiperRepartoSerie", {
      slidesPerView: 5,
      spaceBetween: 30,
      freeMode: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      });

    var swiper = new Swiper(".swiper-posters", {
      slidesPerView: 5,
      spaceBetween: 10,
      freeMode: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      });

    var swiper = new Swiper(".swipper-backdrops", {
      slidesPerView: 5,
      spaceBetween: 10,
      freeMode: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      });
      
    var swiper = new Swiper(".swiper-recomendaciones", {
      slidesPerView: 4,
      spaceBetween: 30,
      freeMode: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      });
})


function mostrarSliderReparto(listaReparto) {
    const swipperWrapper = document.querySelector('.reparto .swiper-wrapper');

    listaReparto.forEach( persona => {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');

        swiperSlide.innerHTML = `
          <div class = "card-reparto">
              <img src = "https://image.tmdb.org/t/p/w500/${persona.profile_path}">
              <div class = "informacion-reparto">
                  <p> ${persona.name}</p>
                  <p> ${persona.character}</p>
              </div>
          </div>
        `
        swipperWrapper.appendChild(swiperSlide)
    })  
}

function mostrarSliderPosters(listaPoster) {
  const swipperWrapper = document.querySelector('.posters .swiper-wrapper');
  listaPoster.posters.forEach( poster => {
      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');

      swiperSlide.innerHTML = `
        <div class = "card-poster">
            <img src = "https://image.tmdb.org/t/p/w500/${poster.file_path}">
        </div>
      `
      swipperWrapper.appendChild(swiperSlide)
  })  
}


function mosstrarSliderRecomendaciones(recomendaciones) {
  const swipperWrapper = document.querySelector('.swiper-recomendaciones .swiper-wrapper');
  recomendaciones.results.forEach( recomendacion => {
      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');

      swiperSlide.innerHTML = `
        <div class = "card-recomendacion">
          <a href = "./nombre-serie.html?id=${recomendacion.id}">
            <img src = "https://image.tmdb.org/t/p/w500/${recomendacion.backdrop_path}">
            <div class = "informacion-recomendacion">
              <p class = "titulo"> ${recomendacion.name}</p>
              <p class = "puntaje"> ${Math.round(recomendacion.vote_average*10)} %</p>
            </div>
          </a>
        </div>
      `
      swipperWrapper.appendChild(swiperSlide)
  })  
}
function mostrarSliderFondos(listaPoster) {
  const swipperWrapper = document.querySelector('.swipper-backdrops .swiper-wrapper');
  listaPoster.backdrops.forEach( poster => {
      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');

      swiperSlide.innerHTML = `
        <div class = "card-fondo">
            <img src = "https://image.tmdb.org/t/p/w500/${poster.file_path}">
        </div>
      `
      swipperWrapper.appendChild(swiperSlide)
  })  
}