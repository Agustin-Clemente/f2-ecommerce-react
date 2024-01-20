import './Card.css'

export const Card = props => {

    const { producto, agregarCarritoID, verMasID } = props

    return (
        <div className="Card">

            <section>
                <h3>{producto.nombre}</h3>
                <img src={producto.foto} alt="" />
                <p><b className="precio">Precio:</b> ${producto.precio}</p>
                <p><b>Detalles:</b> {producto.descripcionCorta}</p>

                <div className="btn-group">
                    <button onClick={() => verMasID(producto.id)}> Más info </button>
                    <button onClick={() => agregarCarritoID(producto.id)}> Comprar </button>
                </div>
            </section>
        </div>
    )
}