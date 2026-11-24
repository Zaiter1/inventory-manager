// Miguel Zaiter - 2025-0928
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

app.use(express.json())

const dataPath = path.join(__dirname, 'productos.json')

const productos = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

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

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})