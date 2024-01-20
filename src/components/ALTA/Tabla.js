import "./Tabla.css"

export const Tabla = props => {

    const { productos, editar, borrar, editarId } = props
    console.log(productos)

    return (
        <div className="Tabla">

            {productos.length === 0 &&
                <h3 className="alert alert-danger">No se encontraron productos</h3>
            }

            {productos.length > 0 &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr className="success">
                                <th>nombre</th>
                                <th>precio</th>
                                <th>stock</th>
                                <th>marca</th>
                                <th>categoría</th>
                                <th>descripcion corta</th>
                                <th>descripcion larga</th>
                                <th>foto</th>
                                <th>envío</th>
                                <th>edad desde</th>
                                <th>edad hasta</th>
                                <th>acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productos.map(producto =>
                                    <tr key={producto.id}>
                                        <td>{producto.nombre}</td>
                                        <td> ${producto.precio}</td>
                                        <td> {producto.stock}</td>
                                        <td> {producto.marca}</td>
                                        <td> {producto.categoria}</td>
                                        <td> {producto.descripcionCorta}</td>
                                        <td> {producto.descripcionLarga}</td>
                                        <td><img width="100" src={producto.foto} alt={"foto de " + producto.nombre} /></td>
                                        <td>{producto.envio ? 'Si' : 'No'}</td>
                                        <td> {producto.edadDesde}</td>
                                        <td> {producto.edadHasta}</td>
                                        <td>
                                            <button className={`btn btn-${editarId && editarId === producto.id ? 'outline-' : ''}success mb-2`} onClick={() => editar(producto.id)}>{editarId && editarId === producto.id ? "Cancelar" : "Editar"}</button>
                                            <br />
                                            <button disabled={editarId ? true : false} className="btn btn-danger" onClick={() => borrar(producto.id)}>Borrar</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            }
        </div>
    )
}