import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Login from "./pages/Login.jsx"
import Cadastro from "./pages/Cadastro.jsx"
import BuscaCursos from './pages/BuscaCursos.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/cadastro',
        element: <Cadastro />
      }
    ]
  },
  {
    path: "/cursos",
    element: <BuscaCursos />
  },
  {
    path: "/cursos/:nome",
    element: <BuscaCursos />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
