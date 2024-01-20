import "./Tabla.css"

export const Tabla = props => {

    const { carrito, borrar, incrementarID, decrementarID } = props
    let total = 0

    return (
        <div className="Tabla mb-3">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>nombre</th>
                            <th>precio</th>
                            <th>marca</th>
                            <th>foto</th>
                            <th>cantidad</th>
                            <th>subtotal</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carrito.map(producto =>

                                <tr key={producto.id}>

                                    <td>{producto.nombre}</td>
                                    <td> ${producto.precio}</td>
                                    <td> {producto.marca}</td>

                                    <td><img width="100px" src={producto.foto} alt={"foto de " + producto.nombre} /></td>

                                    <td>
                                        <button className="btn btn-info mr-2" onClick={() => decrementarID(producto.id)}> - </button>
                                        {producto.cantidad}
                                        <button className="btn btn-info ml-2" onClick={() => incrementarID(producto.id)}> + </button>
                                    </td>
                                    <td>
                                        ${(producto.subtotal = producto.cantidad * producto.precio).toFixed(2)}
                                    </td>

                                    <td>
                                        <button className="btn btn-danger" onClick={() => borrar(producto.id)}> Borrar </button>
                                    </td>
                                </tr>

                            )
                        }

                        {
                            carrito.forEach(p => {
                                total += p.subtotal
                            })
                        }


                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total: $ {(total.toFixed(2))}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}