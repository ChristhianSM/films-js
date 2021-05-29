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

function generarGeneros() {
    const generos = ['Accion', 'Terror', 'Animacion', 'Aventura', 'Comedia', 'Documental', 'Familia', 'Misterio', 'Romance', 'Historia', 'Suspenso', 'C.Ficcion', 'Drama', 'Infantil', 'Crimen', 'Fantasia', 'Musica', 'Superheroes', 'Guerra', 'Crimen'];
    const contenedorGenero = document.querySelector('.contenedor-generos');

    generos.forEach( genero => {
        const  li = document.createElement('LI');
        const p = document.createElement('p');
        p.classList.add(`btn${genero}`);
        p.innerHTML = 
            `&#9205;${genero}
            <span class="total${genero}"></span>
            `
        li.appendChild(p);
        contenedorGenero.appendChild(li)
    })
}