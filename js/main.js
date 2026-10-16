
// ej 1, crear un array d obj con 13 frutas

const frutas = [
    {
        id: 1,
        nombre: "Manzana",
        precio: 100,
        img: "img/manzana.jpg"
    },
    {
        id: 2,
        nombre: "Naranja",
        precio: 150,
        img: "img/naranja.jpg"
    },
    {
        id: 3,
        nombre: "Banana",
        precio: 200,
        img: "img/banana.jpg"
    },
    {
        id: 4,
        nombre: "Anana",
        precio: 250,
        img: "img/anana.jpg"
    },
    {
        id: 5,
        nombre: "Arandano",
        precio: 300,
        img: "img/arandano.jpg"
    },
    {
        id: 6,
        nombre: "Frambuesa",
        precio: 350,
        img: "img/frambuesa.png"
    },
    {
        id: 7,
        nombre: "Frutilla",
        precio: 400,
        img: "img/frutilla.jpg"
    },
    {
        id:8,
        nombre: "Kiwi",
        precio: 450,
        img: "img/kiwi.jpg"
    },
    {
        id: 9,
        nombre: "Mandarina",
        precio: 100,
        img: "img/mandarina.jpg"
    },
    {
        id: 10,
        nombre:"Pera",
        precio: 150,
        img: "img/pera.jpg"
    },
    {
        id: 11,
        nombre: "Pomelo-amarillo",
        precio: 200,
        img: "img/pomelo-amarillo.jpg"
    },
    {
        id: 12,
        nombre: "Pomelo-rojo",
        precio: 250,
        img: "img/pomelo-rojo.jpg"
    },
    {
        id: 13,
        nombre: "Sandia",
        precio: 300,
        img: "img/sandia.jpg"
    }
];

// ej 2, crear un objeto alumno con dni, nombre y apellido
function imprimirDatosAlumno() {
    const alumno = {
    dni: 43967766,
    nombre: "Renata",
    apellido: "Altube"
    };
    //uso `` para mostrar en consola los datos del objeto
    console.log (`Alumno: ${alumno.nombre} ${alumno.apellido}, DNI: ${alumno.dni}`);

    // imprimo en consola los datos del alumno
    console.log(`alumno: ${alumno.nombre} ${alumno.apellido}`);

    // Paso 3 (cont.): Imprimir nombre y apellido en la etiqueta <nav> del HTML 
    const nav = document.querySelector("nav"); 
    if (nav) { 
        //Reemplazar el contenido del <nav> 
            nav.textContent = `${alumno.nombre} ${alumno.apellido}`;  
        } else { 
            console.warn("No se encontró el elemento <nav> en el DOM.");
        }
    };

 // ej 3 funcion q imprima en la pantalla los productos del array frutas y 4
function cargarFrutas(lista = frutas) {
    const contenedor = document.querySelector(".contenedor-productos");
    if (!contenedor) { 
        return;
    }
    //limpiar el contenedor antes de agregar los productos
    contenedor.innerHTML = "";
    lista.forEach(fruta => {
        //creo el div d cada producto y le agrego la clase card-producto
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("card-producto");
        //modifico html como solicita la consigna
        productoDiv.innerHTML = `
            <img src="${fruta.img}" alt="${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p> $${fruta.precio}</p>
            <button class="btn-agregar">Agregar al carrito</button>
            `;
            const botonAgregar = productoDiv.querySelector(".btn-agregar");
            botonAgregar.addEventListener("click", () => {
                agregarAlCarrito(fruta);
            });

        contenedor.appendChild(productoDiv);
    })
}

