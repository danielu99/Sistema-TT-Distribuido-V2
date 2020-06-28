import React from 'react'
import * as d3 from 'd3'
import '../myButton2.css'

class PalabrasClave extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            protocolo: this.props.protocolo,
            cont: 1,
            palabras: []
        }
        this.añadePalabra = this.añadePalabra.bind(this);
        this.finalizar = this.finalizar.bind(this)
    }

    finalizar() {
        var arrayaux = []
        var a = d3.select("div.palabras").selectAll("input").each(function () {
            arrayaux.push(d3.select(this).property("value"))
        })
        this.setState({ palabras: arrayaux })
    }

    componentDidUpdate() {
        if (this.state.palabras.length > 0) {
            this.subirpalabras()
        }
    }

    async subirpalabras() {
        for (var i = 0; i < this.state.palabras.length; i++) {
            const response = await fetch("http://localhost:4000/AgregaPalabrasClave", {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    protocolo: this.state.protocolo,
                    palabra: this.state.palabras[i]
                })
            })
                .catch(err => console.error(err))
            const json = await response.json();
            if (json.data == 0) {
                alert("Una de las palabras ya fue registrada o es muy larga!...")
                window.location.href = "/Alumno/Bienvenido/Actualiza/Palabras"
                return 0
            }
        }
        alert("Palabras agregadas exitosamente!")
        window.location.href = "/Alumno/Bienvenido"
    }

    añadePalabra() {
        this.setState({ cont: this.state.cont + 1 })
        d3.select("div.palabras")
            .append("input")
            .attr("classname", "palabra")
            .attr("type", "text")
            .attr("placeHolder", "            Palabra clave " + ((this.state.cont) + 1));
    }

    render() {
        return (
            <div>
                <button className="myButton2" onClick={this.añadePalabra}>Añadir Palabra Clave</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="myButton2" onClick={this.finalizar}>Finalizar</button>
                <div className="palabras">
                    <input type='palabrasClave'
                        placeholder='            Palabra clave 1'
                        className="palabra" />
                </div>
                <br></br>
            </div>
        )
    }
}

export default PalabrasClave