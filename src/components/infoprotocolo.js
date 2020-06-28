import React from 'react'
import '../contenedoresinfo.css'
import '../profesor.css'
import { Link } from 'react-router-dom'

class infoProtocolo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            protocolo: this.props.protocolo,
            boleta: this.props.usuario,
            PalabrasClave: [],
            Link: ''
        }
    }

    componentDidMount() {
        this.obtenerPalabras()
        this.obtenerLink()
    }

    async obtenerPalabras() {
        const response = await fetch("http://localhost:4000/PalabrasClave", {
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
        if (json.data != 0) {
            this.setState({ PalabrasClave: json })
        }
    }

    async obtenerLink() {
        const response = await fetch("http://localhost:4000/ObtenLink", {
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
        
        if(json.data!=0){
            this.setState({Link:json[0].documentopdf})
        }
    }

    renderPalabras = ({ palabra }) =>
        <tr>
            <td>
                {palabra}
            </td>
        </tr>

    render() {
        return (
            <div>
                <h1>Información de protocolo</h1><br />
                <div className="container">
                    <div className="div1">
                        <table className="tabla" align="center">
                            <tr>
                                <th>Palabras Clave</th>
                            </tr>
                            {this.state.PalabrasClave.map(this.renderPalabras)}
                        </table>
                    </div>
                    <div className="div2">
                        <br /><h1>Link</h1>
                        <a href={this.state.Link} target="_blank">{this.state.Link}</a>
                    </div>
                </div>
                <br />
            </div>
        )
    }
}

export default infoProtocolo