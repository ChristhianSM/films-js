
const listaPeliculas = [];

class Pelicula{
    constructor(id, nombre,genero, year, descripcion, img, puntuacion, idioma ){
        this.id = id;
        this.nombre= nombre;
        this.genero = genero;
        this.year = this.formatearFecha(year);
        this.descripcion = descripcion;
        this.estreno = this.verificarEstreno(year);
        this.img = this.obtenerImagen(img);
        this.puntuacion = parseFloat(puntuacion);
        this.idioma = idioma;
    }

    obtenerImagen(img){
        return `https://image.tmdb.org/t/p/w500/${img}`
    }

    verificarEstreno(year) {
        const diaPelicula = dayjs(year).format('YYYY MM DD');
        const diaActual = dayjs();
        const diferencia = diaActual.diff(diaPelicula, 'day');
        if (diferencia <= 30) {
            return true;
        }else{
            return false;
        }
    }

    formatearFecha(year){
        return dayjs(year).format('MMMM DD, YYYY')
    } 
}

class UI {
    mostrarPeliculasHTML(peliculas, localizacion){
        peliculas.forEach( pelicula => {
            const {nombre, genero, year, descripcion, img,puntuacion} = pelicula
            const cardPelicula = document.createElement('DIV');
            cardPelicula.classList.add('card-pelicula', 'animate__animated','animate__fadeIn')
            cardPelicula.innerHTML = 
            `   <a href = "#">
                    <figure>
                        <img src = ${img} alt= ${nombre}>
                    </figure>
                    <p class = "puntuacion"><span class="material-icons md-18">star</span>
                    ${puntuacion}</p> 
                    <div class = "informacion-pelicula">
                        <p class = "titulo-pelicula">${nombre}</p>
                        <p class = "year-pelicula">${year} </p>
                    </div>
                </a>
                
            `
            localizacion.appendChild(cardPelicula);
        })
    }

    mostrarCantidadPeliculasHTML(total, localizacion){
        localizacion.textContent = total;
    }

    limpiarHTML(localizacion){
        while(localizacion.firstChild){
            localizacion.removeChild(localizacion.firstChild)
        }
    }

    mostrarMensajes(mensaje, tipo, localizacion){
        const alertaPrevia = document.querySelector('.alerta');
        if (alertaPrevia) {
            alertaPrevia.remove();
        }
        const alerta = document.createElement('DIV');
        alerta.classList.add(tipo, 'alerta', "animate__animated", "animate__bounceIn");
        alerta.textContent = mensaje;
        localizacion.appendChild(alerta);
    }
}

class Usuario{
    constructor(idUser, username, correo, password,nombre ="", pais = "", fecha="", descripcion=""){
        this.idUser = idUser;
        this.nombre = nombre;
        this.correo = correo;
        this.password = password;
        this.username = username
        this.pais = pais;
        this.fecha = fecha;
        this.descripcion = descripcion;
    }
}

traerPeliculas();
async function traerPeliculas() {
    const peliculas = await obtenerPeliculas();

    peliculas.forEach(pelicula => {
        const {id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language } = pelicula;
        const newPelicula = new Pelicula(id, title, genre_ids, release_date, overview, poster_path,vote_average, original_language);
        listaPeliculas.push(newPelicula);
    })

    // console.log(listaPeliculas)
}

    


