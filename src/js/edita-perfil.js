let usuarios, usuarioActual;

/* Variables */
const nombreInput = document.querySelector('#nombre');
const paisInput = document.querySelector('#pais');
const fechaInput = document.querySelector('#fechaNacimiento');
const descripcionInput = document.querySelector('#descripcion');

const btnGuardar = document.querySelector('.btn-guardar');
const btnActualizar = document.querySelector('.btn-actualizar');

document.addEventListener('DOMContentLoaded', () => {
    usuarios = JSON.parse(localStorage.getItem('Usuarios'));
    usuarioActual = JSON.parse(localStorage.getItem('UsuarioActual'));

    cargarDatosUsuario();

    mostrarUsuarioLogueado();
})

btnGuardar.addEventListener('click', () => {
    guardarEdicion();
})

btnActualizar.addEventListener('click', () => {
    actualizarContrasenna();
})


function cargarDatosUsuario() {
    const usuario = usuarios.filter(user => {
        if (user.idUser === usuarioActual.idUser) {
            return user;
        }
    });
    
    nombreInput.value = usuario[0].nombre;
    descripcionInput.value = usuario[0].descripcion;
    paisInput.value = usuario[0].pais;
    fechaInput.value = usuario[0].fecha;
}

function guardarEdicion(){
    usuarioActual.descripcion = descripcionInput.value;
    usuarioActual.nombre = nombreInput.value;
    usuarioActual.pais = paisInput.value;
    usuarioActual.fecha = fechaInput.value;

    const usuariosNuevos = usuarios.map( user => {
        if (user.idUser === usuarioActual.idUser) {
            return usuarioActual;
        }else{
            return user;
        }
    })

    mostrarAlertaExito('Datos guardados satisfactoriamente')
    localStorage.setItem('Usuarios', JSON.stringify(usuariosNuevos));
}

function actualizarContrasenna(){
    const contrasennaActual = document.querySelector('#contrasenna-actual').value;
    const nuevaContrasenna = document.querySelector('#nueva-contrasenna').value;
    const usuario = usuarios.filter(user => {
        if (user.idUser === usuarioActual.idUser) {
            return user;
        }
    });
    if (contrasennaActual === usuario[0].password) {
        usuario[0].password = nuevaContrasenna;
        usuarios = usuarios.map( user => {
            if (user.idUser === usuarioActual.idUser) {
                return usuario[0];
            }else{
                return user;
            }
        })
    
        mostrarAlertaExito('Contraseña cambiada satisfactoriamente :D')
    }else{
        mostrarAlerta('Contraseña Actual incorrecta', 'error', 'bottom-end');
        return;
    }
}

// // Funcion que muestra Si hay usuario logueado
// function mostrarUsuarioLogueado(){
//     const usuarioLogueado = JSON.parse(localStorage.getItem('UsuarioActual'))|| null;

//     if (usuarioLogueado !== null) {
//         const btnIngresar = document.querySelector('.btn-ingresar');
//         btnIngresar.classList.add('display-none');
        
//         const usuario = document.querySelector('.usuario');
//         const menuSesion = document.querySelector('.menu-sesion');
//         menuSesion.classList.remove('display-none');
//         menuSesion.classList.add('display-block');
    
//         usuario.innerHTML = 
//         `
//         <span class="material-icons">
//             account_circle
//         </span>
//         ${usuarioLogueado.username}
//         `
//     }
// }

// function cerrarSesion() {
//     localStorage.removeItem('UsuarioActual');
//     const menuSesion = document.querySelector('.menu-sesion');
//     menuSesion.classList.remove('display-block');
//     menuSesion.classList.add('display-none');

//     const btnIngresar = document.querySelector('.btn-ingresar');
//     btnIngresar.classList.remove('display-none');

//     setTimeout(() => {
//         window.location = "./index.html"
//     }, 1000);
// }