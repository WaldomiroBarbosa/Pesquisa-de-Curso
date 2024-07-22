import React from 'react'
import { Outlet } from "react-router-dom"

import './App.css'

function App() {


  return (
    <>
      <section>
        <header>
          <h1>Bem-vindo(a) ao sistema de cursos da UNIFEI!</h1>
        </header>
        <Outlet />
      </section>
    </>
  )
}

export default App
