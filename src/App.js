import React from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';

// Componentes estaticos
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

// Componente Login
import Login from './components/login/Login'

export default function App() {

  const auth = getAccessToken();

  if(!auth){
    return (

      <div className="App">
        <Login />
      </div>
      
    )
  }

  return (
  

    <div className="App">
    <Header />
        <div className="mt-5" style={{minHeight: "65vh"}}>
         
             

        
         
        </div>
    <Footer />
    </div> //Fin .App
  )
}

// FUNCION PARA VALIDAR TOKEN

const getAccessToken = ()=>{
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const id = parseInt(localStorage.getItem("ID"));
    const usuario = localStorage.getItem("USUARIO");

    if(!accessToken || accessToken === "null" ||
       !id || id === "null" ||
       !usuario || usuario === "null"
    ){
      return false;
    }

    const metaToken = jwtDecode(accessToken);    
    console.log(metaToken);
    if ( tokenExpira(accessToken, metaToken) || metaToken.user_id[0].usuario_id !== id || metaToken.nombre !== usuario) {
      return false
    }else{
      return true;
    }
}

// FUNCION PARA VERIFICAR FECHA DE EXPIRACION TOKEN

const tokenExpira = (accessToken, metaToken)=>{

    const seconds = 60;
    
    const { exp } = metaToken;
    
    const now = (Date.now()+seconds) / 1000;

    // console.log("now: ", now, "exp: ", exp);

    return exp < now;

}