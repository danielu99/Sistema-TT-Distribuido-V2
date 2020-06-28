import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, useRouteMatch, Switch } from 'react-router-dom'
import MenuProfesor from './MenuProfesor'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usuario: '',
      contraseña: ''
    }
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.login = this.login.bind(this)
  }

  handleChange1(event) {
    this.setState({ usuario: event.target.value })
  }

  handleChange2(event) {
    this.setState({ contraseña: event.target.value })
  }



  async login() {
    try {
      let response = await fetch("http://localhost:4000/LoginProfes", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          usuario: this.state.usuario,
          contraseña: this.state.contraseña
        })
      })

      const json = await response.json();
      if (json.data == 1) {
        localStorage.setItem("Sesion", this.state.usuario);
        localStorage.setItem("Type", "Profesor")
        window.location.href = "Profesor/Bienvenido/Asignados"
      }
      else {
        alert("El usuario o la contraseña son incorrectos. Intenta de nuevo.")
        window.location.href = "/Profesor"
      }

    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (localStorage.getItem("Sesion") != null) {
      window.location.href = "/Profesor/Bienvenido"

    }
    else {
      return (
        <div>

          <div className="maincontainer">
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                <form>
                  <h1 className="h3 mb-3 font-weight-normal">Inicia Sesion</h1>
                  <div className="form-group">
                    <label htmlFor="correo">Usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ingresa tu usuario"
                      value={this.state.usuario}
                      onChange={this.handleChange1}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contraseña">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      name="contraseña"
                      placeholder="Contraseña"
                      value={this.state.contraseña}
                      onChange={this.handleChange2}
                    />
                  </div>
                </form>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                  onClick={this.login}
                >
                  Inicia Sesion
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Login