let productos = [];

let carrito = [];

productos.push(new Producto("Remera01", "Oversize", 5000));
productos.push(new Producto("Remera02", "Oversize", 5000));
productos.push(new Producto("Remera03", "Comun", 4500));
productos.push(new Producto("Pantalon01", "Mom", 8000));
productos.push(new Producto("Pantalon02", "Recto", 7600));
productos.push(new Producto("Pantalon03", "Jogger", 7800));
productos.push(new Producto("Zapatilla01", "Low", 12000));
productos.push(new Producto("Zapatilla02", "High", 12500));
productos.push(new Producto("Zapatillas03", "Mid", 13000));


localStorage.setItem('producto', JSON.stringify(productos));


const selectorProd = document.getElementById('selectProd');
const btnAgregar = document.getElementById('agregar');
const btnComprar = document.getElementById('btn-comprar');
const btnVaciar = document.getElementById('btn-vaciar');
const total = document.getElementById('totalPagar');
const listaProdAgg = document.getElementById('lista-prod-agg');
const contenedor = document.getElementById('contenedor');

escuchadorEventos();

function escuchadorEventos() {
    window.addEventListener('DOMContentLoaded', traerProd);
    btnVaciar.addEventListener('click', vaciarCarrito);
    btnComprar.addEventListener('click', comprarProd);

    btnAgregar.addEventListener('submit', (e) => {
        e.preventDefault();
        const prodSelect = productos[+selectorProd.value];

        console.log(prodSelect);
        
        const selectedIndex = selectorProd.value;
        if (selectedIndex != -1) {
            const productoSeleccionado = productos[selectedIndex];
            const itemExistente = carrito.find(item => item.producto === productoSeleccionado);

            if (itemExistente) {
                itemExistente.cantUnidades++;
                actTablaCarrito();
            } else {
                const nuevoItem = new Prenda (productoSeleccionado, 1);
                carrito.push(nuevoItem);
                nuevaFila(nuevoItem);
            }
        }

        const nuevoItem = new Prenda(prodSelect, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
    });
}


function traerProd() {
    productos = JSON.parse(localStorage.getItem('producto')) || [];
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    armandoDropDown();
    actTablaCarrito();
}

function armandoDropDown() {
    productos.forEach((producto, index) => {
        let o = document.createElement("option");
        o.textContent = `${producto.titulo + " " + producto.tipoPrenda}: $${producto.precio}`;
        o.value = index;
        selectorProd.appendChild(o);
    });

}


function actTablaCarrito() {
    listaProdAgg.innerHTML = '';
    total.innerText = 0;
    // carrito.length || btnVaciar.setAttribute('disabled', true);

    carrito.forEach((prenda) => {
        nuevaFila(prenda);
    })
}

function nuevaFila(item) {
    const nuevoTr = document.createElement('tr');
    let nuevoTd = document.createElement('td');

    nuevoTd.classList.add('font-white');
    nuevoTd = document.createElement('td');
    nuevoTd.textContent = item.producto.titulo;
    nuevoTr.appendChild(nuevoTd);

    nuevoTd.classList.add('font-white');
    nuevoTd = document.createElement('td');
    nuevoTd.textContent = item.producto.precio;
    nuevoTr.appendChild(nuevoTd);

    nuevoTd.classList.add('font-white');
    nuevoTd = document.createElement('td'); 
    nuevoTd.textContent = item.producto.tipoPrenda;
    nuevoTr.appendChild(nuevoTd);

    nuevoTd.classList.add('font-white');
    nuevoTd = document.createElement('td');
    nuevoTd.textContent = item.cantUnidades;
    nuevoTr.appendChild(nuevoTd);

    listaProdAgg.appendChild(nuevoTr);
    nuevoTr.appendChild(nuevoTd);

    total.innerText = carrito.reduce((suma, item) => suma + item.producto.precio * item.cantUnidades, 0);
}


function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    listaProdAgg.innerHTML = '';
    listaProdAgg === "" && btnVaciar.preventDefault();
    total.innerText = 0;
}

function comprarProd(){
    const divCompra = document.createElement('div');
    let msjDiv = document.createElement('h4');

    if (carrito.length > 0) {
        msjDiv.textContent = "Compra exitosa";
        divCompra.appendChild(msjDiv);
        contenedor.appendChild(divCompra);
    }

    btnComprar.disabled = true;
}

