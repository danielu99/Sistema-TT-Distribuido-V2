import React from 'react'
import '../profesor.css'
import '../button.css'
import '../formulario.css'
import Login from './LoginProfesor'
import Navbar from './NavbarProf';

class Profesor extends React.Component {



    render() {
        return (
            <div className="maincontainer">
                <Navbar />
                <Login/>
            </div>
        );
    }
}

export default Profesor;