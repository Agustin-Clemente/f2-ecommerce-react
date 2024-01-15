//const URL_API_UPLOAD = "http://localhost:8080/api/upload/"

const URL_API_UPLOAD = process.env.NODE_ENV === "production" ? "/api/upload/" : `http://localhost:${process.env.REACT_APP_PORT_SRV_DEV}/api/upload/`


export function enviarFormDataAJax(data, progress, urlFoto) {

    let porcentaje = 0
    
    const xhr = new XMLHttpRequest()

    xhr.open("post", URL_API_UPLOAD)

    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
            const rta = JSON.parse(xhr.response)
            console.log(rta)

            //const url = "http://localhost:8080/uploads/" + rta.datos.filename
            const url = rta.urlFotoFTP
            if(urlFoto)urlFoto(url)
        }
    })

    xhr.upload.addEventListener("progress", e => {
        if (e.lengthComputable) {
            porcentaje = parseInt((e.loaded / e.total) *100)
            console.log(porcentaje)
            if(progress) progress(porcentaje)
        }
    })

    xhr.send(data)
}