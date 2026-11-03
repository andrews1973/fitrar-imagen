/*
pseudocodigo:

1- Preparar html con header seccion donde se muestran las fotos y botones

*/

const cabecera = document.querySelector("header");
const botones = document.querySelector(".botones");
const mensaje = document.querySelector("#mensaje");
const galeria = document.querySelector("#imagenes");
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
        tag: ['Mar', 'Arena'],
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

        for (let tag of image.tag) {

            if (!textoBotones.includes(tag)) {
                textoBotones.push(tag);
            }
        }
    }

    return textoBotones;
}

function generarBotones() {

    const arrayTextoBotones = generarArrayBotones();

    arrayTextoBotones.forEach(element => {

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

    let titulo = document.createElement('h2');
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

    let texto = `Se han encontrado <strong>${numeroImagenes} imágenes</strong> con el tag <strong>${tag}</strong>`;

    mensaje.innerHTML = texto;
}

generarBotones(); // generamos los botones a partir de las tags

// Delegación de eventos
document.addEventListener('click', (ev) => {

    if (ev.target.matches('.botones button')) {
        // ev.target.tagName ==='BUTTON'
        let textoBoton = ev.target.id;

        // Guardamos el filtro seleccionado (texto o el id del boton)
        textoFiltroActual = textoBoton;

        // Filtramos las imágenes llamando a la funcion que fitra y pasandole el array de imganes y el texto filtro
        const imagenesFiltradas = filtrarImagenes(imagenesGaleria, textoBoton);

        // mostramos el texto con el tamaño del array y el texto filtro
        mostrarMensaje(imagenesFiltradas.length, textoBoton);

        // Seleccionamos la primera imagen, la mostraremos en grande
        let imagenG = imagenesFiltradas[0];

        // Mostramos la imagen en grande
        imagenGrande.src = imagenG.src;
        imagenGrande.title = imagenG.title;
        imagenGrande.alt = imagenG.alt;

        // Pintamos las pequeñas pero excluyendo la grande
        pintarImagenesPeque(imagenesFiltradas, imagenG);

    }

    // CLIC EN LAS IMÁGENES PEQUEÑAS
    else if (ev.target.matches('#imagenes-peques img')) {

        // Buscamos la imagen seleccionada en el array original
        // finde devuelve el primer objeto imagen del array que cumpla con la condicion
        const imagenSeleccionada = imagenesGaleria.find(imagen => {
            return imagen.src === ev.target.getAttribute('src');
        });

        // Actualizamos la imagen grande con los atributos de la imagen seleccionada
        imagenGrande.src = imagenSeleccionada.src;
        imagenGrande.title = imagenSeleccionada.title;
        imagenGrande.alt = imagenSeleccionada.alt;

        // Recuperamos las imágenes del filtro actual
        const imagenesFiltradas = filtrarImagenes(imagenesGaleria, textoFiltroActual);

        // Pintamos las pequeñas excluyendo la imagen seleccionada
        pintarImagenesPeque(imagenesFiltradas, imagenSeleccionada);
    }

});
