import axios from "axios"

console.log("Ambiente: ", process.env.NODE_ENV)
//const URL_API_PRODUCTOS = "https://655cc0a425b76d9884fde4c9.mockapi.io/productos/"
//const URL_API_PRODUCTOS = "http://localhost:8080/api/productos/"
const URL_API_PRODUCTOS = process.env.NODE_ENV === "production" ? "/api/productos/" : `http://localhost:${process.env.REACT_APP_PORT_SRV_DEV}/api/productos/`



const proxyProducto = producto => {
    const handler ={
        get: function (target, prop, receiver) { //target es el objeto que se pasa, prop la propiedad que se lee, receiver el propio proxy
            
            if (prop === "id") {
                const id = target._id
                target.id = id
                return id
            }
            
            return Reflect.get(...arguments)

        }
    }
    return new Proxy(producto,handler)
}

const eliminarPropiedad = (obj,prop) =>{
    const objClon = {...obj}
    delete objClon[prop]
    return objClon
}

export async function getProductos() {
    try {
        const {data:productos} = await axios.get(URL_API_PRODUCTOS)
        const productosProxy = productos.map(producto => proxyProducto(producto))
        return productosProxy
    }
    catch (error) {
        console.log("Error Axios: ", error.message)
        return []
    }
}

export async function guardarProductos(producto) {
    try {
        const {data:productoGuardado} = await axios.post(URL_API_PRODUCTOS, producto)
        return proxyProducto(productoGuardado)
    }
    catch (error) {
        console.log("Error Axios: ", error.message)
        return []
    }
}

export async function actualizarProductos(id, producto) {
    try {
        const productoSin_ID= eliminarPropiedad(producto, "_id")
        const rta = await axios.put(URL_API_PRODUCTOS + id, productoSin_ID)
        return proxyProducto(rta.data)
    }
    catch (error) {
        console.log("Error Axios: ", error.message)
        return []
    }
}

export async function borrarProductos(id) {
    try {
        const {data:productoEliminado} = await axios.delete(URL_API_PRODUCTOS + id)
        return proxyProducto(productoEliminado)
    }
    catch (error) {
        console.log("Error Axios: ", error.message)
        return {}
    }
}