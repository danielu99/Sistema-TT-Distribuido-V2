import React from "react";
import '../button.css'
import Asignados from './ProtocolosAsignados'
import Escoger from './ProfesorEscoger'
import '../profesor.css'
import Evaluacion from './ProfesorEvaluacion'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class MenuProfesor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      protocolos: [],
      usuario: localStorage.getItem("Sesion"),
      nombre: '',
      seleccion: ''
    }
  }

  componentDidMount() {
    this.nombre()
  }

  async nombre() {
    const response = await fetch("http://localhost:4000/NombreProfe", {
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
    this.setState({ nombre: json.data[0].nombre })
  }

  cleanSession() {
    localStorage.removeItem("Sesion")
    localStorage.removeItem("Type")
    localStorage.removeItem("protocolo")
  }

  render() {
    if (this.state.usuario == null) {
      window.location.href = "/Profesor"
    }

    return (
      <div className="maincontainer">
        <header className="App-header">
          <h1>Sistema de Registro de Protocolos </h1>
        </header>
        <div className="bienvenida"><br />
          <h1>Bienvenido, {this.state.nombre}</h1>
        </div>
        <Switch>
          <Route exact path="/Profesor/Bienvenido/Asignados" component={() => <Asignados usuario={this.state.usuario} />} />
          <Route path="/Profesor/Bienvenido/Escoger" component={() => <Escoger usuario={this.state.usuario} />} />
          <Route path="/Profesor/Bienvenido/Asignados/Evaluacion" component={() =>< Evaluacion usuario={this.state.usuario}/>}/>
        </Switch>
        <br />
        <Link to="/Profesor/Bienvenido/Asignados">Asignados</Link><br />
        <Link to="/Profesor/Bienvenido/Escoger">Escoger Protocolo</Link><br />
        <Link to="/sistematt"><button className="myButton" onClick={this.cleanSession}>Log Out</button></Link>
      </div>
    )
  }
}

export default MenuProfesor;