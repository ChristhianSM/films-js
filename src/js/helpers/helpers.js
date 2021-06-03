// Funcion que muestra Si hay usuario logueado
export function mostrarUsuarioLogueado(){
    const usuarioLogueado = JSON.parse(localStorage.getItem('UsuarioActual'))|| null;

    if (usuarioLogueado !== null) {
        const btnIngresar = document.querySelector('.btn-ingresar');
        btnIngresar.classList.add('display-none');
        
        const usuario = document.querySelector('.usuario');
        const menuSesion = document.querySelector('.menu-sesion');
        menuSesion.classList.remove('display-none');
        menuSesion.classList.add('display-block');

        usuario.innerHTML = 
        `
        <span class="material-icons">
            account_circle
        </span>
        ${usuarioLogueado.username}
        `
    }
}

export function cerrarSesion() {
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

export async function filtrarPorBusqueda(termino){
    /* Arreglo que contendra las peliculas filtradas */
    const peliculasPorBusqueda = [];
    
    const contenedorFiltros = document.querySelector('.contenedor-filtros');

    if (termino === "") {
        return;
    }
    /* Inicializamos el objeto ui */
    const ui = new UI();

    const texto = termino.toLowerCase();
    const datos = await consultandoBusquedaPorPalabra(texto)|| [];
    
    if (datos.length > 0) {
        /* Buscamos si hay una alerta previa  */
        const alertaPrevia = document.querySelector('.alerta');
        if (alertaPrevia) {
            alertaPrevia.remove();
        }
        
        datos.forEach( pelicula => {
            const {id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language} = pelicula;
    
            const newPelicula = new Pelicula(id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language);
            peliculasPorBusqueda.push(newPelicula);
            
            const resultadoFiltro = document.querySelector('.resultadoFiltro');
            resultadoFiltro.classList.add('display-block');
            
            const bloquePeliculas = document.querySelector('.peliculas');
            bloquePeliculas.classList.add('display-none')
            
            ui.limpiarHTML(contenedorFiltros);
            ui.mostrarPeliculasHTML(peliculasPorBusqueda,contenedorFiltros);
        })

    }else{
        ui.limpiarHTML(contenedorFiltros);
        const resultadoFiltro = document.querySelector('.resultadoFiltro');
        ui.mostrarMensajes('Pelicula no encontrada, ingrese otro termino de busqueda', 'error' , resultadoFiltro);
    }
}

export function generarGeneros() {
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


/* Generador que registra la cantidad de elementos de acuerdo a las paginas */
export function *crearPaginador(total){
    for (let i = 1; i <= total; i++) {
        yield   i
    }
}

// export {mostrarUsuarioLogueado, cerrarSesion, filtrarPorBusqueda, generarGeneros, crearPaginador}