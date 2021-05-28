// Funcion que muestra Si hay usuario logueado
function mostrarUsuarioLogueado(){
    const usuarioLogueado = JSON.parse(localStorage.getItem('UsuarioActual'))|| null;
    console.log(usuarioLogueado)

    if (usuarioLogueado !== null) {
        const btnIngresar = document.querySelector('.btn-ingresar');
        btnIngresar.classList.add('display-none');
        
        const usuario = document.querySelector('.usuario');
        const menuSesion = document.querySelector('.menu-sesion');
        menuSesion.classList.remove('display-none');
        menuSesion.classList.add('display-block');
    
        console.log(usuario)
        usuario.innerHTML = 
        `
        <span class="material-icons">
            account_circle
        </span>
        ${usuarioLogueado.username}
        `
    }
}

function cerrarSesion() {
    localStorage.removeItem('UsuarioActual');
    const menuSesion = document.querySelector('.menu-sesion');
    menuSesion.classList.remove('display-block');
    menuSesion.classList.add('display-none');

    const btnIngresar = document.querySelector('.btn-ingresar');
    btnIngresar.classList.remove('display-none');

    setTimeout(() => {
        window.location = "./index.html"
    }, 1000);
}