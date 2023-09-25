const productos = [];
let carrito = getCarritoLocalStorage() || [];

const listaProductos = document.getElementById('listaProductos');
const carritoProductos = document.getElementById('carritoProductos');
const montoFinal = document.getElementById('montoFinal');
const finalizarCompraButton = document.getElementById('finalizarCompra');


fetch('JSON/data.json')
  .then(response => response.json())
  .then(data => {
    productos.push(...data); 
    
  })
  .catch(error => console.error('Error al cargar los datos:', error));

listaProductos.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-comprar')) {
    const producto = e.target.getAttribute('data-producto');
    const productoEncontrado = productos.find((p) => p.nombre === producto);

    if (productoEncontrado) {
      carrito.push(productoEncontrado);
      setCarritoLocalStorage();
      actualizarCarrito();

      Swal.fire(
        'Objeto Agregado!',
        'Haz agregado un objeto al carrito!',
        'success'
      )
    }
  }
});


actualizarCarrito();

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
  setCarritoLocalStorage(); 
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

finalizarCompraButton.addEventListener('click', () => {
  Swal.fire({
    title: '¿Confirmar compra?',
    text: "¿Estás seguro de que deseas finalizar la compra?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, finalizar compra',
    cancelButtonText: 'Cancelar compra'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Compra realizada',
        'Gracias por confiar en nosotros.',
        'success'
      );
    }
  });
});

 
  
  
  
  




  
  

 



