import React from 'react';
import logo from '../../img/libros2.png';
import './nav.css';
import Swal from 'sweetalert2';

export default function Nav(){

    const usuario = localStorage.getItem("USUARIO");

    
    const navMenu = ()=>{
        const navegacion = document.querySelector(".navegacion");
        const toggle = document.querySelector(".toggle");
        toggle.classList.toggle("active");
        navegacion.classList.toggle("active");       
    } 

    const salirLog = ()=>{
        Swal.fire({
            title: 'Cerrar la sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Salir!'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                setTimeout(()=>{
                    window.location.href = '/';
                },500);
            }
          }) 
    }
    
    
    return(
        <header className="barra">
            <a className="toggle"
               href="#/"
               onClick={navMenu}
            >            
                <img src={logo} className="" alt="logo" /> 
                <div>
                    <p>M</p>
                    <p>e</p>
                    <p>n</p>
                    <p>ú</p>
                </div>
            </a>

            <div className="usuariolog">
                Bienvenido {usuario}
                <a 
                    href="#/"
                    onClick={salirLog}
                >
                    <i class="fas fa-sign-out-alt"></i>
                </a>
                
            </div>   
            <section className="navegacion">
                <span style={{"--i":"0"}}>
                    {/* <img src={lomo1} alt="lomo1"/> */}
                </span>
                <span style={{"--i":"1"}}></span>
                <span style={{"--i":"2"}}></span>
                <span style={{"--i":"3"}}></span>
                <span style={{"--i":"4"}}></span>
                <span style={{"--i":"5"}}></span>
                <ul>
                    <li>
                        <a href="#/">Personas</a>
                    </li>
                    <li>
                        <a href="#/">Generos</a>
                    </li>
                    <li>
                        <a href="#/">Libros</a>
                    </li>                    
                </ul>   
            </section>   
            
                            
        </header>
    )


}
