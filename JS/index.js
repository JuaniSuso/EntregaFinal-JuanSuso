// CREACIÓN DE ARRAYS

// CREACIÓN DE ARRAYS
const productos = [
    { nombre: 'Monitores', precio: 80000 }, // Corregido el precio
    { nombre: 'Memorias Ram', precio: 32000 }, 
    { nombre: 'Graficas', precio: 150000 },
    { nombre: 'Procesadores', precio: 140000 }
  ];
  
  let carrito = getCarritoLocalStorage() || [];
  
  // Lista de productos
  const listaProductos = document.getElementById('listaProductos');
  
  // LISTA DEL CARRITO
  const carritoProductos = document.getElementById('carritoProductos');
  
  // MONTO FINAL
  const montoFinal = document.getElementById('montoFinal');
  
  // BOTON FINALIZAR COMPRA DEL MODAL
  const finalizarCompraButton = document.getElementById('finalizarCompra');
  
  listaProductos.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-comprar')) {
      const producto = e.target.getAttribute('data-producto');
      const productoEncontrado = productos.find((p) => p.nombre === producto);
  
      if (productoEncontrado) {
        carrito.push(productoEncontrado);
        setCarritoLocalStorage();
        actualizarCarrito();
      }
    }
  });
  
 
  function actualizarCarrito() {
    carritoProductos.innerHTML = '';
    let total = 0;
  
    carrito.forEach((producto) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${producto.nombre}: $${producto.precio.toFixed(2)}`; 
      carritoProductos.appendChild(listItem);
      total += producto.precio;
    });
  
    montoFinal.textContent = total.toFixed(2);
  }
  
  finalizarCompraButton.addEventListener('click', () => {
 
    carrito = [];
    actualizarCarrito();
    $('#carritoModal').modal('hide'); 
  });

  function setCarritoLocalStorage(){
    localStorage.setItem('carrito' , JSON.stringify(carrito));
  }

  function getCarritoLocalStorage(){
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado !== null){
        return JSON.parse(carritoGuardado);
    } else {
        return null;
    }
    
  }


  
  

 



