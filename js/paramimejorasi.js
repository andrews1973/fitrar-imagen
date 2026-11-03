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

/*
console.log(cabecera);
console.log(botones );
console.log(galeria);
console.log(imagenGrande);
console.log(imagenesPeques);
*/

const fragmento = document.createDocumentFragment();

const imagenesGaleria = [
    {
        src: "assets/viajes/viajes-1.jpg",
        title: "Lorem ipsum dolor  1",
        descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum. ",
        alt: "Este es el alt de foto 1",
        tag: ['Mar', 'Chica', 'Arena'],
    },
    {
        src: "assets/viajes/viajes-2.jpg",
        title: "Lorem ipsum dolor  2",
        descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum. ",
        alt: "Este es el alt de foto 2",
        tag: ['Mar', 'Arena'],
    },
    {
        src: "assets/viajes/viajes-3.jpg",
        title: "Lorem ipsum dolor  3",
        descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.  ",
        alt: "Este es el alt de foto 3",
        tag: ['Señales'],
    },
    {
        src: "assets/viajes/viajes-4.jpg",
        title: "Lorem ipsum dolor  4",
        descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.  ",
        alt: "Este es el alt de foto 4",
        tag: ['Edificio', 'Puente'],
    },
    {
        src: "assets/viajes/viajes-5.jpg",
        title: "Lorem ipsum dolor  5",
        descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.  ",
        alt: "Este es el alt de foto 5",
        tag: ['Edificio', 'Puente'],
    },
    {
        src: "assets/viajes/viajes-6.jpg",
        title: "Lorem ipsum dolor  6",
        descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.  ",
        alt: "Este es el alt de foto 6",
         tag: ['Mar','Monte'],
    },
    {
        src: "assets/viajes/viajes-7.jpg",
        title: "Lorem ipsum dolor  7",
        descripcion:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut bibendum elit. In vitae pharetra magna. Integer vel orci venenatis lorem pulvinar bibendum.  ",
        alt: "Este es el alt de foto 7",
        tag: ['Edificio', 'Monte'],
    }
];

function generarArrayBotones (){
    const textoBotones = []  // array donde guardaresmos tags de botones que no se repitan
    for (let image of imagenesGaleria){
        for (let tag of image.tag){ // leemos el array que es el valor de tag
            if (!textoBotones.includes(tag)){ // si el array textoBotones no incluye el tag
                textoBotones.push(tag) // lo incluimos en el array
            }
        }
    }

    return textoBotones
}
function generarBotones (){
    const arrayTextoBotones = generarArrayBotones ()
    arrayTextoBotones .forEach(element => {
        let boton = document.createElement('button')
        boton.type = 'button'
        boton.textContent = element
        boton.id = element.toLowerCase().trim()
        //console.log(boton);
        fragmento.append(boton)
    });

    botones.append(fragmento)
}

function crearImagenPeque (imagen){
        let contenedor = document.createElement('article'); 
        let titulo = document.createElement('h2')     
        titulo.textContent = imagen.title

        let img = document.createElement('img')
        img.src = imagen.src
        img.alt = imagen.alt
        img.title = imagen.title

        contenedor.append(titulo, img)
        fragmento.append(contenedor)           
}

function pintarImagenesPeque (imagenesGaleria){
    
    imagenesPeques.innerHTML="" // reseteamos 
    imagenesGaleria.forEach(imagen=> {
        crearImagenPeque(imagen)
    });
    
    imagenesPeques.append(fragmento)

}


// devuelve un array con las imagenes filtradas que incluyen el tag
function filtrarImagenes (imagenesArray, texto){
     const nuevoArray = imagenesArray.filter((imagen)=>{
            return imagen.tag.includes(texto)
    })
    return nuevoArray
}

function mostrarMensaje (numeroImagenes, tag){
    let texto = `Se han encontrado <strong>${numeroImagenes} imágenes</strong> con el tag <strong>${tag}</strong>`
    mensaje.innerHTML = texto
}

generarBotones () // generamos los botones a partir de las tags
//pintarImagenes (imagenesGaleria) // pintamos todas al inicio

document.addEventListener('click', (ev)=>{
    // ev.target.tagName ==='BUTTON'
    if (ev.target.matches('.botones button')){
        let textoBoton = ev.target.textContent
        // console.log(textoBoton);
        // filter devuelve un nuevo array que cumpla la condicion
        // includes devuelve true si el array contine el textoBoton
        const imagenesFiltradas = filtrarImagenes (imagenesGaleria, textoBoton)
        //console.log(imagenesFiltradas);
        mostrarMensaje(imagenesFiltradas.length, textoBoton)
        pintarImagenesPeque (imagenesFiltradas)
        let imagenG = imagenesFiltradas[0];

        imagenGrande.src = imagenG.src
        imagenGrande.tilte = imagenG.title
        imagenGrande.alt = imagenG.alt 
        //pintarImagenesGrande(imagenesFiltradas[0])        
    } else if (ev.target.matches('#imagenes-peques img')){
        imagenGrande.src = ev.target.src
        imagenGrande.tilte = ev.target.title
        imagenGrande.alt = ev.target.alt       
     }
})



