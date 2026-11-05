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

/** @type {HTMLElement | null} */
const cabecera = document.querySelector("header");

/** @type {HTMLElement | null} */
const botones = document.querySelector(".botones");

/** @type {HTMLElement | null} */
const mensaje = document.querySelector("#mensaje");

/** @type {HTMLElement | null} */
const galeria = document.querySelector("#imagenes");

/** @type {HTMLElement | null} */
const titGrande = document.querySelector("#titGrande");

/** @type {HTMLImageElement | null} */
const imagenGrande = document.querySelector("#imagen-grande > img");

/** @type {HTMLElement | null} */
const imagenesPeques = document.querySelector("#imagenes-peques");

/** @type {HTMLInputElement | null} */
const inputEtiqueta = document.querySelector("#etiqueta");

/** @type {DocumentFragment} */
const fragmento = document.createDocumentFragment();

/**  Guardamos el tag seleccionado
 * @type {string}
 */
let textoFiltroActual = "";

/** array que guarda el texto o id de los botones
 * @type {string[]}
 */
const textoFiltradores = [];

/**
 * @typedef {Object} ImagenGaleria
 * @property {string} src - Ruta de la imagen.
 * @property {string} title - Título de la imagen.
 * @property {string} descripcion - Descripción detallada.
 * @property {string} alt - Texto alternativo para accesibilidad.
 * @property {string[]} tag - Lista de etiquetas asociadas a la imagen.
 */

/**
 * @type {ImagenGaleria[]}
 */

const imagenesGaleria = [
  {
    src: "assets/viajes/viajes-1.jpg",
    title: "Lorem ipsum dolor  1",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
    alt: "Este es el alt de foto 1",
    tag: ["Mar", "Chica", "Arena"],
  },
  {
    src: "assets/viajes/viajes-2.jpg",
    title: "Lorem ipsum dolor  2",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
    alt: "Este es el alt de foto 2",
    tag: ["Mar", "Arena", "Puente"],
  },
  {
    src: "assets/viajes/viajes-3.jpg",
    title: "Lorem ipsum dolor  3",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
    alt: "Este es el alt de foto 3",
    tag: ["Señales"],
  },
  {
    src: "assets/viajes/viajes-4.jpg",
    title: "Lorem ipsum dolor  4",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
    alt: "Este es el alt de foto 4",
    tag: ["Edificio", "Puente"],
  },
  {
    src: "assets/viajes/viajes-5.jpg",
    title: "Lorem ipsum dolor  5",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
    alt: "Este es el alt de foto 5",
    tag: ["Edificio", "Puente"],
  },
  {
    src: "assets/viajes/viajes-6.jpg",
    title: "Lorem ipsum dolor  6",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
    alt: "Este es el alt de foto 6",
    tag: ["Mar", "Monte"],
  },
  {
    src: "assets/viajes/viajes-7.jpg",
    title: "Lorem ipsum dolor  7",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.",
    alt: "Este es el alt de foto 7",
    tag: ["Edificio", "Monte"],
  },
];

/**
 * Limpia el contenido HTML de un elemento de la galería.
 * @param {HTMLElement} loQueQuieroLimpiar - El elemento HTML que se va a vaciar.
 * @returns {void}
 */

const limpiar = (loQueQuieroLimpiar) => {
  loQueQuieroLimpiar.innerHTML = "";
};

/**
 * Genera un array con todas las etiquetas (tags) únicas extraídas
 * de las imágenes de la galería, evitando duplicados.
 *
 * @returns {string[]} Un array de strings con los tags únicos.
 */

const generarArrayBotones = () => {
  imagenesGaleria.forEach((image) => {
    // recorremos array con objetos de imagenes
    image.tag.forEach((tag) => {
      // recorremos el array tag
      if (!textoFiltradores.includes(tag)) {
        // si el nuevo array no incluye el tag lo añado
        textoFiltradores.push(tag);
      }
    });
  });

  return textoFiltradores; // array con tags unicos
};

/**
 *funcion que llama a la funcion que genera el array de tags unicos
 *la recorre generando un boton por cada tags
 *metemos los botones en un fragmento
 *@returns {void} Esta función no devuelve ningún valor.
 */

const pintarBotones = () => {
  if (!botones) return;

  const arraytextoFiltradores = generarArrayBotones(); // guardamos el array de tags unicos

  arraytextoFiltradores.forEach((element) => {
    // por cada tag unico creo un boton

    let boton = document.createElement("button");

    boton.type = "button";
    boton.textContent = element;
    boton.id = element;

    fragmento.append(boton);
  });

  botones.append(fragmento);
};
/**
 * Crea la estructura HTML (article, h4 e img) para una imagen de la galería
 * y la añade al fragmento en memoria.
 *
 * @param {ImagenGaleria} imagen - El objeto con la información de la imagen a renderizar.
 * @returns {void} Esta función no devuelve ningún valor.
 */
const crearImagenPeque = (imagen) => {
  let contenedor = document.createElement("article");

  let titulo = document.createElement("h4");
  titulo.textContent = imagen.title;

  let img = document.createElement("img");
  img.src = imagen.src;
  img.alt = imagen.alt;
  img.title = imagen.title;

  contenedor.append(titulo, img);
  fragmento.append(contenedor);
};

/**
 * Filtra la colección de imágenes para excluir la que se está mostrando en grande
 * y renderiza el resto en el contenedor de miniaturas del DOM.
 *
 * @param {ImagenGaleria[]} imagenesGaleria - El array con las imágenes.
 * @param {ImagenGaleria} imagenActual - El objeto de la imagen grande.
 * @returns {void} Esta función no devuelve ningún valor.
 */
