import React from 'react'
import {Link} from 'react-router-dom'

class Card extends React.Component{
    render(){
        return(
            <Link to={{
                pathname:"/"+this.props.titulo
            }}>
            <div className="card">
                <div className="imagen">
                    <img src={this.props.img} width="200px" height="200px"/>
                </div>
                
                <div className="Fitness-Card-Info">
                    <h1>{this.props.titulo}</h1>
                    <p>{this.props.descripcion}</p>
                </div>
            </div>
            </Link>
        )
    }
}

export default Card;