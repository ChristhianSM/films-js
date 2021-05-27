var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 20,
    slidesPerGroup: 4,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const ui = new UI();

  document.addEventListener('DOMContentLoaded', () => {
    iniciarCarrouselConImagenes()
  })

  function iniciarCarrouselConImagenes() {
     
      // Seleccionar el contenedor de estreno
      const swiperWrapper = document.querySelector('.swiper-wrapper');
      listaPeliculas.forEach(peli => {
        const {img}  = peli;
  
        const swiperSlide = document.createElement('DIV');
        swiperSlide.classList.add('swiper-slide');
        
        const imagen = document.createElement('IMG');
        imagen.src = img

        swiperSlide.appendChild(imagen)
        swiperWrapper.appendChild(swiperSlide)
      })
  } 