// ej 4 funcion q filtre las frutas por nombre y muestre solo las q coincidan con el texto ingresado en la barra de busqueda
function filtrarFrutas() {
    const inputBusqueda = document.querySelector(".barra-busqueda"); 
        if (!inputBusqueda) {
            console.warn("No se encontró el input con clase '.barra-busqueda'."); 
            return; 
        }
        inputBusqueda.addEventListener("input", (e) => {
            //pasamos texto ingresado a minuscula para q no sea case sensitive
            const valorBusqueda = e.target.value.toLowerCase();
            // filtramos el array frutas para q solo queden los q contengan el texto ingresado
            const frutasFiltradas = frutas.filter(fruta => fruta.nombre.toLowerCase().includes(valorBusqueda));
            cargarFrutas(frutasFiltradas);
        });
}
// ej 5, (1) implemetar la func del carrito, 
// (2) incorporar la fun mostrarCarrito asociada al boton "Agregar al carrito" de cada producto,
// (3) incorporar la funcion eliminarProducto asociada al btn del carrito.

//ej 6, almacena los prd de carrito en localStorage 

//aca buscamos los productos en el localStorage, o, creamos un array vacio
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//con esta agrego los preoductos a mi carrito (desp tengo q conectarlo con el boton "Agregar al carrito" de cada producto{en cargarFrutas()})
function agregarAlCarrito(fruta) {
       // Verificar si el producto ya existe en el carrito
    const itemExistente = carrito.find(item => item.id === fruta.id);
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({ ...fruta, cantidad: 1 });
    }

    console.log(`Producto agregado al carrito: ${fruta.nombre}`);
    console.log(`Carrito actual:`, carrito);

    mostrarCarrito();
    guardarCarritoEnStorage(); // Guardar el carrito en localStorage después de agregar un producto

}

function eliminarDelCarrito(indice) {
    //quito el elemento en la posicion del indice del array carrito
    carrito.splice(indice, 1);
    console.log(`Producto eliminado del carrito`);
    guardarCarritoEnStorage(); // Guardar el carrito en localStorage después de eliminar un producto
    mostrarCarrito();
}

//ej 7 nuevo btn de cantidades
function aumentarCantidad(id) {
    const item = carrito.find(fruta => fruta.id === id);
    if (item) {
        item.cantidad += 1;
        guardarCarritoEnStorage();
        mostrarCarrito();
    }
}
function disminuirCantidad(id) {    
    const item = carrito.find(fruta => fruta.id === id);
    if (item) {
        item.cantidad -= 1;
        //cond para q se elimine si era el utimo producto del carrito
        if (item.cantidad <= 0) {
            eliminarDelCarrito(carrito.findIndex(f => f.id === id));
        } else {
            guardarCarritoEnStorage();
            mostrarCarrito();
        }
    }
}


