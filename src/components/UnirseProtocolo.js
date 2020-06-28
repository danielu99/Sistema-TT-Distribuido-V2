import React from 'react'

class UnirseProtocolo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: this.props.usuario,
            numeroTT:''
        }
        this.cambio=this.cambio.bind(this)
        this.unirse=this.unirse.bind(this)
    }

    cambio(event){
        this.setState({numeroTT:event.target.value})
    }

    async unirse() {
        const response = await fetch("http://localhost:4000/UnirseProtocolo", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                boleta: this.state.usuario,
                protocolo:this.state.numeroTT
            })
        })
            .catch(err => console.error(err))
        const json = await response.json();
        switch(json.data){
            case -1:
                alert("¡Ups! No hay ningún protocolo con ese número!")
                break
            case 0:
                alert("Ya tienes un protocolo asignado!")
                break
            case 1:
                alert("Te has unido a este protocolo correctamente!")
                break
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Unirse a protocolo</h1>
                <h1>Ingrese el número del protocolo</h1>
                <input type='numTT'
                    value={this.state.numeroTT}
                    onChange={this.cambio}
                    placeholder='             Número TT' /><br/><br/>
                    <button onClick={this.unirse} className="myButton">Unirse</button>
            </div>
        );
    }
}

export default UnirseProtocolo