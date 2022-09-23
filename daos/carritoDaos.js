const admin = require("firebase-admin")
const config = require("./db/ecommerce-backend-116b4-firebase-adminsdk-lyrkn-f9460de087.json")
const Producto = require("./productosDaos")

const Productos = new Producto()

class Carrito {
	constructor() {
		admin.initializeApp({
			credential: admin.credential.cert(config),
		})
	}

	async newCarrito() {
		const db = admin.firestore()
		const query = db.collection("carritos")
		let time = new Date()
		try {
			const doc = query.doc()
			const carrito = await doc.create({
				timestamp: time.toString(),
				productos: [],
			})
			return carrito
		} catch (error) {
			throw Error(error.message)
		}
	}

	async getCarritoById(idC) {
		try {
			const db = admin.firestore()
			const query = db.collection("carritos")
			const doc = query.doc(String(idC))
			const encontrado = await doc.get()
			return encontrado.data()
		} catch (error) {
			throw Error(error.message)
		}
	}

	async deleteCarritoById(idC) {
		try {
			const db = admin.firestore()
			const query = db.collection("carritos")
			const doc = query.doc(String(idC))
			await doc.delete()
		} catch (error) {
			throw Error(error.message)
		}
	}

	async deleteProductoDeCarrito(idCarrito, idProducto, idEnCarrito) {
		try {
			let productoAtlas = await Productos.getById(idProducto)

			const db = admin.firestore()
			const query = db.collection("carritos")
			const doc = query.doc(idCarrito)

			productoAtlas.idC = idEnCarrito

			const item = await doc.update({
				productos: admin.firestore.FieldValue.arrayRemove(
					String(productoAtlas)
				),
			})
		} catch (error) {
			throw Error(error.message)
		}
	}

	async agregarProducto(idCarrito, idProducto) {
		try {
			const random = (min, max) => {
				return Math.floor(Math.random() * (max - min + 1)) + min
			}

			let productoAtlas = await Productos.getById(idProducto)

			const db = admin.firestore()
			const query = db.collection("carritos")
			const doc = query.doc(idCarrito)

			let idrandom = random(1, 1000000)

			productoAtlas.idC = String(idrandom)

			const item = await doc.update({
				productos: admin.firestore.FieldValue.arrayUnion(String(productoAtlas)),
			})
		} catch (error) {
			throw Error(error.message)
		}
	}
}

module.exports = Carrito
