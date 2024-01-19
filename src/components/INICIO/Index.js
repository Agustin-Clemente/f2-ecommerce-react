import { useEffect, useState } from 'react'
import './Index.css'
import { getProductos } from '../Servicios/Productos'
import { Card } from './Card'
import { useLocalStorage } from '../Hooks/useLocalStorage'
import Modal from 'react-bootstrap/esm/Modal'
import Button from 'react-bootstrap/esm/Button'
import Toast from 'react-bootstrap/Toast';

export function Index() {

    const [productos, setProductos] = useState([])
    const [carrito, setCarrito] = useLocalStorage('carrito', [])

    //TOAST
    const [showToastOK, setShowToastOK] = useState(false);
    const [showToastNOT, setShowToastNOT] = useState(false);


    //MODAL
    const [verMasId, setVerMasId] = useState(null)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        async function pedir() {
            const productos = await getProductos()
            setProductos(productos)
        }
        pedir()
    }, [])

    function agregarCarritoID(id) {

        const producto = productos.find(p => p.id === id)

        const carritoClon = [...carrito]

        let productoCarrito = carritoClon.find(c => c.id === producto.id)

        if (!productoCarrito) {
            producto.cantidad = 1
            carritoClon.push(producto)
            setShowToastOK(true)

        } else if (productoCarrito.cantidad < productoCarrito.stock) {
            productoCarrito.cantidad++
            setShowToastOK(true)
        } else {
            setShowToastNOT(true)
        }

        setCarrito(carritoClon)

        if (handleShow) {
            handleClose()
        }

    }

    /*  async function goComprar() {
         const id = verMasId
 
         agregarCarritoID(id)
         handleClose()
     } */



    function verMasID(id) {
        if (id) {
            setVerMasId(id)
            handleShow()
        }
    }



    return (
        
        <div className="Inicio">


            {/* MODAL */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{productos.find(p => p.id === verMasId)?.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <section>
                        <img src={productos.find(p => p.id === verMasId)?.foto} alt={productos.find(p => p.id === verMasId)?.nombre} />
                        <p><b className="precio">Precio:</b> ${productos.find(p => p.id === verMasId)?.precio}</p>
                        <p><b>Detalles:</b> {productos.find(p => p.id === verMasId)?.descripcionCorta}</p>
                        <p><b>Descripcion:</b> {productos.find(p => p.id === verMasId)?.descripcionLarga}</p>
                        <p><b>Envío:</b> {productos.find(p => p.id === verMasId)?.envio ? 'Si' : 'No'}</p>
                        <p><b>Stock:</b> {productos.find(p => p.id === verMasId)?.stock}</p>
                        <p><b>Marca:</b> {productos.find(p => p.id === verMasId)?.marca}</p>
                        <p><b>Categoría:</b> {productos.find(p => p.id === verMasId)?.categoria}</p>
                        <p><b>Edad desde:</b> {productos.find(p => p.id === verMasId)?.edadDesde}</p>
                        <p><b>Edad hasta:</b> {productos.find(p => p.id === verMasId)?.edadHasta}</p>
                        <br />
                        <div className="btn-group">
                        </div>
                    </section>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => agregarCarritoID(productos.find(p => p.id === verMasId)?.id)}>
                        Comprar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Toast onClose={() => setShowToastOK(false)} show={showToastOK} delay={2000} autohide
                style={{
                    position: 'fixed',
                    bottom: '0', right: '0',
                    backgroundColor: '#587272'
                }} >
                <Toast.Header>
                    <strong className="me-auto">Producto agregado al carrito</strong>
                </Toast.Header>
            </Toast>

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


            <div className="inicio">
                <div className="section-cards"> 
                    <div className="section-cards-header">
                        <h1>Listado de productos</h1>
                    </div>


                    <div className="cards-container">
                        {productos.map((producto, index) =>
                            <Card key={index} producto={producto} agregarCarritoID={agregarCarritoID} verMasID={verMasID} />
                        )
                        }
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}