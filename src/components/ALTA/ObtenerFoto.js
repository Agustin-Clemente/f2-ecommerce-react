import { useState } from 'react'
import { enviarFormDataAJax } from '../Servicios/upload'
import './ObtenerFoto.css'



export function ObtenerFoto(props){

    const {enviarUrlImagen} = props //para hacer uplifting para poder poner la URL en el form de Ingreso, tiene que llegar hasta index

    const [valorInput, setValorInput] = useState("") // para que puedan subir dos veces el mismo archivo y que actúe el onChange
    const [porcentaje, setPorcentaje] = useState(0)
    const [urlFoto, setUrlFoto] = useState("")
    const [spinner, setSpinner] = useState(false)



    const enviarFoto = archivo => {
        console.log(archivo)

        if (archivo?.type.includes("image")) {
           const data = new FormData()
        data.append('archivo', archivo)

        enviarFormDataAJax(data, porcentaje => {
            setPorcentaje(porcentaje)
            if(porcentaje=== 100) setSpinner(true)
        }, url => {
            console.log(url)
            setUrlFoto(url)
            enviarUrlImagen(url)

            setSpinner(false)

            setTimeout(() => {
                setUrlFoto("")
                setPorcentaje(0)
            },10000)
        }
        ) 
        }else{
            console.log("El archivo debe ser de tipo imagen")
        }

        
    }

    const dragEnter= e => {
        e.preventDefault()
    }

    const dragLeave= e => {
        e.preventDefault()
    }

    const dragOver= e => {
        e.preventDefault()
    }

    const drop= e => {
        e.preventDefault()
        
        const archivo = e.dataTransfer.files[0]
        enviarFoto(archivo)
    }

    const change = e => {
        
        const archivo = e.target.files[0]

        enviarFoto(archivo)
        setValorInput("")
    }


    return (
        <div className="ObtenerFoto">
            <input id='archivo' type="file" value = {valorInput} onChange={change}/>
                <div id="drop"
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDragOver={dragOver}
                    onDrop={drop}
                    
                    >
                        
                        {
                            spinner && 
                            <div className='d-flex justify-content-center'>
                            <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Cargando...</span>
                        </div>
                        </div>
                        }

                    {porcentaje >0 && 
                    <>
                    <progress min="0" max="100" value={porcentaje}></progress> <span>{porcentaje}%</span>
                    </>}
                    {porcentaje === 100 &&
                    <>
                    <img src={urlFoto} alt="Imagen subida OK" />
                    </> 
                }
                    <label htmlFor="archivo">Suelta tu foto aquí o haz click</label>
                   
                </div>
        </div>
    )
}