## Información 

- Estudiante: Miguel Ángel Zaiter Balbuena
- Matrícula: 2025-0928
- Asignatura: Programación III
- Institución: ITLA
- Modalidad: Individual
- TAREA 3

# Inventory Manager

Sistema CRUD de gestión de inventario desarrollado como parte de la Tarea 3 de Programación III, aplicando Git y Git Flow.

## Descripción del proyecto

Inventory Manager permite registrar, consultar, actualizar y eliminar productos de un inventario mediante una interfaz web conectada a una API REST.

Los datos se almacenan de forma persistente en un archivo JSON.

## Tecnologías utilizadas

- Node.js
- Express
- HTML5
- CSS3
- JavaScript
- JSON
- Git y GitHub
- Postman

## Funcionalidades

- Registro de productos.
- Consulta de todos los productos.
- Consulta de productos por ID.
- Actualización de productos.
- Eliminación de productos.
- Validación de nombre, precio y cantidad.
- Almacenamiento persistente.
- Interfaz web para gestionar el inventario.

## Instalación y ejecución

1. Clonar el repositorio:

   git clone https://github.com/Zaiter1/inventory-manager.git

2. Entrar a la carpeta del proyecto:

   cd inventory-manager

3. Instalar las dependencias:

   npm install

4. Ejecutar el servidor:

   node index.js

5. Abrir en el navegador:

   http://localhost:3000

## Endpoints de la API REST

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /productos | Consultar todos los productos |
| GET | /productos/:id | Consultar un producto por ID |
| POST | /productos | Registrar un producto |
| PUT | /productos/:id | Actualizar un producto |
| DELETE | /productos/:id | Eliminar un producto |

## Estructura del proyecto

    inventory-manager/
    ├── public/
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    ├── index.js
    ├── productos.json
    ├── package.json
    ├── package-lock.json
    ├── .gitignore
    └── README.md

## Estrategia de Git Flow

Para el desarrollo del proyecto se utilizaron tres ramas principales:

- main: versión estable del proyecto.
- developer: integración de funcionalidades.
- qa: pruebas y verificación de calidad.

### Ramas de funcionalidades

- feature/create-product
- feature/read-products
- feature/update-product
- feature/delete-product
- feature/validations-and-improvements

Cada funcionalidad se desarrolla en una rama independiente y se integra mediante Pull Requests hacia developer, qa y main, siguiendo la distribución requerida por la actividad académica.

### Distribución planificada de Pull Requests

| Funcionalidad | developer | qa | main |
|---------------|-----------|----|------|
| Create | #1 | #2 | #3 |
| Read | #4 | #5 | #6 |
| Update | #7 | #8 | #9 |
| Delete | #10 | #11 | #12 |
| Validaciones y mejoras | #13 | #14 | #15 |

## Pruebas realizadas

- Pruebas de los endpoints mediante Postman.
- Verificación de códigos de respuesta HTTP.
- Validación de datos correctos e incorrectos.
- Manejo de productos inexistentes.
- Pruebas de las operaciones CRUD desde la interfaz web.
- Verificación de la persistencia de los datos.
- Pruebas de funcionalidades en la rama qa.

