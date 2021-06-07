import {cerrarSesion, mostrarUsuarioLogueado} from './helpers/helpers.js'
let usuarios, usuarioActual;

/* Variables */
const nombreInput = $('#nombre');
const paisInput = $('#pais');
console.log(paisInput)
const fechaInput = $('#fechaNacimiento');
const descripcionInput = $('#descripcion');

const btnGuardar = $('.btn-guardar');
const btnActualizar = $('.btn-actualizar');
const btnCerrarSesion = $('.cerrar-sesion');

$(document).ready(function () {
    usuarios = JSON.parse(localStorage.getItem('Usuarios'));
    usuarioActual = JSON.parse(localStorage.getItem('UsuarioActual'));
    // console.log(usuarioActual)

    cargarDatosUsuario();

    mostrarUsuarioLogueado();

    $(btnCerrarSesion).click(cerrarSesion);
})

$(btnGuardar).click(function (e) { 
    guardarEdicion();
})

$(btnActualizar).click(function () { 
    actualizarContrasenna();
});

function cargarDatosUsuario() {
    const usuario = usuarios.filter(user => {
        if (user.idUser === usuarioActual.idUser) {
            return user;
        }
    });
    
    nombreInput.val(usuario[0].nombre);
    descripcionInput.val(usuario[0].descripcion);
    paisInput.val(usuario[0].pais) ;
    fechaInput.val(usuario[0].fecha); 
}

function guardarEdicion(){
    usuarioActual.descripcion = descripcionInput.val();
    usuarioActual.nombre = nombreInput.val();
    usuarioActual.pais = paisInput.val();
    usuarioActual.fecha = fechaInput.val();

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
    const contrasennaActual = $('#contrasenna-actual').val();
    const nuevaContrasenna = $('#nueva-contrasenna').val();

    const usuario = usuarios.filter(user => {
        if (user.idUser === usuarioActual.idUser) {
            return user;
        }
    });

    console.log(usuario)
    if (contrasennaActual === usuario[0].password) {
        usuario[0].password = nuevaContrasenna;

        usuarios = usuarios.map( user => {
            if (user.idUser === usuarioActual.idUser) {
                return usuario[0];
            }else{
                return user;
            }
        })

        localStorage.setItem('Usuarios', JSON.stringify(usuarios));
        mostrarAlertaExito('Contraseña cambiada satisfactoriamente :D')
    }else{
        mostrarAlerta('Contraseña Actual incorrecta', 'error', 'bottom-end');
        return;
    }
}