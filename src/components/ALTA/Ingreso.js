import "./Ingreso.css"
/* import useForm from "../Hooks/useForm" */

export default function Ingreso(props) {

    const { nombre, precio, foto, stock, descripcionCorta, descripcionLarga, edadDesde, edadHasta, envio, marca, categoria } = props.producto
    const { onChange, onSubmit, editarId, invalid } = props

    /* //VALIDACION
    const initialData = {
        nombre: "",
        precio: "",
        stock: "",
        marca: "",
        categoria: "",
        descripcionCorta: "",
        foto: ""
    }

    const validarForm = (form) => {
        let isError = false
        let errors = {}
        let regexNum = /^[0-9]+$/

        if (!form.nombre.trim()) {
            errors.nombre = "El campo nombre es obligatorio"
            isError = true
        }
        if (!form.precio.trim()) {
            errors.precio = "El campo precio es obligatorio"
            isError = true
        }else if(!regexNum.test(form.precio)){
            errors.precio = "Debe ser un número válido"
            isError = true
        }
        if (!form.stock.trim()) {
            errors.stock = "El campo stock es obligatorio"
            isError = true
        }else if(!regexNum.test(form.stock)){
            errors.stock = "Debe ser un número válido"
            isError = true
        }
        if (!form.marca.trim()) {
            errors.marca = "El campo marca es obligatorio"
            isError = true
        }
        if (!form.categoria.trim()) {
            errors.categoria = "El campo categoria es obligatorio"
            isError = true
        }
        if (!form.descripcionCorta.trim()) {
            errors.descripcionCorta = "El campo descripcionCorta es obligatorio"
            isError = true
        }
        if (!form.foto.trim()) {
            errors.foto = "El campo foto es obligatorio"
            isError = true
        }
        return isError ? errors : null
    }

    const {form, errors, handleChange} = useForm(initialData, validarForm) */

    return (
        <div className="Ingreso">
            <form className="alta-form" onSubmit={onSubmit} >
                <div className="form-group">
                    <label htmlFor="nombre">Nombre*</label>
                    <input type="text" id="nombre" className="form-control" value={nombre} onChange={onChange} required />
                    {!nombre && <div className="alert alert-danger p-1">Este campo es obligatorio</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="precio">Precio*</label>
                    <input type="number" id="precio" className="form-control" value={precio} onChange={onChange} required />
                    {!precio && <div className="alert alert-danger p-1">Este campo debe ser un número</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="stock">Stock*</label>
                    <input type="number" id="stock" className="form-control" value={stock} onChange={onChange} required />
                    {!stock && <div className="alert alert-danger p-1">Este campo debe ser un número</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="marca">Marca*</label>
                    <input type="text" id="marca" className="form-control" value={marca} onChange={onChange} required />
                    {!marca && <div className="alert alert-danger p-1">Este campo es obligatorio</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="categoria">Categoría*</label>
                    <input type="text" id="categoria" className="form-control" value={categoria} onChange={onChange} required />
                    {!categoria && <div className="alert alert-danger p-1">Este campo es obligatorio</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="descripcionCorta">Descripción Corta*</label>
                    <input type="text" id="descripcionCorta" className="form-control" value={descripcionCorta} onChange={onChange} required />
                    {!descripcionCorta && <div className="alert alert-danger p-1">Este campo es obligatorio</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="descripcionLarga">Descripción Larga</label>
                    <textarea name="descripcionLarga" id="descripcionLarga" cols="50" rows="10" className="form-control" value={descripcionLarga} onChange={onChange}></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="foto">Foto*</label>
                    <input type="text" id="foto" className="form-control" value={foto} onChange={onChange} required />
                    {!foto && <div className="alert alert-danger p-1">Este campo es obligatorio</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="edadDesde">Edad Desde</label>
                    <input type="number" id="edadDesde" className="form-control" value={edadDesde} onChange={onChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="edadHasta">Edad Hasta</label>
                    <input type="number" id="edadHasta" className="form-control" value={edadHasta} onChange={onChange} />
                </div>

                <div className="form-group form-check">
                    <input type="checkbox" id="envio" className="form-check-input" checked={envio} onChange={onChange} />
                    <label htmlFor="envio">Envío</label>
                </div>

                <button disabled={invalid} className={`btn btn-${editarId ? 'warning' : 'success'} mt-3 mb-5`}> {editarId ? "Actualizar" : "Enviar"}</button>
            </form>
        </div>
    )
}