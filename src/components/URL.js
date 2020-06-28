import React from 'react'
import '../myButton2.css'

class URL extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            protocolo: this.props.protocolo,
            link: '',
            bandera: 0
        }
        this.handlechange = this.handlechange.bind(this)
        this.actualizaLink = this.actualizaLink.bind(this)
    }

    handlechange(event) {
        this.setState({ link: event.target.value })
    }

    componentDidUpdate() {
        if (this.state.bandera != 0) {
            alert("Link Actualizado exitósamente!")
            window.location.href="/Alumno/Bienvenido/Actualiza"
        }
    }

    async actualizaLink() {
        const response = await fetch("http://192.168.0.18:4000/ActualizaLink", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                protocolo: this.state.protocolo,
                link: this.state.link
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
                <input type="text"
                    placeholder="Ingresa tu nuevo link."
                    value={this.state.link}
                    onChange={this.handlechange}
                />
                <br /><br />
                <button className="myButton2" onClick={this.actualizaLink}>Confirmar</button>
            </div>
        )
    }
}

export default URL