import React from "react";
import '../MenuAlumno.css'
import Registro from './RegistrarProtocolo'
import Estado from './EstadoProtocolo'
import Actualiza from './ActualizaProtocolo'
import Unirse from './UnirseProtocolo'
import Info from './infoprotocolo'
import NavBar from './NavBarAlumno2'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class MenuAlumno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: localStorage.getItem("Sesion"),
            nombre: '',
            protocolo: ''
        }
    }

    componentDidMount() {
        this.nombre()
        this.protocolo()
    }

    cleanSession() {
        localStorage.removeItem("Sesion")
        localStorage.removeItem("Type")
        localStorage.removeItem("protocolo")
    }

    async nombre() {
        const response = await fetch("http://localhost:4000/NombreAlumno", {
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
        this.setState({ nombre: json.data[0]})
    }

    async protocolo() {
        const response = await fetch("http://localhost:4000/AlumnoProtocolo", {
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
        if (json.data.length > 0) {
            this.setState({ protocolo: json.data[0].numeroTT })
        }
        else {
            this.setState({ protocolo: 'null' })
        }
    }

    render() {
        return (
            <div className="MenuAlumno">
                <NavBar />
                <header className="MenuAlumno-header">
                    <h1>Sistema de Registro de Protocolos </h1>
                </header>
                <div className="bienvenida">
                    <h1>Bienvenido {this.state.nombre}</h1>
                </div>
                <Route exact path="/Alumno/Bienvenido/registrar" component={() => <Registro usuario={this.state.usuario} />} />
                <Route exact path="/Alumno/Bienvenido/" component={() => <Estado usuario={this.state.usuario} />} />
                <Route path="/Alumno/Bienvenido/Actualiza" component={() => <Actualiza usuario={this.state.usuario} protocolo={this.state.protocolo} />} />
                <Route exact path="/Alumno/Bienvenido/unirse" component={() => <Unirse usuario={this.state.usuario} />} />
                <Route exact path="/Alumno/Bienvenido/info" component={() => <Info usuario={this.state.usuario} protocolo={this.state.protocolo} />} />
                <Link to="/sistematt"><button className="myButton" onClick={this.cleanSession}>Log Out</button></Link>
            </div>
        );
    }
}

export default MenuAlumno;