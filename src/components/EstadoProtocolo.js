import React from 'react'

class EstadoProtocolo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: this.props.usuario,
            evaluaciones: []
        }
        this.eliminar = this.eliminar.bind(this)
    }

    componentDidMount() {
        this.protocolos()
    }

    async eliminar() {
        const response = await fetch("http://localhost:4000/BajaProtocolo", {
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
        if (json.data == 1) {
            alert("No tienes ningun protocolo asignado!")
        }
        else {
            alert("Protocolo eliminado correctamente!")
        }
    }

    renderEvaluaciones = ({ nombreProf, estatus }) =>
        <tr>
            <td>
                {nombreProf}
            </td>
            <td>
                {estatus}
            </td>
        </tr>

    async protocolos() {
        const response = await fetch("http://localhost:4000/EvaluacionesAlumno", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                boleta: this.state.usuario,
            })
        })
        .catch(err => console.error(err))
        const json = await response.json();
        
        this.setState({ evaluaciones: json })
        console.log(this.state.evaluaciones)
    }

    entrega() {
        if ((this.state.evaluaciones.length) != 0) {
            return (
                <div>
                    <h1>Evaluaciones de su protocolo:</h1><br />
                    <table className="tabla" align="center">
                        <tr>
                            <th>Profesor</th>
                            <th>Estatus</th>
                        </tr>
                        {this.state.evaluaciones.map(this.renderEvaluaciones)}
                    </table>
                    <br />
                    <button className="myButton" onClick={this.eliminar}>Eliminar Protocolo</button><br /><br />
                </div>
            )
        }
        else {
            return (
                <div>
                    <h1>De momento ningún profesor evalúa tu protocolo o aún no tienes un protocolo!...</h1>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="container">
                {this.entrega()}
            </div >
        );
    }
}

export default EstadoProtocolo