import { obtenerRepartoPelicula } from "../api.js";

let listaReparto = [];

document.addEventListener('DOMContentLoaded', async () => {
    const parametrosURL = new URLSearchParams(document.location.search);
    const idPelicula = (parametrosURL.get('id'));
    const reparto = await obtenerRepartoPelicula(idPelicula);

    reparto.cast.forEach( persona => {
        if (persona.profile_path !== null ) {
            listaReparto.push(persona)
        }
    })

    console.log(listaReparto)

    mostrarSliderReparto(listaReparto)

    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      });
})


function mostrarSliderReparto(listaReparto) {
    console.log(listaReparto)
    const swipperWrapper = document.querySelector('.swiper-wrapper');

    listaReparto.forEach( persona => {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');

        const img = document.createElement('IMG');
        img.src = `https://image.tmdb.org/t/p/w500/${persona.profile_path}`;

        const nombre = document.createElement('p');
        nombre.textContent = persona.name;

        const personaje = document.createElement('p');
        personaje.textContent = persona.character;
        
        swiperSlide.appendChild(img);
        swiperSlide.appendChild(nombre);
        swiperSlide.appendChild(personaje);
        swipperWrapper.appendChild(swiperSlide)
    })  
}