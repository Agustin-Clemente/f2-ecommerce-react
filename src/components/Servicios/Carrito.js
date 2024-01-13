import axios from "axios"

//const URL_API_CARRITO = "https://655cc0a425b76d9884fde4c9.mockapi.io/carrito/"
const URL_API_CARRITO = "http://localhost:8080/api/carrito/"


export async function enviarCarrito(carrito) {
    try {
        const rta = await axios.post(URL_API_CARRITO, { pedido: carrito }) //debe ser un objeto para enviar a mockapi
        return rta.data
    }
    catch (error) {
        console.log("Error Axios: ", error.message)
        return []
    }
}