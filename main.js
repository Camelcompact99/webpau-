document.addEventListener('DOMContentLoaded', () => {
    
    //variables para barra de navegación 
    const boton = document.getElementById('boton');
    const menu = document.getElementById('menu');
    const elementos = menu.querySelectorAll('li');
    const barra = document.getElementById('barra');
    const fotoswapper = document.getElementById("waper");
    const pauBoton = document.getElementById("Pau");
    const infoBoton = document.getElementById('info');
    const info = document.getElementById('infoes');
    
  //menu desplegable barra de navegación. 
    boton.addEventListener('click', () => {
        console.log('Botón clicado');
        if (boton.innerHTML==="<a>projects-</a>"){
            boton.innerHTML="<a>projects+</a>"
        }else{
            boton.innerHTML= "<a>projects-</a>"
        }
        elementos.forEach(elemento => {
          elemento.classList.toggle('cerrado');
        });
        if (barra.classList.contains('navbarwrapper')) {
            barra.classList.remove('navbarwrapper');
            barra.classList.add('navbaropen');
        } else {
            barra.classList.remove('navbaropen');
            barra.classList.add('navbarwrapper');
        }
      });
//LA GIGANTESCA FUNCIÓN CARGA GRIDS !!!!!!!!
function cargaGrids(arreglo,string){
    document.documentElement.style.overflow = 'scroll';
    fotoswapper.innerHTML =  '  ' ;
    info.classList.remove("wapperinfo");
    info.classList.add("wapperinfohidden");
    fotoswapper.classList.remove('fotoswapperhidden');
    fotoswapper.classList.add('fotoswapper');
    const texto = document.createElement('p');
    texto.innerHTML = string;

    texto.classList.add('textoAño')
    const container = document.createElement('div');
    container.classList.add('containerfotos');
    fotoswapper.appendChild(container);
    container.appendChild(texto);
    

    let arregloDiv  = [];
    let imgPromises = arreglo.map((src, indice) => {
        return new Promise((resolve) => {
            const img = new Image();
            smallsrc = src.replace('.jpg','_small.jpg')
            img.src = smallsrc;
            img.classList.add('placeholder');
            img.onload = () => {
                const div = document.createElement('div');
                div.setAttribute('data-indice', indice);
            
                if (img.naturalHeight > img.naturalWidth) {
                    div.classList.add('vertical');
                } else if (Math.random() < 0.2) {
                    div.classList.add('grande');
                } else {
                    div.classList.add('horizontal');
                }
            
                div.appendChild(img);
                container.appendChild(div);
                arregloDiv.push(div);
                resolve();
            };
        });
    });

    Promise.all(imgPromises).then(() => {
        // Crear el IntersectionObserver
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const div = entry.target;
                    const indice = div.getAttribute('data-indice');
                    const imgGrande = new Image();
                    imgGrande.classList.add('noseve');
                    imgGrande.src = arreglo[indice];
                    imgGrande.onload = () => {
                        const imgPlaceholder = div.querySelector('img');
                        imgPlaceholder.classList.add('fadeout')
                        div.replaceChild(imgGrande, imgPlaceholder);
                        imgGrande.classList.remove('noseve');
                        imgGrande.classList.add('fade-in');
                    };
                    observer.unobserve(div);  // Dejar de observar una vez que la imagen se ha cargado
                }
            });
        });

        // Observar cada div que contiene las imágenes
        arregloDiv.forEach((div) => {
            observer.observe(div);
        });
    });

    container.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName === 'IMG'){
            const div = target.parentElement; 
            let indice = div.getAttribute('data-indice');
            console.log(indice);
            const tapar = document.createElement('div');
            tapar.classList.add('tapar');
            
            let foto = document.createElement('img');
            foto.src = arreglo[indice];
            
            document.body.appendChild(tapar);
            tapar.appendChild(foto);
            
            foto.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevenir la propagación del evento de clic
                indice = (indice + 1) % arreglo.length;
                foto.src = arreglo[indice];
            });
            // Manejar el clic fuera de la imagen para cerrar el div tapar
            tapar.addEventListener('click', () => {
                document.body.removeChild(tapar);
                document.documentElement.style.overflow = 'scroll';
            });
        }
    });
}


