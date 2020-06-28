import React, { Component } from 'react'
import NavBar from './NavbarProf'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      nombre: '',
      usuario: '',
      contraseña: '',
      rol: '',
      correo: '',
      academias: []
    }
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleChange5 = this.handleChange5.bind(this);
    this.handleChange6 = this.handleChange6.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    try {
      let response = await fetch("http://localhost:4000/RegistroProfe", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          usuario: this.state.usuario,
          contraseña: this.state.contraseña,
          nombre: this.state.nombre,
          rol: this.state.rol,
          correo: this.state.correo
        })
      })
      const json = await response.json();
      if (json.data == 1) {
        alert("Profesor registrado exitosamente!")
        window.location.href = "/Profesor"
      }
      else {
        alert("ERROR: Este usuario ya existe, use otro...")
        window.location.href = "/registerProfesor"
      }
    } catch (e) {
      console.log(e)
    }
  }

  handleChange1(event) {
    this.setState({ nombre: event.target.value })
  }

  handleChange2(event) {
    this.setState({ usuario: event.target.value })
  }

  handleChange3(event) {
    this.setState({ contraseña: event.target.value })
  }

  handleChange4() {
    this.setState({ rol: "Presidente" })
  }

  handleChange5() {
    this.setState({ rol: "Sinodal" })
  }

  handleChange6(event) {
    this.setState({ correo: event.target.value })
  }

  render() {
    return (
      <div className="maincontainer">
        <NavBar />
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Registro</h1>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Ingresa tu nombre"
                  value={this.state.nombre}
                  onChange={this.handleChange1}
                />
              </div>
              <div className="form-group">
                <label htmlFor="usuario">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa usuario"
                  value={this.state.usuario}
                  onChange={this.handleChange2}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contraseña">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingresa una contraseña"
                  value={this.state.contraseña}
                  onChange={this.handleChange3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contraseña">Correo</label>
                <input
                  type="mail"
                  className="form-control"
                  placeholder="Ingresa una dirección de correo electrónico"
                  value={this.state.correo}
                  onChange={this.handleChange6}
                />
              </div>

              <div className="form-group">
                <label htmlFor="rol">Rol</label><br />
                Presidente<input
                  type="radio"
                  className="form-control"
                  name="rol"
                  onChange={this.handleChange4}
                />
                Sinodal<input
                  type="radio"
                  className="form-control"
                  name="rol"
                  onChange={this.handleChange5}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
                onClick={this.handleSubmit}
              >
                Registrate!
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
