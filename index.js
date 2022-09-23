const express = require("express")
const routerProductos = require("./routers/productos")
const routerCarrito = require("./routers/carrito")
// const routerAdmin = require("./routers/admin")

const app = express()
let acceso = true

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

if (acceso === true) {
	app.use("/api/productos", routerProductos)
	app.use("/api/carrito", routerCarrito)
} else {
	console.log("No tiene acceso")
}

/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error en servidor ${error}`))
