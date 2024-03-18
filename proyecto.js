const comandos = ["ayuda", "carrito", "checkout"]

const productos = ["leche", "miel", "pan", "café", "chocolate", "huevo", "queso", "salame", "crema"]
const precios = [10, 30, 5, 10, 30, 5, 20, 20, 15]
const cantidad = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //último elemento: total de productos
const max = 10

let flag = false
let temp, i, out

function leerInput(input, productos, cantidad, max) {
    if (!input) return "carrito"

    if (comandos.includes(input)) {
        if (input == "ayuda") {
            alert("Nuestros productos disponibles son: leche ($10), miel ($30), pan ($5), café ($10), chocolate ($30), huevo ($5), queso ($20), salame ($20) y crema ($15).\n\nIngrese 'ayuda' para mostrar este cuadro de información.\nIngrese 'carrito' para ver su carrito de compras.\nIngrese 'checkout' para ir a pagar.")
            
            return false
        }
        else return input
    }

    if (productos.includes(input)) {
        cantidad[productos.indexOf(input)]++
        cantidad[productos.length]++

        if (cantidad[productos.length] == max) {
            alert ("Llegó al máximo de productos.")
            
            return "carrito"
        }
    }
    else alert("El producto ingresado no está disponible.")
    
    return false
}

function cantidadProductos(cantidad) {
    //devuelve la cantidad de productos únicos en el carrito
    let n = 0

    for (let i = 0; i < cantidad.length - 1; i++) {
        if (cantidad[i]) n++
    }

    return n
}

function primerProducto(cantidad) {
    //devuelve el índice del primer producto en el carrito o -1 si no hay productos
    for (let i = 0; i < cantidad.length - 1; i++) {
        if (cantidad[i]) return i
    }

    return -1
}

function ultimoProducto(cantidad) {
    //devuelve el índice del último producto en el carrito o -1 si no hay productos
    for (let i = cantidad.length - 2; i >= 0; i--) {
        if (cantidad[i]) return i
    }

    return -1
}

function monto(precios, cantidad) {
    let total = 0

    for (let i = 0; i < precios.length; i++) {
        total += precios[i] * cantidad[i]
    }

    return total
}

function agregarTexto(texto, productos, cantidad, i) {
    texto += cantidad[i] + " "

    if (cantidad[i] == 1) texto += productos[i]
    else texto += plural(productos[i])

    return texto
}

function plural(palabra) {
    if (palabra[palabra.length - 1] != "a" && palabra[palabra.length - 1] != "e") palabra += "e"

    return palabra += "s"
}

alert("Bienvenido")
alert("Ingrese 'ayuda' para ver los productos disponibles y más información.")

while (flag != "checkout") {
    while (!flag) {
        if (temp = leerInput(prompt("Cantidad de productos en el carrito: " + cantidad[productos.length] + ".\nSubtotal: $" + monto(precios, cantidad) + ".\n\n¿Qué desea agregar al carrito?"), productos, cantidad, max)) flag = temp
    }

    if (flag == "carrito") {
        if (!cantidad[productos.length]) {
            alert("El carrito está vacío.")

            flag = false
        }
        else {
            out = "El carrito contiene "

            if (cantidadProductos(cantidad) > 1) {
                out = agregarTexto(out, productos, cantidad, temp = primerProducto(cantidad))
                
                if (cantidadProductos(cantidad) > 2) {
                    for (i = temp + 1; i < ultimoProducto(cantidad); i++) {
                        if (cantidad[i]) {
                            out += ", "
                            out = agregarTexto(out, productos, cantidad, i)
                        }
                    }
                }

                out += " y "
            }
            
            out = agregarTexto(out, productos, cantidad, ultimoProducto(cantidad))

            alert(out + ".")

            if (cantidad[productos.length] == max || confirm("¿Desea ir a pagar?")) flag = "checkout"
            else flag = false
        }
    }
}

if (confirm("El total de la compra es de $" + monto(precios, cantidad) + ".\n\n¿Desea realizar el pago?")) alert("¡Gracias por su compra!")

alert("¡Lo esperamos pronto!")