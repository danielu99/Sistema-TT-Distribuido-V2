import React from 'react'
import * as d3 from 'd3'
import { Link, Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import Evaluacion from './ProfesorEvaluacion'
import '../profesor.css'

class ProtocolosAsignados extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            protocolos: [],
            usuario: this.props.usuario,
            seleccion: ''
        }
    }

    componentDidMount() {
        this.getProtocolos();
    }


    async getProtocolos() {
        const response = await fetch("http://localhost:4000/ProtocolosProfe", {
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
                    // that.setState({ seleccion: this.getAttribute("id") })
                    localStorage.setItem("protocolo", this.getAttribute("id"))
                })
        })
    }

    renderProtocolos = ({ numero, nombre }) =>
        <tr>
            <td>
                <Link to="/Profesor/Bienvenido/Asignados/Evaluacion"><div id={numero}></div></Link>
            </td>
            <td>
                {nombre}
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
        if (this.state.protocolos.length > 0) {
            return (
                <div>
                    <h1>Protocolos por evaluar</h1><br />
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
        else {
            return (
                <div>
                    <h1>Por el momento no tienes protocolos pendientes :)</h1><br />
                    <div className="container">

                    </div>
                </div>
            )
        }
    }
}

export default ProtocolosAsignados