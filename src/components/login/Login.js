import React, {useState} from 'react'
import axios from 'axios';
import { rutaAPI } from '../../config/Config'



export default function Login(){

    // HOOK PARA MENSAJE DE ALERTA

    const [loginAlert, setLoginAlert] = useState();

    
    // HOOK PARA INICIAR SESIÓN

    const [form, setForm] = useState({
        user: "",
        pass: ""
    });

    // CAPTURAR CAMBIOS DEL FORMULARIO

    const handleForm = e => {

        setForm({
            
            ...form,
            [e.target.name]: e.target.value,
            
        })
        
    }

    // EJECUTAMOS SUBMIT

    const handleLogin = async e => {
        e.preventDefault();
        
        const respuesta = await loginAPI(form);
        if(respuesta.status !== 200){

            console.log(respuesta.respuesta);
            setLoginAlert(
                <p className="text-danger alert alert-danger mt-3">{respuesta.respuesta}</p>
            );
            
        }else{
            console.log(respuesta.respuesta);
            setLoginAlert(
              <p className="text-success alert alert-success mt-3">LOGIN SUCCESS!</p>
            );
           
            localStorage.setItem("ACCESS_TOKEN", respuesta.token);
            localStorage.setItem("ID", respuesta.tokenData.user_id[0].usuario_id);
            localStorage.setItem("USUARIO", respuesta.tokenData.nombre);
            
            setTimeout(()=>{
              window.location.href = '/';
            },500);
            
        }
          
    }
    
    //RETORNAMOS LA VISTA 

    return (
      <div className='card col-lg-4 col-md-9 m-auto p-5 bg-dark'>
        <div className='card-body'>
            <h2 className="text-light">LOGIN</h2>
        </div>

        <form onChange={handleForm} onSubmit={handleLogin}>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              name='user'
              placeholder='Usuario'
            />
          </div>

          <div className='input-group mb-3'>
            <input
              type='password'
              className='form-control'
              name='pass'
              placeholder='Password'
            />
          </div>   

          <button type='submit' className='btn btn-primary btn-lg col-12'>
            Ingresar
          </button> 

         
        </form>

        <div>
          {loginAlert}
          <span className="card-footer text-light mt-3 d-block">MisLibrosApp</span>
        </div>
      </div>
    );
}

// PETICIÓN POST LOGIN

const loginAPI = async data => {

    const respuesta = await axios.post(rutaAPI+"/login", data)
    .then( res =>{
            
            return res.data;
    }).catch( err => {
           
           return err;
    })
    
    return respuesta
    
}
