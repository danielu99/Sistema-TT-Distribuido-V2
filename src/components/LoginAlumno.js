import React, { Component } from 'react'

class LoginAlumno extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            boleta: '',
            contraseña: '',
        }
        this.handleChange1 = this.handleChange1.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
        this.login = this.login.bind(this)
    }

    handleChange1(event) {
        this.setState({ boleta: event.target.value })
    }

    handleChange2(event) {
        this.setState({ contraseña: event.target.value })
    }

    async login() {
        try {
            let response = await fetch("http://localhost:4000/LoginAlumnos", {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    boleta: this.state.boleta,
                    contraseña: this.state.contraseña
                })
            })

            const json = await response.json();
            if (json.data == 1) {
                localStorage.setItem("Sesion", this.state.boleta)
                localStorage.setItem("Type", "Alumno")
                window.location.href="/Alumno/Bienvenido"
            }
            else {
                alert("La boleta o la contraseña son incorrectos. Intenta de nuevo.")
                window.location.href = "/Alumno"
            }

        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                <div className="container3">
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            <form>
                                <h1 className="h3 mb-3 font-weight-normal">Inicia Sesion</h1>
                                <div className="form-group">
                                    <label htmlFor="correo">Boleta</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingresa tu boleta"
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

export default LoginAlumno
