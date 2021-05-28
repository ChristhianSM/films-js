function mostrarAlerta (mensaje, tipo, posicion) {
    const Toast = Swal.mixin({
        toast: true,
        position: posicion,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },

        customClass: {
            container: 'container-class',
            title: 'title-class',
          },

          showClass: {
            popup: 'animate__animated animate__bounceIn',
          }
      })
      
      Toast.fire({
        icon: tipo,
        title: mensaje
      })
}

function mostrarAlertaExito(mensaje){
    Swal.fire({
        icon: 'success',
        title: mensaje,
        timer: 3000,

        customClass: {
            confirmButton: 'confirmar-class',
        },

        showClass: {
            popup: 'animate__animated animate__fadeInDownBig',
          }
      })
}
