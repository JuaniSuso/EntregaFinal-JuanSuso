/* FUNCIONES */

const login = () => {
  let nombre = "";
  let contrasenia = "";

  while (nombre === "" || contrasenia === "") {
    nombre = prompt("Ingrese su nombre de usuario");
    contrasenia = prompt("Ingrese su contraseña");

    if (nombre === "" && contrasenia === "") {
      alert(
        "Usted no ha ingresado ningún nombre ni contraseña. Por favor, vuelva a intentarlo."
      );
    } else if (nombre === "") {
      alert(
        "Usted no ha ingresado ningún nombre. Por favor, vuelva a intentarlo."
      );
    } else if (contrasenia === "") {
      alert(
        "Usted no ha ingresado ninguna contraseña. Por favor, vuelva a intentarlo."
      );
    } else {
      alert("Bienvenido " + nombre + " a nuestra tienda");
    }
  }
};

login();

/*FUNCION CONSTRUCTORA*/

function Articulos(id, nombre, precio, stock) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.stock = stock;
  this.contador = 0;
  this.totalProducto = 0;

  this.mostrarStock = function () {
    alert(
      `El stock disponible de ${this.nombre} es ${this.stock}. Por favor, ingrese una cantidad que no supere nuestro stock`
    );
  };

  this.stockAhora = function (cant) {
    if (!isNaN(cant) && cant > 0) {
      this.stock -= cant;
    }
  };

  this.calcularCompra = function () {
    this.totalProducto = this.contador * this.precio;
    return this.totalProducto;
  };

  this.cantidadCompra = function () {
    let numero = false;
    while (!numero) {
      let cant = parseFloat(
        prompt("Ingrese la cantidad del producto que desea adquirir:")
      );
      numero = !isNaN(cant);
      if (numero && cant > 0) {
        if (cant <= this.stock) {
          this.contador += cant;
          return cant;
        } else {
          this.mostrarStock();
        }
      } else {
        alert(
          "Ha ocurrido un error al intentar ingresar la cantidad. Por favor, intente nuevamente"
        );
      }
    }
  };
}

/*CREACIÓN ARRAY*/

const arrayProductos = [];

/*PRODUCTOS*/

const monitores = new Articulos(1, "Monitor", 70000, 10);
arrayProductos.push(monitores);
const ram = new Articulos(2, "MemoriasRam", 25000, 20);
arrayProductos.push(ram);
const video = new Articulos(3, "Graficas", 120000, 5);
arrayProductos.push(video);
const procesadores = new Articulos(4, "Procesadores", 100000, 5);
arrayProductos.push(procesadores);

/*MENSAJE TIENDA LUEGO DE LOGIN*/

alert(
  `Bienvenido a nuestra tienda digital. A continuación, se le mostrará la información de los códigos de los productos que tenemos actualmente. Si quiere añadir alguno, ingrese el número correspondiente. \n1-${arrayProductos[0].nombre} (Stock: ${arrayProductos[0].stock})......($${arrayProductos[0].precio})\n2-${arrayProductos[1].nombre} (Stock: ${arrayProductos[1].stock}).................($${arrayProductos[1].precio}) \n3-${arrayProductos[2].nombre} ((Stock: ${arrayProductos[2].stock}))......($${arrayProductos[2].precio}) \n4-${arrayProductos[3].nombre} (Stock: ${arrayProductos[3].stock})..............($${arrayProductos[3].precio})\n\n Por favor lea detenidamente los códigos de los productos y prepárese para realizar su pedido. Al final, se le devolverá el monto final de la compra. Si no desea comprar, o si ya finalizó su compra, ingrese el codigo 0.`
);

let codigoProducto = 0;
let cantidad;

do {
  codigoProducto = parseFloat(
    prompt(
      "Ingrese el código del producto que quiera añadir a su carrito de compra. Si no quiere comprar nada o ya terminó con su compra, ingrese el nñumero 0"
    )
  );
  switch (codigoProducto) {
    case 1:
      cantidad = arrayProductos[0].cantidadCompra();
      arrayProductos[0].stockAhora(cantidad);
      break;
    case 2:
      cantidad = arrayProductos[1].cantidadCompra();
      arrayProductos[1].stockAhora(cantidad);
      break;
    case 3:
      cantidad = arrayProductos[2].cantidadCompra();
      arrayProductos[2].stockAhora(cantidad);
      break;
    case 4:
      cantidad = arrayProductos[3].cantidadCompra();
      arrayProductos[3].stockAhora(cantidad);
      break;
    case 5:
      cantidad = arrayProductos[4].cantidadCompra();
      arrayProductos[4].stockAhora(cantidad);
      break;
    case 0:
      break;
    default:
      alert(
        "El código ingresado debe coincidir con algun producto, o si desea salir, recuerde ingresar 0"
      );
  }
} while (codigoProducto != 0);

arrayProductos.forEach((producto) => producto.calcularCompra());

let totalCarrito = 0;

arrayProductos.forEach((producto) => {
  totalCarrito += producto.totalProducto;
});

alert(
  `Su factura final: \nMonitores...${arrayProductos[0].calcularCompra()} \nMemorias RAM...${arrayProductos[1].calcularCompra()} \nPlacas de video...${arrayProductos[2].calcularCompra()}  \nProcesadores...${arrayProductos[3].calcularCompra()} \n\nEl total de la compra ha sido: $${totalCarrito} `
);


if(totalCarrito !=0 ){
    alert("Muchas gracias por la compra!")
}
else{
    alert("Lamentamos que nuestros productos no hayan sido de su gusto. Vuelva pronto")
}