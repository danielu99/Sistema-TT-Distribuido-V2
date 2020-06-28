import React from 'react'
import { Link, Route } from 'react-router-dom'
import PalabrasClave from './PalabrasClave'
import URL from './URL'
import '../button.css'

class ActualizaProtocolo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: this.props.usuario,
            protocolo: this.props.protocolo,
            bandera:0
        }
        this.finalizar = this.finalizar.bind(this)
    }

    componentDidUpdate(){
        if(this.state.bandera!=0){
            alert("Protocolo actualizado exitosamente...")
            window.location.href="/Alumno/Bienvenido"
        }
    }

    async finalizar() {
        const response = await fetch("http://192.168.0.18:4000/FinalizaEvaluacion", {
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
        if(json.data==1){
            this.setState({bandera:1})
        }
    }

    render() {
        return (
            <div>
                <h1>Selecciona una opción</h1>
                <br />
                <div className="container">
                    <Route exact path="/Alumno/Bienvenido/Actualiza/URL" component={() => <URL usuario={this.state.usuario} protocolo={this.state.protocolo} />} />
                    <Route exact path="/Alumno/Bienvenido/Actualiza/Palabras" component={() => <PalabrasClave usuario={this.state.usuario} protocolo={this.state.protocolo} />} />
                </div>
                <Link to="/Alumno/Bienvenido/Actualiza/Palabras"><button className="myButton" >Palabras Clave</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/Alumno/Bienvenido/Actualiza/URL"><button className="myButton">Modificar URL</button></Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="myButton" onClick={this.finalizar}>Subir Protocolo</button>
            </div>
        );
    }
}

export default ActualizaProtocolo