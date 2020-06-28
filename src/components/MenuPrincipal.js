import React from 'react';
import { Link } from 'react-router-dom'
import '../Card.css'
import '../button.css'  
import studentImg from '../images/alumno.png'
import Card from './Card'
import teacherImg from '../images/teacher.png'

class MenuPrincipal extends React.Component {

  render() {
    if (localStorage.getItem("Type") != null) {
      if (localStorage.getItem("Type") == "Profesor") {
        window.location.href = "/Profesor/Bienvenido"
      }
      else{
        window.location.href="/Alumno/Bienvenido"
      }
    }
    else {
      return (
        <div className="Menu">
          <br /><div className="container3">
            <h1>Sistema TT</h1>
          </div><br />
          <Card img={studentImg} titulo={"Alumno"} descripcion={"Haz click aquí si eres un alumno"} /><br /><br />
          <Card img={teacherImg} titulo={"Profesor"} descripcion={"Haz click aquí si eres un profesor."} />
          <div>
            <br />
            {/* <Link to="/catalogo"><href className="myButton">Catálogo de Profesores</href></Link> */}
          </div>
        </div>
      )
    }
  }
}

export default MenuPrincipal;