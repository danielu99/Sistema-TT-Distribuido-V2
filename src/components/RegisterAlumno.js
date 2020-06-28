import React, { Component } from 'react'
import NavBar from './NavbarAlumno'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            nombre: '',
            correo: '',
            boleta: '',
            contraseña: '',
        }
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit() {
        try {
            let response = await fetch("http://localhost:4000/RegistroAlumno", {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    nombre: this.state.nombre,
                    boleta: this.state.boleta,
                    contraseña: this.state.contraseña,
                    correo: this.state.correo
                })
            })
            const json = await response.json();
            if (json.data == 1) {
                alert("Alumno registrado exitosamente!")
                window.location.href = "/Alumno"
            }
            else {
                alert("ERROR: Esta boleta ya fue registrada...")
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleChange1(event) {
        this.setState({ nombre: event.target.value })
    }

    handleChange2(event) {
        this.setState({ boleta: event.target.value })
    }

    handleChange3(event) {
        this.setState({ contraseña: event.target.value })
    }

    handleChange4(event) {
        this.setState({ correo: event.target.value })
    }

    render() {
        return (
            <div className="container3">
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
                                <label htmlFor="usuario">Boleta</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingresa tu boleta"
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
                                <label htmlFor="rol">Correo</label><br />
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Ingresa un correo electrónico."
                                    value={this.state.correo}
                                    onChange={this.handleChange4}
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
