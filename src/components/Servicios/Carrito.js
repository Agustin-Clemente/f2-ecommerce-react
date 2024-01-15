import axios from "axios"

//const URL_API_CARRITO = "https://655cc0a425b76d9884fde4c9.mockapi.io/carrito/"
//const URL_API_CARRITO = "http://localhost:8080/api/carrito/"

const URL_API_CARRITO = process.env.NODE_ENV === "production" ? "/api/carrito/" : `http://localhost:${process.env.REACT_APP_PORT_SRV_DEV}/api/carrito/`



export async function enviarCarrito(pedido) {
    try {
        const rta = await axios.post(URL_API_CARRITO,  pedido ) //debe ser un objeto para enviar a mockapi
        return rta.data
    }
    catch (error) {
        console.log("Error Axios: ", error.message)
        return []
    }
}