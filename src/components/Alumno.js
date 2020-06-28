import React from 'react'
import Navbar from './NavbarAlumno'
import Login from './LoginAlumno'

class Alumno extends React.Component {
    render() {
        return (
            <div className="container3">
                <Navbar/>
                <Login/>
            </div>
        )
    }
}

export default Alumno;