import axios from "axios"

//const URL_API_CARRITO = "https://655cc0a425b76d9884fde4c9.mockapi.io/carrito/"
//const URL_API_CARRITO = "http://localhost:8080/api/carrito/"

const URL_API_CARRITO = process.env.NODE_ENV === "production" ? "/api/carrito/" : `http://localhost:${process.env.REACT_APP_PORT_SRV_DEV}/api/carrito/`



export async function enviarCarrito(pedido) {
    try {
        const {data:carritoGuardado} = await axios.post(URL_API_CARRITO,  pedido ) //debe ser un objeto para enviar a mockapi
        return carritoGuardado
    }
    catch (error) {
        console.log("Error Axios: ", error.message)
        return {}
    }
}

export async function getPreference(carrito) {
    console.log(carrito)

    const prefItems= {
        body: {
           items: carrito.map(producto => ({
        id: producto._id,
        title: producto.nombre,
        quantity: parseInt(producto.cantidad),
        unit_price: Number(producto.precio) 
    })),
    back_urls: {
        "success": window.location.origin + window.location.pathname,
        "failure": window.location.origin + window.location.pathname,
        "pending": window.location.origin + window.location.pathname
    },
    auto_return: "approved",
    }
}

    console.log(prefItems)

    //envio a backend, devuelve promesa, por eso es async la function
    return axios.post(URL_API_CARRITO + "mp/create_preference", prefItems)
    
}

 /* "success": `http://localhost:${config.PORT}/api/carrito/mp/feedback`,
        "failure": `http://localhost:${config.PORT}/api/carrito/mp/feedback`,
        "pending": `http://localhost:${config.PORT}/api/carrito/mp/feedback` */