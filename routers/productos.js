const express = require("express")
const { productosDaos: Producto } = require("../daos/mainDaos")
const routerProductos = express.Router()

routerProductos.get("/:id", async (req, res) => {
	const num = req.params.id
	const prod = new Producto()
	if (num === "all") {
		try {
			const productos = await prod.getAll()
			res.status(200).send({
				status: 200,
				data: { productos },
				message: "Productos encontrados",
			})
		} catch (error) {
			res.status(500).send({
				status: 500,
				message: error.message,
			})
		}
	} else {
		try {
			const producto = await prod.getById(num)
			res.status(200).send({
				status: 200,
				data: { producto },
				message: "Producto encontrado",
			})
		} catch (error) {
			res.status(500).send({
				status: 500,
				message: error.message,
			})
		}
	}
})

routerProductos.post(
	"/",
	(req, res, next) => {
		if (req.query.admin == 1) {
			console.log("Se conecto un admin")
			next()
		} else {
			res.send({ error: "No tiene permisos para realizar esta accion" })
		}
	},
	async (req, res) => {
		try {
			const prod = new Producto()
			const id = await prod.save(req.body)
			res.status(200).send({
				status: 200,
				data: { id },
				message: "Producto guardado",
			})
		} catch (error) {
			res.status(500).send({
				status: 500,
				message: error.message,
			})
		}
	}
)

routerProductos.put(
	"/:id",
	(req, res, next) => {
		if (req.query.admin == 1) {
			console.log("Se conecto un admin")
			next()
		} else {
			res.send({ error: "No tiene permisos para realizar esta accion" })
		}
	},
	async (req, res) => {
		const num = req.params.id
		try {
			let idProd = Number(num)
			const prod = new Producto()
			const cambio = req.body
			const cambiado = await prod.changeById(idProd, cambio)
			res.status(200).send({
				status: 200,
				data: { cambiado },
				message: "Producto actualizado",
			})
		} catch (error) {
			res.status(500).send({
				status: 500,
				message: error.message,
			})
		}
	}
)

routerProductos.delete(
	"/:id",
	(req, res, next) => {
		if (req.query.admin == 1) {
			console.log("Se conecto un admin")
			next()
		} else {
			res.send({ error: "No tiene permisos para realizar esta accion" })
		}
	},
	async (req, res) => {
		const num = req.params.id
		try {
			let idProd = Number(num)
			const prod = new Producto()
			const borrar = await prod.deleteById(idProd)
			res.status(200).send({
				status: 200,
				data: { borrar },
				message: "Producto eliminado",
			})
		} catch (error) {
			res.status(500).send({
				status: 500,
				message: error.message,
			})
		}
	}
)

module.exports = routerProductos