let fotosmain = [
    'images/FASHION/fashion6.jpg',
    'images/FASHION/fashion2.jpg',
    'images/FASHION/fashion16.jpg',
    'images/perros/islaperros1.jpg',
    'images/perros/islaperros10.jpg',
    'images/perros/islaperros14.jpg',
    'images/perros/islaperros7.jpg',
    'images/castell/castell6.jpg',
    'images/castell/castell13.jpg',
    'images/castell/castell10.jpg',
    'images/castell/castell16.jpg',
    'images/plasticsoul/plasticsoul13.jpg',
    'images/plasticsoul/plasticsoul19.jpg',
    'images/plasticsoul/plasticsoul15.jpg',
    'images/plasticsoul/plasticsoul11.jpg',
]
let fotosmovil = [
    'images/FASHION/fashion10.jpg',
    'images/FASHION/fashion13.jpg',
    'images/FASHION/fashion3.jpg', 
    'images/perros/islaperros13.jpg'
]
function mainImages(arr){
    info.classList.remove("wapperinfo");
    fotoswapper.classList.remove('fotoswapperhidden');
    fotoswapper.classList.add('fotoswapper');
    info.classList.add("wapperinfohidden");
    document.documentElement.style.overflow = 'hidden';
    fotoswapper.innerHTML = ' ' ;
    const indiceAleatorio = Math.floor(Math.random() * arr.length);
    fotorandom = arr[indiceAleatorio]
    contenedor = document.createElement('div');
    contenedor.classList.add('fotomain');
    foto = document.createElement('img');
    foto.src = fotorandom;
    fotoswapper.appendChild(contenedor);
    contenedor.appendChild(foto);
}
//FASHION
const fashionBoton = document.getElementById('fashion');
const imagenesFashion = 19;
let arregloFashion = [];
const stringFashion = 'commissioned work';
//FOR PARA RECORRER 
for (let i = 1; i<= imagenesFashion; i++){
    arregloFashion.push(`images/FASHION/fashion${i}.jpg`);

}
//CASTELL 
const castellBoton = document.getElementById('castellPoble');
const imagenesCastell = 16;
let arregloCastell = [];
const stringCastell = ' el castell del poble * <i>on going<i>';
for (let i = 1; i<= imagenesCastell; i++){
    arregloCastell.push(`images/castell/castell${i}.jpg`);
}
//PERROS
const perrosBoton = document.getElementById('islaperros');
const imagenesPerros = 16;
let arregloPerros = [];
const stringPerros = ' isla de perros * <i>2022-2023<i>';
for (let i = 1; i<= imagenesPerros; i++){
    arregloPerros.push(`images/perros/islaperros${i}.jpg`);
}
//PLASTICSOUL 
const plasticBoton = document.getElementById('plasticsoul');
const imagenesPlastic = 16;
let arregloPlastic = [];
const stringPlastic = ' plastic soul * <i>2024<i>';
for (let i = 1; i<= imagenesPlastic; i++){
    arregloPlastic.push(`images/plasticsoul/plasticsoul${i}.jpg`);
}
if (window.innerWidth > 700) {
    mainImages(fotosmain);
} else {
    mainImages(fotosmovil);
}
fashionBoton.addEventListener("click", () => cargaGrids(arregloFashion,stringFashion));
castellBoton.addEventListener("click", () => cargaGrids(arregloCastell,stringCastell));
perrosBoton.addEventListener("click", () => cargaGrids(arregloPerros,stringPerros));
plasticBoton.addEventListener("click", () => cargaGrids(arregloPlastic,stringPlastic));
pauBoton.addEventListener("click",()=>{
    if (window.innerWidth > 700) {
        mainImages(fotosmain);
    } else {
        mainImages(fotosmovil);
    }
})
infoBoton.addEventListener("click",()=> {
fotoswapper.innerHTML  = " "
info.classList.remove("wapperinfohidden");
info.classList.add("wapperinfo");
fotoswapper.classList.remove('fotoswapper');
fotoswapper.classList.add('fotoswapperhidden');
document.documentElement.style.overflow = 'scroll';
})
});