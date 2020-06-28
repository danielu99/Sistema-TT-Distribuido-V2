import React from 'react'
import { Link } from 'react-router-dom'
import '../button.css'
import '../contenedoresinfo.css'

class ProfesorEvaluacion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profesor: this.props.usuario,
            protocolo: localStorage.getItem("protocolo"),
            info: [],
            PalabrasClave: []
        }
        this.aprobar = this.aprobar.bind(this)
        this.rechazar = this.rechazar.bind(this)
        this.obtenerPalabras = this.obtenerPalabras.bind(this)
    }

    componentDidMount() {
        this.getInfo()
        this.obtenerPalabras()
    }

    async getInfo() {
        const response = await fetch("http://localhost:4000/InfoProtocolo", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                protocolo: this.state.protocolo,
            })
        })
            .catch(err => console.error(err))
        const json = await response.json();
        this.setState({ info: json.data })

    }

    renderProtocolos = ({ nombre, url }) =>
        <tr>
            <td>
                {nombre}
            </td>
            <td>
                <a href={url} target="_blank">{url}</a>
            </td>
        </tr>

    async aprobar(event) {
        const response = await fetch("http://localhost:4000/ProtocoloEvaluado", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                protocolo: this.state.protocolo,
                calificacion: "Aprobado",
                profesor: this.state.profesor
            })
        })
            .catch(err => console.error(err))
        const json = await response.json();
        if (json.data == 1) {
            alert("Protocolo calificado correctamente!")
        }
        else {
            alert("Algo salió mal")
        }
    }

    renderPalabras = ({ palabra }) =>
        <tr>
            <td>
                {palabra}
            </td>
        </tr>

    async obtenerPalabras() {
        const response = await fetch("http://localhost:4000/PalabrasClave", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                protocolo: this.state.protocolo
            })
        })
            .catch(err => console.error(err))
        const json = await response.json();
        if (json.data != 0) {
            this.setState({ PalabrasClave: json})
        }
    }

    async rechazar(event) {
        const response = await fetch("http://localhost:4000/ProtocoloEvaluado", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                protocolo: this.state.protocolo,
                calificacion: "Rechazado",
                profesor: this.state.profesor
            })
        })
            .catch(err => console.error(err))
        const json = await response.json();
        if (json.data == 1) {
            alert("Protocolo calificado correctamente!")
        }
        else {
            alert("Algo salió mal")
        }
    }

    render() {
        if (!localStorage.getItem("protocolo")) {
            window.location.href = "/Profesor"
        }
        else {
            return (
                <div>
                    <h1>Información del Protocolo</h1>
                    <br />
                    <div className="container">
                        <div className="div1">
                            <table className="tabla" align="center">
                                <tr>
                                    <th>NombreTT</th>
                                    <th>URL a documento PDF</th>
                                </tr>
                                {this.state.info.map(this.renderProtocolos)}
                            </table>
                        </div>
                        <div className="div2">
                            <table className="tabla" align="center">
                                <tr>
                                    <th>Palabras Clave</th>
                                </tr>
                                {this.state.PalabrasClave.map(this.renderPalabras)}
                            </table>
                        </div>
                    </div><br/>
                    <button className="myButton" onClick={this.aprobar}>APROBAR</button>
                    <button className="myButton" onClick={this.rechazar}>RECHAZAR</button>
                </div>
            )
        }

    }
}

export default ProfesorEvaluacion