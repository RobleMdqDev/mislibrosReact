import React, {useState} from 'react'
import axios from 'axios';
import { rutaAPI } from '../../config/Config'
import "./login.css"
import logo from '../../img/libros2.png';



export default function Login(){

    // HOOK PARA MENSAJE DE ALERTA

    const [loginAlert, setLoginAlert] = useState(

      <p className="alerta text-light"></p>

    );

    
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
    const loginDiv = document.querySelector(".login");

    const handleLogin = async e => {
        e.preventDefault();
        
        const respuesta = await loginAPI(form);
        if(respuesta.status !== 200){

            console.log(respuesta.respuesta);
            setLoginAlert(
               <p className="alerta text-danger alert alert-danger">{respuesta.respuesta}</p>
            );
            if(loginDiv){
              loginDiv.classList.add("vibra");
              setTimeout(()=>{
                loginDiv.classList.remove("vibra");
              }, 500);
            }
            
            
        }else{
            console.log(respuesta.respuesta);
            setLoginAlert(
              <p className="alerta text-success alert alert-success">LOGIN SUCCESS!</p>
              
            );
            loginDiv.classList.add("agrandar");
            setTimeout(()=>{
              loginDiv.classList.remove("agrandar");
            }, 500);

            document.querySelector(".body").classList.add("active");
                        
           
            localStorage.setItem("ACCESS_TOKEN", respuesta.token);
            localStorage.setItem("ID", respuesta.tokenData.user_id[0].usuario_id);
            localStorage.setItem("USUARIO", respuesta.tokenData.nombre);
            
            setTimeout(()=>{
              window.location.href = '/';
            },1000);
            
        }
        
         
    }
    
    //RETORNAMOS LA VISTA 

    return (
      <div className="body">
               
          <div className='login'>

            <div className="logo">
              <img src={logo} alt="logo"/>
            </div>

            <h5>Ingresar</h5>

            <div className="formulario">        
                  <div className='card-body'>
                      <h2 className="text-light">LOG IN</h2>
                  </div>

                  <form onChange={handleForm} onSubmit={handleLogin}>
                    <div className='input-group mb-3'>
                      <input
                        type='text'
                        className='form-control'
                        name='user'
                        autoComplete="off"
                        placeholder='Usuario'
                      />
                    </div>

                    <div className='input-group mb-3'>
                      <input
                        type='password'
                        className='form-control'
                        name='pass'
                        autoComplete="off"
                        placeholder='Contraseña'
                      />
                    </div>   

                    <button type='submit' className='boton'>
                      Ingresar
                    </button>  

                  </form>

                  <div>
                    {loginAlert}                
                  </div>
            </div> {/* Fin .formulario */}

            <div className="tipografia">
                <h3>M</h3>
                <h3>i</h3>
                <h3>s</h3>
                <h3>L</h3>
                <h3>i</h3>
                <h3>b</h3>
                <h3>r</h3>
                <h3>o</h3>
                <h3>s</h3>
                <h3>A</h3>
                <h3>p</h3>
                <h3>p</h3>
            </div>

          </div>{/* Fin .login */}

      </div>
      // Fin .body
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
