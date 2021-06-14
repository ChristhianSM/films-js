import { obtenerRepartoPelicula,obtenerPostersPelicula, obtenerRecomendacionesPelicula, obtenerInformacionActor, obtenerPeliculas, obtenerPeliculasDondeActuo } from "../api.js";

let listaReparto = [];



document.addEventListener('DOMContentLoaded', async () => {
    const parametrosURL = new URLSearchParams(document.location.search);
    const idPelicula = (parametrosURL.get('id'));

    const reparto = await obtenerRepartoPelicula(idPelicula);
    const posters = await obtenerPostersPelicula(idPelicula);
    const recomendaciones = await obtenerRecomendacionesPelicula(idPelicula);

    console.log(reparto)

    reparto.cast.forEach( persona => {
        if (persona.profile_path !== null ) {
            listaReparto.push(persona)
        }
    })

    mostrarSliderReparto(listaReparto);
    mostrarSliderPosters(posters);
    mostrarSliderFondos(posters);
    mosstrarSliderRecomendaciones(recomendaciones);

    var swiper = new Swiper(".mySwiper", {
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
          <div class = "card-reparto" data-id = ${persona.id}>
            <a href="#" class="actor" data-bs-toggle="modal" data-bs-target="#exampleModal" >
              <img src = "https://image.tmdb.org/t/p/w500/${persona.profile_path}">
              <div class = "informacion-reparto">
                  <p> ${persona.name}</p>
                  <p> ${persona.character}</p>
              </div>
            </a>
          </div>
        `
        swipperWrapper.appendChild(swiperSlide)
    })  

    actorSeleccionado();

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
          <a href = "./nombre-pelicula.html?id=${recomendacion.id}">
            <img src = "https://image.tmdb.org/t/p/w500/${recomendacion.backdrop_path}">
            <div class = "informacion-recomendacion">
              <p class = "titulo"> ${recomendacion.title}</p>
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

function actorSeleccionado() {
  const actores = document.querySelectorAll('.actor');
  actores.forEach(actor => {
    actor.addEventListener('click', (e)=> {
      let idActorSeleccionado
      if (e.target.src) {
        idActorSeleccionado = parseInt(e.target.parentElement.parentElement.dataset.id);
        console.log(idActorSeleccionado)
      }else{
        idActorSeleccionado = parseInt(e.target.parentElement.parentElement.parentElement.dataset.id);
        console.log(idActorSeleccionado)
      }
      mostrarInformacionActor(idActorSeleccionado)
    })
  })
}

async function mostrarInformacionActor(id){
  const informacionActor = await obtenerInformacionActor(id);
  const {biography,birthday,homepage, known_for_department,name, place_of_birth, profile_path, gender} = informacionActor;

  /* Extraemos peliculas donde actuo */
  const informacionPeliculas = await obtenerPeliculasDondeActuo(id);
  let listaPeliculasMasVotadas = []
  informacionPeliculas.cast.forEach( pelicula => {
    if (pelicula.vote_average > 1 && pelicula.poster_path !== null) {
      listaPeliculasMasVotadas.push(pelicula)
    }
  })

  let generoActor = "Hombre";
  let palabra = "o"
  if (gender === 1) {
    generoActor = "Mujer";
    palabra = "a"
  }

  /* Seleccionamos el modal */
  const modalTitleActor = document.querySelector('.modal-title-actor');
  modalTitleActor.textContent = name
  const modalActor = document.querySelector('.modal-actor');
  modalActor.innerHTML = 
    `
      <div class = "datos-personales">
        <img src = "https://image.tmdb.org/t/p/w500/${profile_path}">
        <div class = "datos">
           <h2>Informacion Personales</h2>
           <div class="grupo">
            <h3 class="">Conocid${palabra} por : </h3>
            <p>${known_for_department}</p>
           </div>
           <div class="grupo">
            <h3 class="">Sexo : </h3>
            <p>${generoActor}</p>
           </div>
           <div class="grupo">
            <h3 class="">Fecha de nacimiento : </h3>
            <p>${birthday}</p>
           </div>
           <div class="grupo">
            <h3 class="">Lugar de Nacimiento : </h3>
            <p>${place_of_birth}</p>
           </div>
        </div>
      </div>
      <div class ="biografia">
        <h2>Biografia</h2>
        <p class = "palabras-biografia"> ${biography}</p>
        <a class="mostrar-mas display-none"> Mostrar mas ..</a>
        
        <div class = "peliculas-donde-actua">
          <h2> Conocid${palabra} por actuar en :</h2>
          <div class = "contenedor-peliculas-conocidas"></div>
        </div>
      </div>
    `
    mostrarMasDescripcionActor(biography);
    mostrarPeliculasConocidasPorActor(listaPeliculasMasVotadas);
}

function mostrarMasDescripcionActor(biografia){

    if (biografia.length >= 909) {
      const mostrarMas = document.querySelector('.mostrar-mas');
      mostrarMas.classList.remove('display-none')
      mostrarMas.addEventListener('click', ()=> {
        const palabrasBiografia = document.querySelector('.palabras-biografia');
        palabrasBiografia.style.height = "auto";
        mostrarMas.textContent = "";
      })
    }else if (biografia.length === 0) {
      const palabrasBiografia = document.querySelector('.palabras-biografia');
      // palabrasBiografia.style.height = "auto";
      palabrasBiografia.textContent = "No hay biografia para mostrar"
    }else{
      const mostrarMas = document.querySelector('.mostrar-mas');
      mostrarMas.classList.add('display-none')
    }
}

function mostrarPeliculasConocidasPorActor(listaPeliculasMasVotadas){
  console.log(listaPeliculasMasVotadas);
  
  const swipperContainer = document.createElement('div');
  swipperContainer.classList.add('swiper-container', 'swipper-peliculas-conocidas')

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper')

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination');

  swipperContainer.appendChild(swiperWrapper);
  swipperContainer.appendChild(swiperPagination);

  console.log(swipperContainer)

  listaPeliculasMasVotadas.forEach( pelicula => {
      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');

      swiperSlide.innerHTML = `
        <div class = "card-pelicula-conocida">
          <a href = "./nombre-pelicula.html?id=${pelicula.id}">
            <img src = "https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
              <p>${pelicula.title}</p>
          </a> 
        </div>
      `
      swiperWrapper.appendChild(swiperSlide);
  })
  
  const contenedorPeliculasConocidas = document.querySelector('.contenedor-peliculas-conocidas');
  contenedorPeliculasConocidas.appendChild(swipperContainer);

  var swiper = new Swiper(".swipper-peliculas-conocidas", {
    slidesPerView: 3,
    spaceBetween: 10,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    });

  
}