import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Catalogo from './components/Catalogo'
import MenuPrincipal from './components/MenuPrincipal'
import Profesor from './components/Profesor'
import Alumno from './components/Alumno'
import Register1 from './components/RegisterProf'

import Register2 from './components/RegisterAlumno'
import MenuProfesor from './components/MenuProfesor';
import MenuAlumno from './components/MenuAlumno'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/Alumno/" component={Alumno} />
        <Route exact path='/sistematt/' component={MenuPrincipal} />
        <Route exact path='/catalogo/' component={Catalogo} />
        <Route exact path='/Profesor/' component={Profesor} />
        <Route exact path="/registerProfesor" component={Register1} />

        <Route exact path="/registerAlumno" component={Register2} />
        <Route path="/Profesor/Bienvenido" component={MenuProfesor} />
        <Route path="/Alumno/Bienvenido" component={MenuAlumno} />
        <Redirect to="/sistematt" ></Redirect>
      </Switch>
    </BrowserRouter>
  )
}

export default App;