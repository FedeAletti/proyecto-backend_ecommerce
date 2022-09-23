const express = require("express")
const { carritoDaos: Carrito } = require("../daos/mainDaos")
const routerCarrito = express.Router()

const Carro = new Carrito()

routerCarrito.post("/", async (req, res) => {
	try {
		const carrito = await Carro.newCarrito()
		res.status(200).send({
			status: 200,
			data: { carrito },
			message: "Carrito creado",
		})
	} catch (err) {
		res.status(500).send({
			status: 500,
			message: err.message,
		})
	}
})

routerCarrito.delete("/carrito/:id", async (req, res) => {
	const num = req.params.id
	try {
		const borrado = await Carro.deleteCarritoById(num)
		res.status(200).send({
			status: 200,
			data: { borrado },
			message: "Carrito eliminado",
		})
	} catch (err) {
		res.status(500).send({
			status: 500,
			message: err.message,
		})
	}
})

routerCarrito.post("/productos", async (req, res) => {
	try {
		let idCarrito = req.body.idC
		let idProducto = req.body.idP
		const producto = await Carro.agregarProducto(idC, idP)
		res.status(200).send({
			status: 200,
			data: { agregado },
			message: "Producto agregado al carrito",
		})
	} catch (err) {
		res.status(500).send({
			status: 500,
			message: err.message,
		})
	}
})

routerCarrito.delete("/eliminarProducto/:idC", async (req, res) => {
	const idCart = req.params.idC
	try {
		let idC = req.body.idC
		let idP = req.body.idP
		let idEnCarrito = idC
		const agregado = await Carro.eliminarProductoDeCarrito(
			idC,
			idP,
			idEnCarrito
		)
		res.status(200).send({
			status: 200,
			data: { agregado },
			message: "Producto eliminado del carrito",
		})
	} catch (err) {
		res.status(500).send({
			status: 500,
			message: err.message,
		})
	}
})

module.exports = routerCarrito
