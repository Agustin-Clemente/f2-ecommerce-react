
import { useLocalStorage } from '../Hooks/useLocalStorage'
import { enviarCarrito } from '../Servicios/Carrito'
import { Tabla } from './Tabla'
import './Index.css'
import { Button, Modal, Toast } from 'react-bootstrap'
import { useState } from 'react'
export function Index() {

    const [carrito, setCarrito] = useLocalStorage('carrito', [])

    const [borrarId, setBorrarId] = useState(null)

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

    async function pedir() {
        const carritoEnviado = await enviarCarrito({pedido : carrito})
        console.log(carritoEnviado)
        setCarrito([])
    }

    return (
        <div className="Carrito">
            <h1>Carrito de compras</h1>

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

            {carrito.length === 0 &&
                <>
                    <h3>Tu carrito aún está vacío</h3>
                    <img src="https://img.freepik.com/vector-gratis/hombre-compras-supermercado_74855-7612.jpg?w=740&t=st=1695939944~exp=1695940544~hmac=e56019f286e11fe1cd5ccd8169f8a7272da92ebd627cfebdec67bfb95b143ccc" alt="imagen carrito"></img>
                </>
            }

            {carrito.length > 0 &&
                <>
                    <Tabla carrito={carrito} borrar={borrar} incrementarID={incrementarID} decrementarID={decrementarID} />
                    <button className="btn carrito__borrar mr-3" onClick={modalBorrarAll}>Borrar</button>
                    <button className="btn carrito__pedir" onClick={pedir}>Pedir</button>
                </>
            }
        </div>
    )
}