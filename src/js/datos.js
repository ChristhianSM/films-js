const listaPeliculas = [];

class Pelicula{
    constructor(id, nombre,genero, year, descripcion, img, puntuacion, idioma, esSerie ){
        this.id = id;
        this.nombre= nombre;
        this.genero = genero;
        this.year = this.formatearFecha(year);
        this.descripcion = descripcion;
        this.estreno = this.verificarEstreno(year);
        this.img = this.obtenerImagen(img);
        this.puntuacion = parseFloat(puntuacion);
        this.idioma = idioma;
        this.esSerie = esSerie;
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

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

class UI {

    mostrarPeliculasHTML(peliculas, localizacion){
        peliculas.forEach( pelicula => {
            const {id, nombre, year, img,puntuacion, esSerie} = pelicula

            const cardPelicula = document.createElement('DIV');
            cardPelicula.classList.add('card-pelicula', 'animate__animated','animate__fadeIn')

            /* Scripting */
            const a = document.createElement('A');

            cardPelicula.innerHTML = 
            `<a href = "./nombre-pelicula.html?id=${id}&nombrePelicula=${nombre}&pelicula=${!esSerie}" data-bs-toggle="tooltip" data-bs-html="true" 
                    title="<img src = ${img} >"
                >
                    <img src = ${img} alt= ${nombre}>
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
    
    mostrarSeriesHtml(series, localizacion){
        series.forEach( pelicula => {
            const {id, nombre, year, img,puntuacion, esSerie} = pelicula;

            const cardPelicula = document.createElement('DIV');
            cardPelicula.classList.add('card-pelicula', 'animate__animated','animate__fadeIn')

            /* Scripting */
            const a = document.createElement('A');

            cardPelicula.innerHTML = 
            `<a href = "./nombre-pelicula.html?id=${id}&nombrePelicula=${nombre}&pelicula=${!esSerie}" data-bs-toggle="tooltip" data-bs-html="true" 
                    title="<img src = ${img} >"
                >
                    <img src = ${img} alt= ${nombre}>
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


    