function mostrarCarrito() {
    const carritoFrutas = document.getElementById("items-carrito");
    const contadorCarrito = document.getElementById("contador-carrito");
    const totalCarrito = document.querySelector(".total-carrito");
    const precioTotal = document.getElementById("precio-total");
    const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
    
    if (!carritoFrutas) return; // Verifico si el elemento existe antes de continuar

    carritoFrutas.innerHTML = ""; // limpio el contenedor del carrito antes de mostrar los productos
    //estando vacio
    if (carrito.length === 0) {
        carritoFrutas.innerHTML = `
        <div class="estado-carrito-vacio">  
        <img src="img/carro.png" alt="Carrito vacío" class="carrito-vacio">
        <p>No hay productos en el carrito</p> 
        </div> 
        `;
    
    if(contadorCarrito) contadorCarrito.textContent = "0";
    if(precioTotal) precioTotal.textContent = "0";
    if (totalCarrito) totalCarrito.style.display = "none";
    if (btnVaciarCarrito) btnVaciarCarrito.style.display = "none"; 
    return;
    };

    if (totalCarrito) totalCarrito.style.display = "flex";
    if (btnVaciarCarrito) btnVaciarCarrito.style.display = "inline-block";


    //creo lista ul para contener los productos del carrito
    const listaCarrito = document.createElement("ul");
    listaCarrito.classList.add("lista-carrito");

    let total = 0;
    let contador = 0;

    //recorro el carrito y creo un li para cada producto
    carrito.forEach((fruta, index) => {
        const cantidad = fruta.cantidad || 1; // Si no tiene cantidad, asumimos que es 1
        const subtotal = fruta.precio * cantidad;
        total += subtotal;
        contador += cantidad;

        const itemCarrito = document.createElement("li");
        itemCarrito.classList.add("bloque-item");
        itemCarrito.innerHTML = `
            <span>${fruta.nombre} - $${fruta.precio}</span>
            <button class="btn-sumar">+</button>
            <span>${cantidad}</span>
            <button class="btn-restar">-</button>
            <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;

        itemCarrito.querySelector(".btn-sumar").addEventListener("click", () => {
            aumentarCantidad(fruta.id);
        });
        itemCarrito.querySelector(".btn-restar").addEventListener("click", () => {
            disminuirCantidad(fruta.id);
        });

        //preparo el boton eliminar para q elimine el producto del carrito
        const botonEliminar = itemCarrito.querySelector(".btn-eliminar");
        botonEliminar.addEventListener("click", () => {
            eliminarDelCarrito(index);
        });

        listaCarrito.appendChild(itemCarrito);
    });

    carritoFrutas.appendChild(listaCarrito);

    // actualizo el contador y total del carrito
    if(contadorCarrito) contadorCarrito.textContent = contador;
    if(precioTotal) precioTotal.textContent = `$${total}`;

}

//ej 8, ordenar frutas por precio de menor a mayor y de mayor a menor y de az y za

function ordenarFrutas(){
    const btnAz = document.getElementById("btn-ordenar-az");
    const btnZa = document.getElementById("btn-ordenar-za");
    const btnPrecioAsc = document.getElementById("btn-ordenar-preciomenor");
    const btnPrecioDesc = document.getElementById("btn-ordenar-preciomayor");
    //condicionales para q no tire error si no encuentra los botones
    if (btnAz){
        btnAz.addEventListener("click", () => { // Ordenar de A a Z
            const frutasOrdenadas = [...frutas].sort((a, b) => a.nombre.localeCompare(b.nombre));
            cargarFrutas(frutasOrdenadas);
        });
    }
    if (btnZa){
        btnZa.addEventListener("click", () => { // Ordenar de Z a A
            const frutasOrdenadas = [...frutas].sort((a, b) => b.nombre.localeCompare(a.nombre));
            cargarFrutas(frutasOrdenadas);
        });
    }
    if (btnPrecioAsc){
        btnPrecioAsc.addEventListener("click", () => { // Ordenar por precio de menor a mayor
            const frutasOrdenadas = [...frutas].sort((a, b) => a.precio - b.precio);
            cargarFrutas(frutasOrdenadas);
        });
    }
    if (btnPrecioDesc){
        btnPrecioDesc.addEventListener("click", () => { // Ordenar por precio de mayor a menor
            const frutasOrdenadas = [...frutas].sort((a, b) => b.precio - a.precio);
            cargarFrutas(frutasOrdenadas);
        });
    }

}

//ej 9, vaciar carrito, si no hsay productos en el carrito, mostrar img/gif carrito vacio
function vaciarCarrito() {
    // vacio el array carrito y lo guardo en el localStorage
    carrito.length = 0;   
    guardarCarritoEnStorage();
    mostrarCarrito();
}

function confBtnVaciar() {
const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
    if (btnVaciarCarrito) {
        btnVaciarCarrito.addEventListener("click", vaciarCarrito);
    }
}

// esto lo q hace es sincronizar los cambios en el almacenamiento local
function guardarCarritoEnStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



// funcion q se ejecuta al cargar la pagina
function init() { 
        imprimirDatosAlumno();
     // cargo la funcion cargarFrutas para que se ejecute al cargar la pagina
        cargarFrutas();
        //cargo la funcion del buscador
        filtrarFrutas();
        //cargo la funcion de ordenamiento
        ordenarFrutas(); // Ordeno por precio de menor a mayor al cargar la página
        confBtnVaciar();
        //cargo la fun mostrar carrito
        mostrarCarrito();

}
    
    
document.addEventListener("DOMContentLoaded", init);

