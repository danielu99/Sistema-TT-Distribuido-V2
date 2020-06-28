import React from 'react'
import '../button.css'
import * as d3 from 'd3'
import { v4 as uuidv4 } from 'uuid';

class RegistrarProtocolo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boleta: this.props.usuario,
            nombrett: '',
            linktt: '',
            numeroTT: uuidv4(),

            cont: 1,
            palabrasClave: []
        }
        this.añadePalabra = this.añadePalabra.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.Registra = this.Registra.bind(this);
    }


    añadePalabra() {
        this.setState({ cont: this.state.cont + 1 })
        d3.select("div.palabras")
            .append("input")
            .attr("type", "text")
            .attr("placeHolder", "            Palabra clave " + ((this.state.cont) + 1));
    }

    handleChange1(event) {
        this.setState({ nombrett: event.target.value })
    }

    handleChange2(event) {
        this.setState({ linktt: event.target.value })
    }

    async Registra() {
        try {
            let response = await fetch("http://localhost:4000/Protocolo", {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    numeroTT: this.state.numeroTT,
                    nombreTT: this.state.nombrett,
                    boleta: this.state.boleta,
                    linktt: this.state.linktt
                })
            })
            const json = await response.json();
            if (json.data == 1) {
                alert("Protocolo registrado exitosamente!")
                window.location.href = "/Alumno/Bienvenido"
            }
            else {
                alert("ERROR: Ya tienes un protocolo asignado!...")
                window.location.href = "/Alumno/Bienvenido/registrar"
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Registrar Protocolo</h1>
                <h1>Nombre de Trabajo Terminal</h1>
                <input type='nombreTT'
                    placeholder='               Nombre TT'
                    value={this.state.nombrett}
                    onChange={this.handleChange1} />
                <br></br><br />
                {/* <h2>Palabras Clave</h2>
                <button className="myButton" onClick={this.añadePalabra}>Añadir Palabra Clave</button>
                <div className="palabras">
                    <input type='palabrasClave'
                        placeholder='            Palabra clave 1' />
                    Aquí van las palabras clave
                </div>
                <br></br>
                */}
                <h1>Link a PDF</h1>
                <input type='linkTT'
                    placeholder='Ejemplo: http://drive.nombreTT.com"'
                    value={this.state.linktt}
                    onChange={this.handleChange2} />
                <br></br><br />
                <button className="myButton" onClick={this.Registra}>Registra Protocolo!</button>
            </div>
        );
    }
}

export default RegistrarProtocolo