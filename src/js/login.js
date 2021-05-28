// Variables globales
let usuarios = [];
let usuarioActual = "";
let idUser = Math.random()*100;

// Variables para interactuar con el login
const login = document.querySelector('.login-box');
const register = document.querySelector('.register-box');

const pagRegistro = document.querySelector('.pag-registro');
const pagIniciarSesion = document.querySelector('.pag-iniciar-sesion');


const iniciarSesion = document.querySelector('.iniciar-sesion');
const registrarse = document.querySelector('.registrarse');
const formularioRegistro = document.querySelector('.formulario-registro');
const formularioSesion = document.querySelector('.formulario-sesion');

document.addEventListener('DOMContentLoaded', ()=> {
    usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];
    console.log(usuarios)
})

pagRegistro.addEventListener('click', () => {
    register.classList.add('display-block')
})

pagIniciarSesion.addEventListener('click', () => {
    register.classList.remove('display-block')
    pagIniciarSesion.classList.remove('display-none')
    pagIniciarSesion.classList.add('display-block')
})

registrarse.addEventListener('click', validarFormularioRegistro );
iniciarSesion.addEventListener('click', validarFormularioInicio );

function validarFormularioRegistro(e){
    e.preventDefault()
    /* Variables para el formulario */
    const correoRegistro = document.querySelector('.correo-registro');
    const usernameRegistro = document.querySelector('.username-registro');
    const passwordRegistro = document.querySelector('.password-registro');
    const paswordRegistroDos = document.querySelector('.password-registro-dos');

    if (correoRegistro.value ==="" || usernameRegistro.value==="" || passwordRegistro.value ==="" || paswordRegistroDos.value==="") {
        mostrarAlerta("Todos los campos son obligatorios", 'error' , 'bottom-end');
        return;
    }

    // Validar Correo Electronico
    const correoExiste = usuarios.find( usuario =>  usuario.correo === correoRegistro.value);
    if (correoExiste) {
        mostrarAlerta("Correo electronico existente, pruebe con otro correo", 'error', 'bottom-end');
        return
    }

    if (passwordRegistro.value !== paswordRegistroDos.value) {
        mostrarAlerta("Contraseñas diferentes", 'error', 'bottom-end');
        return
    }

    // const persona = {
    //     correoRegistro : correoRegistro.value,
    //     usernameRegistro : usernameRegistro.value,
    //     passwordRegistro : passwordRegistro.value,
    //     nombre: '',
    //     pais: '',
    //     fechaNacimiento: '',
    //     descripcion : ''
    // }

    /* Creamos una instancia de Usuarios */
    const newUsuario = new Usuario(idUser, usernameRegistro.value, correoRegistro.value, passwordRegistro.value);
    console.log(newUsuario)

    // usuarios = [...usuarios, persona];
    usuarios = [...usuarios, newUsuario];

    /* Ponemos como usuario actual */
    usuarioActual = newUsuario

    formularioRegistro.reset();
    guardarLocalStorage('Usuarios', usuarios);
    guardarLocalStorage('UsuarioActual', usuarioActual);

    mostrarAlerta("Usuario registrado Correctamente", 'success');

    setTimeout(() => {
        console.log("actualizando")
        window.location = './index.html';
    }, 2000);

}

function validarFormularioInicio(e){
    e.preventDefault()
    /* Variables para el formulario */
    const correoSesion = document.querySelector('.correo-sesion').value;
    const passwordSesion = document.querySelector('.password-sesion').value;

    if (correoSesion ==="" || passwordSesion ==="") {
        mostrarAlerta("Todos los campos son obligatorios", 'error', 'bottom-end');
        return;
    }
    
    let autenticado = false;

    usuarios.forEach( usuario => {
        console.log(usuario)
        if ((usuario.correo === correoSesion || usuario.username === correoSesion) && usuario.password === passwordSesion) {
            autenticado = true;
            usuarioActual = usuario;
            guardarLocalStorage('UsuarioActual',usuarioActual)
        }
    })
    
    if (autenticado) {
        mostrarAlertaExito(`Bienvenido ${usuarioActual.nombre}`, 'exito');
        setTimeout(() => {
            window.location = './index.html';
        }, 3000);
    }else{
        mostrarAlerta('Usuario no Encontrado  :/' , 'error', 'bottom-end')
    }
}

function guardarLocalStorage(key,value){
    localStorage.setItem(key, JSON.stringify(value));
}

function mostrarMensajes(mensaje, tipo, localizacion){

    const alerta = document.createElement('DIV');
    alerta.classList.add('alerta', tipo)
    alerta.textContent = mensaje;

    localizacion.appendChild(alerta)

    setTimeout(() => {
        alerta.remove();
    }, 3000);

}
