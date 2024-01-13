import "./Index.css"
import useForm from "../Hooks/useForm"

export function Index() {

    function onSubmit(e) {
        e.preventDefault()
    }

    const initialData = {
        nombre: "",
        email: "",
        comentarios: ""
    }

    const validarForm = (form) => {
        let isError = false
        let errors = {}
        let regexEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/

        if (!form.nombre.trim()) {
            errors.nombre = "El campo nombre es obligatorio"
            isError = true
        }
        if (!form.email.trim()) {
            errors.email = "El campo email es obligatorio"
            isError = true
        } else if (!regexEmail.test(form.email)) {
            errors.email = "Debe ser una dirección válida"
            isError = true
        }
        if (!form.comentarios.trim()) {
            errors.comentarios = "El campo comentarios es obligatorio"
            isError = true
        }
        return isError ? errors : null
    }

    const { form, errors, handleChange, /* validacion */ } = useForm(initialData, validarForm)

    return (
        <div className="Contacto">


            <h1>Contacto</h1>

            <form className="contacto-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">nombre *</label>
                    <input type="text" name="nombre" id="nombre" value={form.nombre} onChange={handleChange} /* onBlur={validacion} */ required />
                    {errors.nombre && <div className="alert alert-danger p-1">{errors.nombre}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">email *</label>
                    <input type="email" name="email" id="email" value={form.email} onChange={handleChange} /* onBlur={validacion} */ required />
                    {errors.email && <div className="alert alert-danger p-1">{errors.email}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="comentarios">comentarios *</label>
                    <textarea name="comentarios" id="comentarios" value={form.comentarios} rows="10" cols="50" onChange={handleChange} /* onBlur={validacion}  */ required></textarea>
                    {errors.comentarios && <div className="alert alert-danger p-1">{errors.comentarios}</div>}
                </div>

                <button>Enviar</button>
            </form>
        </div>
    )
}