const pintarImagenesPeque = (imagenesGaleria, imagenActual) => {
  if (!imagenesPeques || !imagenActual) {
    return;
  }
  limpiar(imagenesPeques);

  // devolvermos una array pero excluimos la imagen que se muestra en grande
  const imagenesFiltradas = imagenesGaleria.filter((imagen) => {
    return imagen.src !== imagenActual.src;
  });

  imagenesFiltradas.forEach((imagen) => {
    crearImagenPeque(imagen);
  });

  imagenesPeques.append(fragmento);
};

/**
 * Devuelve un array con las imágenes que incluyen el tag
 *
 * @param {ImagenGaleria[]} imagenesArray - Array de imágenes que se va a filtrar.
 * @param {string} texto - La etiqueta (tag) por la que se desea filtrar.
 * @returns {ImagenGaleria[]} Deveulve un nuevo array que contiene solo las imágenes que incluyen el tag.
 */
const filtrarImagenes = (imagenesArray, texto) => {
  const nuevoArray = imagenesArray.filter((imagen) => {
    return imagen.tag.includes(texto);
  });

  return nuevoArray;
};

/**
 * Muestra un mensaje dinámico en el DOM indicando la cantidad de imágenes encontradas
 * para una etiqueta (tag) específica, controlando el plural del texto de forma automática.
 *
 * @param {number} numeroImagenes - La cantidad de imágenes que coinciden con el filtro.
 * @param {string} tag - El nombre de la etiqueta por la cual se realizó la búsqueda.
 * @returns {void} Esta función no devuelve ningún valor.
 */
const mostrarMensaje = (numeroImagenes, tag) => {
  if (!mensaje) {
    return;
  }
  let elemento = numeroImagenes == 1 ? "imágen" : "imágenes";
  let texto = `Se han encontrado <strong>${numeroImagenes} ${elemento}</strong> con el tag <strong>${tag}</strong>`;

  mensaje.innerHTML = texto;
};

/**
 * Actualiza los atributos de la imagen principal y renderiza su título en mayúsculas.
 *
 * @param {ImagenGaleria | null} imagenSeleccionada - El objeto de la imagen que se va a mostrar.
 * @returns {void} Esta función no devuelve ningún valor.
 */
const pintarImagenGrande = (imagenSeleccionada) => {
  if (!imagenGrande || !titGrande || !imagenSeleccionada) {
    return;
  }
  imagenGrande.src = imagenSeleccionada.src;
  imagenGrande.title = imagenSeleccionada.title;
  imagenGrande.alt = imagenSeleccionada.alt;

  limpiar(titGrande); // limpiamos
  let tituloImagen = imagenGrande.title;
  titGrande.append(tituloImagen.toUpperCase());
};

pintarBotones(); // generamos los botones a partir de las tags

/**
 * Aplica un filtro a las imágenes de la galería y actualiza el contenido visual.
 * Guarda el filtro seleccionado, muestra el número de imágenes encontradas,
 * selecciona la primera imagen como principal y renderiza el resto como miniaturas.
 *
 * @param {string} textoFiltrador - Etiqueta utilizada para filtrar las imágenes.
 * @returns {void} Esta función no devuelve ningún valor.
 */

// Función para aplicar el filtro y pintar las imágenes
const aplicarFiltro = (textoFiltrador) => {
  // Guardamos el filtro seleccionado
  textoFiltroActual = textoFiltrador;

  // Filtramos las imágenes
  const imagenesFiltradas = filtrarImagenes(imagenesGaleria, textoFiltrador);

  // Mostramos el mensaje con el número de imágenes y el filtro
  mostrarMensaje(imagenesFiltradas.length, textoFiltrador);

  // Seleccionamos la primera imagen
  const imagenG = imagenesFiltradas[0];

  // Mostramos la imagen grande y su título
  pintarImagenGrande(imagenG);

  // Pintamos las pequeñas excluyendo la grande
  pintarImagenesPeque(imagenesFiltradas, imagenG);
};

/**
 * Gestiona los eventos de clic mediante delegación de eventos.
 *
 * @listens Document#click
 * @param {MouseEvent} ev - Objeto del evento que contiene información sobre el clic realizado.
 * @returns {void} Esta función no devuelve ningún valor.
 */
// Delegación de eventos
document.addEventListener("click", (ev) => {
  if (!(ev.target instanceof Element)) {
    return;
  }
  // Clic en los botones de etiquetas
  if (ev.target.matches(".botones button")) {
    const textoFiltrador = ev.target.id;

    aplicarFiltro(textoFiltrador);
  }

  // Clic en el botón del formulario
  else if (ev.target.matches("#formularioEtiquetas button")) {
    if (!inputEtiqueta) {
      return;
    }

    const textoFiltrador = inputEtiqueta.value;

    aplicarFiltro(textoFiltrador);
  }

  // Clic en las imágenes pequeñas
  else if (ev.target.matches("#imagenes-peques img")) {
    
    // Buscamos la imagen seleccionada en el array original
    const imagenSeleccionada = imagenesGaleria.find((imagen) => {
      return imagen.src === ev.target.getAttribute("src");
    });

    // Actualizamos la imagen grande
    pintarImagenGrande(imagenSeleccionada);

    // Recuperamos las imágenes del filtro actual
    const imagenesFiltradas = filtrarImagenes(
      imagenesGaleria,
      textoFiltroActual,
    );

    // Pintamos las pequeñas excluyendo la imagen seleccionada
    pintarImagenesPeque(imagenesFiltradas, imagenSeleccionada);
  }
});
