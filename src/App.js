import React, { useState, useEffect,  Fragment} from 'react';

function Cita ({cita, index, eliminarCita}) {
  return (
    <div className="cita">
      <p>Mascota: <span>{cita.mascota}</span></p>
      <p>Propietarop: <span>{cita.propietario}</span></p>
      <p>Teléfono: <span>{cita.telefono}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Sintomas: <span>{cita.sintomas}</span></p>
      <button
      onClick={() => eliminarCita(index)}
      type="button" className="button eliminar u-full-width"> Eliminar X
      </button>    
    </div>
  )
} //fin Cita


function Formulario ({crearCita}){
  //inicializamos el state vacio para que tambien se limpie el formulario cada vez
  //que se quiere ingresar una nueva cita 
  const stateInicial = {
    mascota : '',
    propietario : '',
    telefono : '',
    fecha : '',
    hora : '',
    sintomas : ''
  }


  //useState retorna dos funciones
  // cita es igual al state actual
  //actualizarCita = funcion para cambiar el state que es igual a this.setState()
  const [cita, actualizarCita] = useState(stateInicial);

  //actualiza el state
  const actualizarState = (e) => {
    actualizarCita({
      ...cita, //creamos una copia del state
      [e.target.name] : e.target.value
    })
  }//fin actualizarState

  //pasamos la cita al componente principal
  const enviarCita = (e) => {
    e.preventDefault();

    console.log(cita);
    //pasar la cita hacia el componente principal
    crearCita(cita)
    //reinicar el state(reinicar el form)
    actualizarCita(stateInicial)
  }//fin enviar cita

  

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      <form onSubmit={enviarCita}>
        <label>Mascota</label>
        <input 
          type="text" 
          name="mascota"
          className="u-full-width" 
          placeholder="Nombre Mascota" 
          onChange={actualizarState}
          value={cita.mascota}
        />

        <label>Dueño</label>
        <input 
          type="text" 
          name="propietario"
          className="u-full-width"  
          placeholder="Nombre Dueño de la Mascota"
          onChange={actualizarState}
          value={cita.propietario} 
        />

        <label>teléfono</label>
        <input 
          type="text" 
          name="telefono"
          className="u-full-width"  
          placeholder="Número de teléfono"
          onChange={actualizarState}
          value={cita.telefono} 
        />

        <label>Fecha</label>
        <input 
          type="date" 
          className="u-full-width"
          name="fecha"
          onChange={actualizarState}
          value={cita.fecha}
        />               

        <label>Hora</label>
        <input 
          type="time" 
          className="u-full-width"
          name="hora" 
          onChange={actualizarState}
          value={cita.hora}
        />

        <label>Sintomas</label>
        <textarea 
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={cita.sintomas}
        ></textarea>

        <button type="submit" className="button-primary u-full-width">Agregar</button>
          </form>
    </Fragment>
  )

}//fin formulario

function App(){

  //cargar las citas de localStorage como state inicial
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

      if (!citasIniciales) {
        citasIniciales = [];
      } 

  //useState retorna dos funciones
  // citas es igual al state
  //guardarCita es igual a this.setState()
  const [citas, guardarCita] = useState(citasIniciales);
  
  //agregar la nueva cita al state
  const crearCita = (cita) => {
    //tomar una copia del state y agregar el nuevo cliente
    const nuevasCitas = [...citas, cita];
    //almacenamos en el state
    guardarCita(nuevasCitas);
  }

  //elimina las citas del state
  const eliminarCita = (index) => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1); //splice es un metodo que se utiliza para eliminar elementos de un state
    guardarCita(nuevasCitas);
  }

  useEffect(
    () => {
      let citasIniciales = JSON.parse(localStorage.getItem('citas')); 
      if (citasIniciales) {
        localStorage.setItem('citas', JSON.stringify(citas));
      } else {
        localStorage.setItem('citas', JSON.stringify([]));
      }
    }, [citas] ) //se coloca citas en un arreglo para indicar que que el useEffect se ejecute solo cuando haya cambios en citas, es decir se haya agregado o eliminado una cita 


  //cargar condicionalmente un titulo
  const titulo = Object.keys(citas).length === 0 ? 'No hay Citas' : 'Administra las citas aquí'; //Object.keys no retorna los valores del arreglo solamente las posiciones 0,1,2,3 etc


  return(
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
          <Formulario
            crearCita={crearCita}
          />
          </div>
          <div className="one-half column">
            <h2><span className="titulo">{titulo}</span></h2>
            {citas.map((cita, index) => (
              <Cita
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )


}
export default App;

