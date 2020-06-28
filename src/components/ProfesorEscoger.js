import React from 'react'
import * as d3 from 'd3'
import { Link } from 'react-router-dom'
import '../profesor.css'


class ProfesorEscoger extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            usuario: this.props.usuario,
            protocolos: [],
            seleccion: ''
        }
        this.AgregarProtocolo = this.AgregarProtocolo.bind(this)
    }

    componentDidMount() {
        this.getProtocolos();
    }


    async getProtocolos(event) {
        const response = await fetch("http://localhost:4000/ProtocolosDisponibles", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                usuario: this.state.usuario,
            })
        })
            .catch(err => console.error(err))
        const json = await response.json();
        this.setState({ protocolos: json.data })

        var that = this
        var a = d3.selectAll("td").selectAll("div").each(function () {
            d3.select(this)
                .text(this.getAttribute("id"))
                .on("click", d => {
                    that.setState({ seleccion: this.getAttribute("id") })
                    that.AgregarProtocolo()
                })
        })
    }

    async AgregarProtocolo() {
        const response = await fetch("http://localhost:4000/AgregarProtocolo", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                usuario: this.state.usuario,
                protocolo: this.state.seleccion
            })
        })
            .catch(err => console.error(err))
        const json = await response.json();

        if (json.data == 1) {
            alert("Protocolo añadido correctamente!")
        }
        else {
            alert("Ya evalúas este protocolo!")
        }
    }

    renderProtocolos = ({ numerott, nombrett }) =>
        <tr>
            <td>
                <Link to="/Profesor/Bienvenido/Asignados"><div id={numerott}></div></Link>
            </td>
            <td>
                {nombrett}
            </td>
        </tr>

    render() {
        return (
            <div>
                {this.Entrega()}
            </div>
        )
    }

    Entrega() {
        if (this.state.protocolos.length < 1) {
            return (
                <div>
                    <h1>No Hay Protocolos Disponibles Para Ti...</h1><br/>
                    <div className="container">

                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h1>Trabajos Terminales Disponibles</h1><br />
                    <div className="container">
                        <div>
                            <table className="tabla" align="center">
                                <tr>
                                    <th>NumeroTT</th>
                                    <th>NombreTT</th>
                                </tr>
                                {this.state.protocolos.map(this.renderProtocolos)}
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ProfesorEscoger