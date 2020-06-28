import React from 'react';
import {Link} from 'react-router-dom'
import '../Catalogo.css'
import '../button.css'

class Catalogo extends React.Component{
  
  state={
    profesores:[],
  }

componentDidMount(){
  this.getProfesores();
}

getProfesores = _ => {
  fetch("http://192.168.0.18:4000/catalogo")
    .catch(err => console.error(err))
    .then(response=>response.json())
    .then(response=>this.setState({profesores:response.data}))
}

renderProfesores=({nombre,rol,academia}) =>
  <tr>
    <td>
      {nombre}
    </td>
    <td>
      {rol}
    </td>
    <td>
      {academia}
    </td>
  </tr>

  render(){
    const {profesores}=this.state;
    return(
      <div className="catalogo">
        <br/><div>
          Catálogo profesores:
        </div><br/>
        <table class="table" align="center" >
        <tr>
          <th>Nombre</th>
          <th>Rol</th>
          <th>Academia</th>
        </tr>
        {profesores.map(this.renderProfesores)}
        </table>
        <br/>
        <Link to="/sistematt"><href className="myButton">Menu Principal</href></Link>
      </div>
    );
  }
}

export default Catalogo;