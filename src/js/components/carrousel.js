
  document.addEventListener( 'DOMContentLoaded', function () {
    iniciarCarrouselConImagenes();
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

  function iniciarCarrouselConImagenes() {

      const splideList = document.querySelector('.splide__list');
      listaPeliculas.forEach(peli => {
          const {img}  = peli;

          const li = document.createElement('li');
          li.classList.add('splide__slide')

          const imagen = document.createElement('img');
          imagen.style.height = "100%"
          imagen.src = img

          li.appendChild(imagen);
          console.log(li)

          splideList.appendChild(li);
      })
  } 
