import React from 'react'
import './App.css';

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

// Componente Login
import Login from './components/login/Login'

export default function App() {

  const auth = false;

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


