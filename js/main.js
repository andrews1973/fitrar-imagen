/*
pseudocodigo:

1- Preparar html con header seccion donde se muestran las fotos y botones
2- guardar en variables los selectores querySelector
3- declarar e inicializar el array de objetos de imagenes
4- funcion que crea los botones con javascript
5- funcion que crea un nuevo array con todas las etiquetas que no se repitar. Filtramos las etiquetas
en un nuevo array que incluya solo las que no se repiten
6- funcion donde Recorremos este ultimo array de tags no repetidas y pintamos los botones
7- capturar el click en los botones que acabamos de crear para que al hacer click se llame 
a la funcion que filtra las imagenes por el tag o id del boton. La primera imagen del array sera la grande 
el resto las pequeñas
8- capturar el click en las imagenes pequeñas para que la pequeña donde he hecho click 
se cambie por la grande, pintamos las imagenes pequeñas excepto la seleccionada, que pintaremos 
en la grande

*/

const cabecera = document.querySelector("header");
const botones = document.querySelector(".botones");
const mensaje = document.querySelector("#mensaje");
const galeria = document.querySelector("#imagenes");
const titGrande = document.querySelector("#titGrande");
const imagenGrande = document.querySelector("#imagen-grande > img");
const imagenesPeques = document.querySelector("#imagenes-peques");

// Guardamos el tag seleccionado
let textoFiltroActual = "";

const fragmento = document.createDocumentFragment();

const imagenesGaleria = [
    {
        src: "assets/viajes/viajes-1.jpg",
        title: "Lorem ipsum dolor  1",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
        alt: "Este es el alt de foto 1",
        tag: ['Mar', 'Chica', 'Arena'],
    },
    {
        src: "assets/viajes/viajes-2.jpg",
        title: "Lorem ipsum dolor  2",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
        alt: "Este es el alt de foto 2",
        tag: ['Mar', 'Arena', 'Puente'],
    },
    {
        src: "assets/viajes/viajes-3.jpg",
        title: "Lorem ipsum dolor  3",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
        alt: "Este es el alt de foto 3",
        tag: ['Señales'],
    },
    {
        src: "assets/viajes/viajes-4.jpg",
        title: "Lorem ipsum dolor  4",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
        alt: "Este es el alt de foto 4",
        tag: ['Edificio', 'Puente'],
    },
    {
        src: "assets/viajes/viajes-5.jpg",
        title: "Lorem ipsum dolor  5",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
        alt: "Este es el alt de foto 5",
        tag: ['Edificio', 'Puente'],
    },
    {
        src: "assets/viajes/viajes-6.jpg",
        title: "Lorem ipsum dolor  6",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
        alt: "Este es el alt de foto 6",
        tag: ['Mar', 'Monte'],
    },
    {
        src: "assets/viajes/viajes-7.jpg",
        title: "Lorem ipsum dolor  7",
        descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
        alt: "Este es el alt de foto 7",
        tag: ['Edificio', 'Monte'],
    }
];

function generarArrayBotones() {

    const textoBotones = [];

    for (let image of imagenesGaleria) {

        for (let tag of image.tag) { // recorremos el array tag

            if (!textoBotones.includes(tag)) { // si el nuevo array no incluye el tag lo añado
                textoBotones.push(tag);
            }
        }
    }

    return textoBotones; // array con tags unicos
}

function pintarBotones() {

    const arrayTextoBotones = generarArrayBotones(); // guardamos el array de tags unicos

    arrayTextoBotones.forEach(element => { // por cada tag unico creo un boton

        let boton = document.createElement('button');

        boton.type = 'button';
        boton.textContent = element;
        boton.id = element;

        fragmento.append(boton);
    });

    botones.append(fragmento);
}

function crearImagenPeque(imagen) {

    let contenedor = document.createElement('article');

    let titulo = document.createElement('h4');
    titulo.textContent = imagen.title;

    let img = document.createElement('img');
    img.src = imagen.src;
    img.alt = imagen.alt;
    img.title = imagen.title;

    contenedor.append(titulo, img);
    fragmento.append(contenedor);
}

// le paso dos parametros un array de imagens y la imagen que no quiero pintar, la grande
function pintarImagenesPeque(imagenesGaleria, imagenActual) {

    imagenesPeques.innerHTML = ""; // reseteamos borramos

    // devolvermos una array pero excluimos la imagen que se muestra en grande
    const imagenesFiltradas = imagenesGaleria.filter(imagen => {
        return imagen.src !== imagenActual.src;
    });

    imagenesFiltradas.forEach(imagen => {
        crearImagenPeque(imagen);
    });

    imagenesPeques.append(fragmento);
}

// Devuelve un array con las imágenes que incluyen el tag
function filtrarImagenes(imagenesArray, texto) {

    const nuevoArray = imagenesArray.filter(imagen => {
        return imagen.tag.includes(texto);
    });

    return nuevoArray;
}

function mostrarMensaje(numeroImagenes, tag) {
    let elemento = numeroImagenes == 1 ? 'imágen' : 'imágenes'
    let texto = `Se han encontrado <strong>${numeroImagenes} ${elemento}</strong> con el tag <strong>${tag}</strong>`;

    mensaje.innerHTML = texto;
}

// actualizamos las propiedades de de la img del html con las de la imagen que acabamos de hacer clic
// tambien pintamos el titulo, en mayuscula
function pintarImagenGrande (imagenSeleccionada){
    imagenGrande.src = imagenSeleccionada.src;
    imagenGrande.title = imagenSeleccionada.title;
    imagenGrande.alt = imagenSeleccionada.alt;

    titGrande.innerHTML ="" // reseteo
    let tituloImagen = imagenGrande.title
    titGrande.append(tituloImagen.toUpperCase())
}

pintarBotones(); // generamos los botones a partir de las tags

// Delegación de eventos
document.addEventListener('click', (ev) => {

    if (ev.target.matches('.botones button')) {
        // ev.target.tagName ==='BUTTON'
        let textoBoton = ev.target.id;

        // Guardamos el filtro seleccionado (el id del boton que es uno de los tag)
        textoFiltroActual = textoBoton;

        // Filtramos las imágenes llamando a la funcion que fitra y pasandole el array de imganes y el texto filtro
        const imagenesFiltradas = filtrarImagenes(imagenesGaleria, textoBoton);

        // mostramos el mensaje con el tamaño del array y el texto filtro
        mostrarMensaje(imagenesFiltradas.length, textoBoton);

        // Seleccionamos la primera imagen, la mostraremos en grande con su titulo
        let imagenG = imagenesFiltradas[0];

        // Mostramos la imagen en grande y su titulo
        pintarImagenGrande (imagenG)
        
        // Pintamos las pequeñas pero excluyendo la grande
        pintarImagenesPeque(imagenesFiltradas, imagenG);

    }

    // CLIC EN LAS IMÁGENES PEQUEÑAS
    else if (ev.target.matches('#imagenes-peques img')) {

        // Buscamos la imagen seleccionada en el array original
        // find() devuelve el primer objeto imagen del array que cumpla con la condicion
        const imagenSeleccionada = imagenesGaleria.find(imagen => {
            return imagen.src === ev.target.getAttribute('src');
        });

        // Actualizamos la imagen grande
        pintarImagenGrande (imagenSeleccionada)
        
        // Recuperamos las imágenes del filtro actual
        const imagenesFiltradas = filtrarImagenes(imagenesGaleria, textoFiltroActual);

        // Pintamos las pequeñas excluyendo la imagen seleccionada
        pintarImagenesPeque(imagenesFiltradas, imagenSeleccionada);
    }

});
