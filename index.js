// Miguel Zaiter - 2025-0928
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

app.use(express.json())

const dataPath = path.join(__dirname, 'productos.json')

const productos = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

// GET - Consultar todos los productos
app.get('/productos', (req, res) => {
    res.json(productos)
})

// GET - Consultar un producto por ID
app.get('/productos/:id', (req, res) => {
    const id = Number(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        })
    }

    res.json(producto)
})


// POST - Registrar un producto
app.post('/productos', (req, res) => {
    const { nombre, precio, cantidad } = req.body

    const nuevoProducto = {
        id: Date.now(),
        nombre,
        precio,
        cantidad
    }

    productos.push(nuevoProducto)

    fs.writeFileSync(dataPath, JSON.stringify(productos, null, 2))

    res.status(201).json(nuevoProducto)
})

// PUT - Actualizar un producto
app.put('/productos/:id', (req, res) => {
    const id = Number(req.params.id)
    const producto = productos.find(p => p.id === id)

    if (!producto) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        })
    }

    const { nombre, precio, cantidad } = req.body

    producto.nombre = nombre
    producto.precio = precio
    producto.cantidad = cantidad

    fs.writeFileSync(dataPath, JSON.stringify(productos, null, 2))

    res.status(200).json(producto)
})

// DELETE - Eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = productos.findIndex(p => p.id === id)

    if (index === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        })
    }

    productos.splice(index, 1)

    fs.writeFileSync(dataPath, JSON.stringify(productos, null, 2))

    res.status(200).json({
        mensaje: 'Producto eliminado correctamente'
    })
})

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})