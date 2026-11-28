
// Miguel Zaiter - 2025-0928

const form = document.getElementById('formProducto')
const tabla = document.getElementById('tablaProductos')
const nombre = document.getElementById('nombre')
const precio = document.getElementById('precio')
const cantidad = document.getElementById('cantidad')
const mensaje = document.getElementById('mensaje')
const btnGuardar = document.getElementById('btnGuardar')
const btnCancelar = document.getElementById('btnCancelar')
const titulo = document.getElementById('tituloFormulario')
const buscarProducto = document.getElementById('buscarProducto')
const contadorProductos = document.getElementById('contadorProductos')

let idEditar = null
let listaProductos = []

// Calcular el valor total del inventario
function calcularValorInventario() {
    const total = listaProductos.reduce((acumulado, producto) =>
        acumulado + producto.precio * producto.cantidad, 0
    )

    document.getElementById('valorInventario').textContent =
        'Valor total del inventario: RD$ ' + total.toFixed(2)
}

// Mostrar mensajes
function mostrarMensaje(texto, error = false) {
    mensaje.textContent = texto
    mensaje.style.color = error ? 'red' : 'green'
}

// Realizar peticiones a la API
async function solicitar(url, opciones = {}) {
    const respuesta = await fetch(url, opciones)
    const datos = await respuesta.json()

    if (!respuesta.ok) {
        throw new Error(datos.mensaje || 'Error en la solicitud')
    }

    return datos
}

// GET - Cargar todos los productos
async function cargarProductos() {
    try {
        listaProductos = await solicitar('/productos')

        contadorProductos.textContent =
            'Total de productos: ' + listaProductos.length

        mostrarProductos()
    } catch (error) {
        mostrarMensaje(error.message, true)
    }
}

// Mostrar y filtrar productos por nombre
function mostrarProductos() {
    calcularValorInventario()

    const busqueda = buscarProducto.value.trim().toLowerCase()

    const productos = listaProductos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda)
    )

    tabla.innerHTML = ''

    if (productos.length === 0) {
        tabla.innerHTML = listaProductos.length === 0
            ? '<tr><td colspan="4">No hay productos registrados</td></tr>'
            : '<tr><td colspan="4">No se encontraron productos</td></tr>'
        return
    }

    productos.forEach(producto => {
        const fila = document.createElement('tr')

        const celdaNombre = document.createElement('td')
        celdaNombre.textContent = producto.nombre

        const celdaPrecio = document.createElement('td')
        celdaPrecio.textContent = 'RD$ ' + producto.precio.toFixed(2)

        const celdaCantidad = document.createElement('td')
        celdaCantidad.textContent = producto.cantidad

        // Indicador de stock bajo
        if (producto.cantidad <= 5) {
            celdaCantidad.textContent += ' - Stock bajo'
            celdaCantidad.style.color = '#dc2626'
            celdaCantidad.style.fontWeight = 'bold'
        }
        const acciones = document.createElement('td')

        const btnEditar = document.createElement('button')
        btnEditar.textContent = 'Editar'
        btnEditar.className = 'editar'
        btnEditar.onclick = () => editarProducto(producto.id)

        const btnEliminar = document.createElement('button')
        btnEliminar.textContent = 'Eliminar'
        btnEliminar.className = 'eliminar'
        btnEliminar.onclick = () => eliminarProducto(producto.id)

        acciones.append(btnEditar, btnEliminar)

        fila.append(
            celdaNombre,
            celdaPrecio,
            celdaCantidad,
            acciones
        )

        tabla.appendChild(fila)
    })
}

// POST y PUT - Registrar o actualizar
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const producto = {
        nombre: nombre.value.trim(),
        precio: Number(precio.value),
        cantidad: Number(cantidad.value)
    }

    const editando = idEditar !== null

    const metodo = editando ? 'PUT' : 'POST'

    const url = editando
        ? `/productos/${idEditar}`
        : '/productos'

    try {
        await solicitar(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        })

        mostrarMensaje(
            editando
                ? 'Producto actualizado correctamente'
                : 'Producto registrado correctamente'
        )

        limpiarFormulario()
        await cargarProductos()

    } catch (error) {
        mostrarMensaje(error.message, true)
    }
})

// GET - Obtener producto para editar
async function editarProducto(id) {
    try {
        const producto = await solicitar(`/productos/${id}`)

        idEditar = producto.id

        nombre.value = producto.nombre
        precio.value = producto.precio
        cantidad.value = producto.cantidad

        titulo.textContent = 'Editar producto'
        btnGuardar.textContent = 'Guardar cambios'
        btnCancelar.hidden = false

        nombre.focus()

    } catch (error) {
        mostrarMensaje(error.message, true)
    }
}

// DELETE - Eliminar producto
async function eliminarProducto(id) {
    if (!confirm('¿Deseas eliminar este producto?')) {
        return
    }

    try {
        await solicitar(`/productos/${id}`, {
            method: 'DELETE'
        })

        if (idEditar === id) {
            limpiarFormulario()
        }

        mostrarMensaje('Producto eliminado correctamente')
        await cargarProductos()

    } catch (error) {
        mostrarMensaje(error.message, true)
    }
}

// Restablecer formulario
function limpiarFormulario() {
    form.reset()
    idEditar = null

    titulo.textContent = 'Registrar producto'
    btnGuardar.textContent = 'Agregar producto'
    btnCancelar.hidden = true
}

btnCancelar.addEventListener('click', limpiarFormulario)

// Buscar productos mientras el usuario escribe
buscarProducto.addEventListener('input', mostrarProductos)

// Cargar productos al iniciar
cargarProductos()
