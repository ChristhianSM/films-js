const listaPeliculas = [];

class Pelicula{
    constructor(nombre,genero, year, descripcion, estreno, img, puntuacion ){
        this.id = new Date().getTime();
        this.nombre= nombre;
        this.genero = genero;
        this.year = year;
        this.descripcion = descripcion;
        this.estreno = estreno;
        this.img = img;
        this.puntuacion = parseFloat(puntuacion);
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

const peliculas = [
	{
		nombre: 'Soul',
		genero: 'Animacion',
		year: 2020,
		descripcion: "Joe Gardner, un profesor de música de secundaria que vive en la ciudad de Nueva York, se siente atrapado en la vida e insatisfecho en su trabajo. Sueña con una carrera en el jazz, a lo que su madre costurera, Libba, se opone, temiendo que no tenga seguridad económica.",
        estreno: false,
        img: "./src/img/soul.jpg",
        puntuacion: 5.3
		
	},
	{ 
        nombre: 'Avenguers', 
        genero: 'Accion', 
        year: 2018, 
        descripcion: "Los Vengadores (en inglés Avengers; Invencibles del siglo XX en antiguas traducciones de México realizadas por Editorial La Prensa)​​ son un equipo ficticio de superhéroes que aparecen en cómics estadounidenses publicados por Marvel Comics.", 
        estreno: true,
        img: "./src/img/vengadores.jpg",
        puntuacion: 8.6
    },
	{
		nombre: 'El conjuro III',
		genero: 'Terror',
		year: 2015,
		descripcion:  "Basada en una historia real, El conjuro cuenta cómo una pareja de investigadores de fenómenos paranormales, Ed y Lorraine Warren (Patrick Wilson, Vera Farmiga), acude en ayuda de una familia aterrorizada por una presencia oscura en una granja alejada de todo.",
        estreno: true,
        img: "./src/img/conjuro.jpg",
		puntuacion: 6.3
	},
	{ 
        nombre: 'El capitan America', 
        genero: 'Accion', 
        year: 2010, 
        descripcion: "Tras tres meses de someterse a un programa de entrenamiento físico y táctico, encomiendan a Steve Rogers su primera misión como Capitán América. Armado con un escudo indestructible, emprende la guerra contra la perversa organización HYDRA.",
        estreno: true, 
        img: "./src/img/capitan_america.jpg",
        puntuacion: 9.2
    },
	{
		nombre: 'El aro',
		genero: 'Terror',
		year: 2008,
		descripcion: "Una reportera debe resolver el misterio de una cinta que trae muerte a sus espectadores, antes de que sucumba a su poder.",
        estreno: false,
        img: "./src/img/el_aro.jpg",
        puntuacion: 6.2
	},
	{
		nombre: 'Intensamente',
		genero: 'Aminacion',
		year: 2015,
		descripcion: "Las cinco emociones que conviven en el interior de una niña llamada Riley, alegría, miedo, desagrado, ira y tristeza, compiten por tomar el control de sus acciones cuando la pequeña se traslada, junto a su familia, a vivir a San Francisco. La adaptación a una nueva ciudad, una nueva escuela y unos nuevos compañeros no será sencilla para Riley.",
        estreno: false,
        img: "./src/img/intensamente.jpg",
        puntuacion: 8.6
	},
	{
		nombre: 'El alma oscura',
		genero: 'Terror',
		year: 2010,
		descripcion: "Una pareja pierde a su hija en un desafortunado accidente, que tal vez hubiera podido evitarse de haber prestado atención a las extrañas casualidades que sucedían al tiempo que la pequeña moría ahogada.",
        estreno: false,
        img:"./src/img/alma_oscura.jpg",
        puntuacion: 4.2
	},
	{ 
        nombre: 'Iron Man', 
        genero: 'Accion', 
        year: 2010, 
        descripcion:"Un empresario millonario construye un traje blindado y lo usa para combatir el crimen y el terrorismo.", 
        estreno: false,
        img: "./src/img/ip_man.jpg",
        puntuacion: 5.8
    },
	{
		nombre: 'Rapidos y Furiosos',
		genero: 'Accion',
		year: 2011,
		descripcion: "El exconvicto Dominic Toretto se une a su viejo adversario, Brian O'Conner, que ahora trabaja para el FBI en Los Ángeles, con el fin de infiltrarse en una organización criminal que se dedica a introducir heroína en la ciudad",
        estreno: false,
        img: "./src/img/rapidos.jpg",
        puntuacion: 6.4
	},
	{ 
        nombre: 'Ip Man', 
        genero: 'Accion', 
        year: 2017, 
        descripcion: "Para buscar un futuro mejor, Ip Man decide viajar a los EE. UU. solo para descubrir que la vida estable y pacífica en el extranjero es superficial. Debajo hay una discriminación racial muy arraigada que es mucho peor de lo que él esperaba.", 
        estreno: false,
        img: "./src/img/ip_man.jpg",
        puntuacion: 7.2
    },
	{
		nombre: 'Rocky',
		genero: 'Accion',
		year: 2010,
		descripcion: "Un humilde boxeador de Filadelfia, en el que nadie cree, tiene la oportunidad de cambiar su vida por completo si lucha por el título mundial contra el temible Apollo Creed.",
        estreno: false,
        img: "./src/img/rocky.jpg",
        puntuacion: 8.6
	},
	{
		nombre: 'La monja',
		genero: 'Terror',
		year: 2010,
		descripcion: "Una monja se suicida en una abadía rumana y el Vaticano envía a un sacerdote y una novicia a investigar lo sucedido. Lo que ambos encuentran allá es un secreto perverso que los enfrentará cara a cara con el mal en su esencia más pura.",
        estreno: false,
        img: "./src/img/la_morgue.jpg",
        puntuacion: 7.3
	},
	{
		nombre: 'Cars',
		genero: 'Animacion',
		year: 2015,
		descripcion: "El aspirante a campeón de carreras Rayo McQueen parece que está a punto de conseguir el éxito. Su actitud arrogante se desvanece cuando llega a una pequeña comunidad olvidada que le enseña las cosas importantes de la vida que había olvidado.",
        estreno: false,
        img: "./src/img/cars.jpg",
        puntuacion: 10
	},
	{ 
        nombre: 'Toy Story', 
        genero: 'Animacion', 
        year: 2015, 
        descripcion: "Woody, el juguete favorito de Andy, se siente amenazado por la inesperada llegada de Buzz Lightyear, el guardían del espacio.",
        estreno: false, 
        img: "./src/img/toy_story.jpg",
        puntuacion: 8.6
    },
	{
		nombre: 'Detras de la puerta',
		genero: 'Terror',
		year: 2010,
		descripcion: "Estudiantes estadounidenses de intercambio son víctimas de fuerzas diabólicas durante un viaje en tren por Serbia.",
        estreno: false,
        img: "./src/img/detras.jpg",
        puntuacion: 7.2
	},
	{
		nombre: 'End Game',
		genero: 'Accion',
		year: 2020,
		descripcion: "Los Vengadores restantes deben encontrar una manera de recuperar a sus aliados para un enfrentamiento épico con Thanos, el malvado que diezmó el planeta y el universo.",
        estreno: false,
        img: "./src/img/end_game.jpg",
        puntuacion: 9.5
	},
	{
		nombre: 'La morgue',
		genero: 'Terror',
		year: 2020,
		descripcion: "Dos forenses, padre e hijo, investigan la muerte de una hermosa joven sobre la que nadie sabe nada. A medida que descubren más información, más se adentran en una telaraña de indicios y hechos extraños y desconcertantes.",
        estreno: false,
        img: "./src/img/la_morgue.jpg",
        puntuacion: 8.2
	},
	{
		nombre: 'It Capitulo 2',
		genero: 'Terror',
		year: 2018,
		descripcion: "En el misterioso pueblo de Derry, un malvado payaso llamado Pennywise vuelve 27 años después para atormentar a los ya adultos miembros del Club de los Perdedores, que ahora están más alejados unos de otros.",
        estreno: false,
        img : "./src/img/it.jpg",
        puntuacion: 5.6
	},
	{ 
        nombre: 'Damian', 
        genero: 'Terror', 
        year: 2015, 
        descripcion: "En 1872 el joven sacerdote católico Damián se ofrece para ir a una isla de Molokai, cerca de Hawai, y ayudar a una población afectada por la lepra. Cuenta la historia de una persona que sacrifica toda su vida al cuidado de los leprosos allí presentes.", 
        estreno: false,
        img: "./src/img/damian.jpg",
        puntuacion: 5.6,
    },
	{ 
        nombre: 'Batman el caballero de la noche', 
        genero: 'Accion', 
        year: 2019, 
        descripcion: "Batman tiene que mantener el equilibrio entre el heroísmo y el vigilantismo para pelear contra un vil criminal conocido como el Guasón, que pretende sumir Ciudad Gótica en la anarquía.", 
        estreno: true,
        img: "./src/img/batman.jpg",
        puntuacion: 5.6,
    },
	{ 
        nombre: 'King Kong', 
        genero: 'Accion', 
        year: 2015, 
        descripcion: "Godzilla y Kong, dos de las fuerzas más poderosas de un planeta habitado por aterradoras criaturas, se enfrentan en un espectacular combate que sacude los cimientos de la humanidad. Monarch se embarca en una misión de alto riesgo y pone rumbo hacia territorios inexplorados para descubrir los orígenes de estos dos titanes, en un último esfuerzo por tratar de salvar a dos bestias que parecen tener las horas contadas sobre la faz de la Tierra.", 
        estreno: false,
        img: "./src/img/king.jpg",
        puntuacion: 5.6,
    },
	{ 
        nombre: 'La liga de la justicia', 
        genero: 'Terror', 
        year: 2021, 
        descripcion: "Gracias a su renovada fe en la humanidad e inspirado por el acto de altruísmo de Superman, Bruce Wayne pide ayuda a su nueva aliada, Diana Prince, para enfrentar a un enemigo aún más peligroso.", 
        estreno: true,
        img: "./src/img/liga.jpg",
        puntuacion: 5.6,
    }
];

peliculas.forEach(pelicula => {
    const {nombre, genero, year, descripcion, estreno, img,puntuacion } = pelicula;
    const newPelicula = new Pelicula(nombre, genero, year, descripcion, estreno, img,puntuacion);
    listaPeliculas.push(newPelicula);
})
