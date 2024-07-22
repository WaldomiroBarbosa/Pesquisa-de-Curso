import { useState, useEffect } from "react"
import axios from "axios"

import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

const Login = () =>
{
    const [msg, setMsg] = useState(' ')
    const [auth, setAuth] = useState(false)
    const navigate = useNavigate()

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState

    const logUser = (data) =>
    {
        axios.post("http://localhost:3000/login", data)
        .then( (response) =>
        {
            setMsg(response.data)
            if (response.data.includes('sucesso'))
                setAuth(true)
        }).catch( (error) =>
        {
            if (error.response && error.response.data)
                setMsg(error.response)
            else setMsg("Erro não identificado, tente novamente mais tarde.")
        })
    }

    useEffect( () =>
    {
        if(auth)
            navigate('/cursos')
    }, [auth, navigate])

    return (
        <div>
            <h3>Vamos usar um site juntos!</h3>
            <form onSubmit={handleSubmit(logUser)}>
                <label htmlFor="email">E-Mail:</label>
                <input type="text" id="email" {...register('email')}/>

                <label htmlFor="password">Senha:</label>
                <input type="password" id="password" {...register('password')}/>

                <button>Logar!</button>
            </form>
            <p>{msg}</p>
            <div>
                Ainda não tem uma conta?
                <Link to="/cadastro">Cadastre-se agora.</Link>
            </div>
        </div>
    )
}

export default Login