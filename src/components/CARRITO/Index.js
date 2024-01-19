import { useState } from 'react'
import { useLocalStorage } from '../Hooks/useLocalStorage'
import { enviarCarrito, getPreference } from '../Servicios/Carrito'
import { Tabla } from './Tabla'
import './Index.css'
import { Button, Modal, Toast } from 'react-bootstrap'


import './pago.js'
import { Wallet } from '@mercadopago/sdk-react'



export function Index() {

    const [carrito, setCarrito] = useLocalStorage('carrito', [])

    const [borrarId, setBorrarId] = useState(null)

    const [compraStatus, setCompraStatus] = useState({ payment_id: "null", status: "null", merchant_order_id: "null" })


    //TOAST
    const [showToastNOT, setShowToastNOT] = useState(false);

    //CONTROLES DE MODAL
    const [show, setShow] = useState(false);
    const [showCarrito, setShowCarrito] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseCarrito = () => setShowCarrito(false);
    const handleShowCarrito = () => setShowCarrito(true);

    function modalBorrarAll() {
        handleShowCarrito()
    }

    function borrarAll() {
        setCarrito([])
        handleCloseCarrito()
    }

    function borrar(id) {
        if (id) {
            setBorrarId(id)
            handleShow()
        }
    }


    function borrarID() {
        const id = borrarId
        const carritoClon = [...carrito]
        const index = carritoClon.findIndex(p => p.id === id)
        carritoClon.splice(index, 1)
        setCarrito(carritoClon)
        handleClose()
    }

    function incrementarID(id) {
        const carritoClon = [...carrito]
        const producto = carritoClon.find(p => p.id === id)
        if (producto.cantidad < producto.stock) {
            producto.cantidad++
            setCarrito(carritoClon)
        } else {
            setShowToastNOT(true)
        }

    }

    function decrementarID(id) {
        const carritoClon = [...carrito]
        const producto = carritoClon.find(p => p.id === id)
        if (producto.cantidad > 1) {
            producto.cantidad--
            setCarrito(carritoClon)
        }
    }

    async function pedir(compra) {
        const carritoEnviado = await enviarCarrito({ compra: compra, pedido: carrito })
        console.log("Envio carrito...")
        console.log(carritoEnviado)
        console.log("Seteo carrito vacio...")
        setCarrito([])
        console.log("Carrito seteado vacio");
        //window.walletBrickController.unmount(); //para destruir brick
    }

    //Para boton MP
    const customization = {
        texts: {
            action: "buy",
            valueProp: "security_details"
        },
        visual: {
            buttonBackground: "white"
        }
    }

    function getQueryVariable(variable) {
        var query = window.location.hash.substring(1);
        var vars = query.split("&");
        for (var i=0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if(pair[0] === variable) {
                return pair[1];
            }
        }
        return "null";
     }

    const onReady = async () => {
        console.log("On ready MP")

        const status = getQueryVariable("status")
        console.log(status)
        const payment_id = getQueryVariable("payment_id")
        console.log(payment_id)
        const merchant_order_id = getQueryVariable("merchant_order_id")
        console.log(merchant_order_id)

        const compraParam = {}
        compraParam.payment_id = payment_id
        compraParam.status = status 
        compraParam.merchant_order_id = merchant_order_id 
        

        const queryParameters = new URLSearchParams(window.location.search); //agarra parametros de la URL
        /* //const queryParameters = new URLSearchParams(`${window.location.origin}/#/carrito/`.search); //agarra parametros de la URL
        //const queryParameters = new URLSearchParams(window.location.origin.search); //agarra parametros de la URL
        //const queryParameters = new URLSearchParams("http://localhost:3000/#/carrito/".search); //agarra parametros de la URL
        const url = new URL(window.location);
        const queryParameters = new URLSearchParams(url.href.search); //agarra parametros de la URL
        console.log(window.location.toString())
        console.log(url)
        console.log(url.href)
        console.log(url.hash)
        console.log(window.location.hash)
        console.log(window.location.pathname)
        console.log(window.location.origin)
        console.log(queryParameters)
        console.log(new URLSearchParams(window.location).has('status')); */
        console.log(queryParameters)

       /*  const compraParam = {}
        compraParam.payment_id = queryParameters.get("payment_id") || "null"
        compraParam.status = queryParameters.get("status") || "null"
        compraParam.merchant_order_id = queryParameters.get("merchant_order_id") || "null" */

        if (compraParam.payment_id !== "null" && compraParam.status !== "null" && compraParam.merchant_order_id !== "null") {
            if (compraParam.status !== compraStatus.status) {
                setCompraStatus(compraParam)

                if (compraParam.status === "approved") {
                    await pedir(compraParam)
                    //setTimeout(()=> window.location.assign(window.location.origin + "#/carrito"), 5000)
                    window.location.assign(window.location.origin + "#/carrito")
                    
                }
            }
        }
    }

    const onError = () => {
        console.log("On error MP")
    }

    const onSubmit = () => {
        console.log("On submit MP");

        //tenemos que mandar la promesa al boton - inyecto en boton el preferenceId
        return new Promise((resolve, reject) => {
            getPreference(carrito)
                .then(({ data: response }) => {
                    console.log(response)
                    resolve(response.preferenceId)
                })
                .catch(error => {
                    reject(error)
                })
        })

    }



    return (
        <div className="Carrito">
            
                
                    <h1>Carrito de compras</h1>
                    {
                        compraStatus.status !== "null" &&
                        <div className={`alert alert-${compraStatus.status === "approved" ? "success" : "danger"} w-50 m-auto`}>
                            <h2>Estado de compra</h2>
                            <hr />
                            <ul>
                                <li><h4>Payment_id: {compraStatus.payment_id}</h4></li>
                                <li><h4>Status: {compraStatus.status}</h4></li>
                                <li><h4>Merchant_order_id: {compraStatus.merchant_order_id}</h4></li>
                            </ul>
                        </div>
                    }

                    {carrito.length === 0 &&
                        <>
                            <h3>Tu carrito aún está vacío</h3>
                            <img src="https://classic-nomenclatur.000webhostapp.com/uploads/1705619754992-hombre-compras-supermercado_74855-7612.jpg" alt="imagen carrito"></img>
                        </>
                    }

                    {carrito.length > 0 &&
                        <>
                            <Tabla carrito={carrito} borrar={borrar} incrementarID={incrementarID} decrementarID={decrementarID} />
                            <button className="btn carrito__borrar mr-3" onClick={modalBorrarAll}>Borrar todo</button>

                            <div id="wallet_container">
                                <Wallet
                                    customization={customization}
                                    onReady={onReady}
                                    onError={onError}
                                    onSubmit={onSubmit} 
                                    />
                              
                            </div>
                        </>
                    }

                    
                
                <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Borrar producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>¿Desea eliminar este producto del carrito?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={borrarID}>
                                Aceptar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showCarrito} onHide={handleCloseCarrito}>
                        <Modal.Header closeButton>
                            <Modal.Title>Borrar carrito</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>¿Desea eliminar el carrito?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseCarrito}>
                                Cancelar
                            </Button>
                            <Button variant="primary" onClick={borrarAll}>
                                Aceptar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Toast onClose={() => setShowToastNOT(false)} show={showToastNOT} delay={2000} autohide
                        style={{
                            position: 'fixed',
                            bottom: '0', right: '0',
                            backgroundColor: 'red'
                        }} >
                        <Toast.Header>
                            <strong className="me-auto">No hay más stock</strong>
                        </Toast.Header>
                    </Toast>
           
        </div>
    )
}

/* <button className="btn carrito__pedir" onClick={pedir}>Pedir</button> */
/* <Wallet initialization={{ preferenceId: '65884229-c87f3b1f-8e9b-4337-b947-a49731941c46' }} customization={{ texts:{ valueProp: 'smart_option'}}} /> */

//PRUEBA
/* 
American Express	3711 803032 57522	1234	11/25

Visa	4002 7686 9439 5619	123	11/25

APRO	Pago aprobado	(DNI) 12345678
OTHE	Rechazado por error general	(DNI) 12345678
CONT	Pendiente de pago	-
CALL	Rechazado con validación para autorizar	-
FUND	Rechazado por importe insuficiente	-
SECU	Rechazado por código de seguridad inválido	-
EXPI	Rechazado debido a un problema de fecha de vencimiento	-
FORM	Rechazado debido a un error de formulario	 */