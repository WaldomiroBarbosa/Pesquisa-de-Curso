import { useState } from "react"
import axios from "axios"

import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

const Cadastro = () =>
{
    const [msg, setMsg] = useState(' ')

    const form = useForm()
    const { register, handleSubmit, formState } = form
    const { errors } = formState

    const regUser = (data) =>
    {
        axios.post("http://localhost:3000/cadastro", data)
        .then( (response) => 
        {
            setMsg(response.data)
        }).catch( (error) =>
        {
            if (error.response && error.response.data)
                setMsg(error.response.data)
            else setMsg("Erro não identificado, tente novamente mais tarde.")
        })
    }
    
    return (
        <div>
            <h3>Vamos usar um site com a moçada!</h3>
            <form onSubmit={handleSubmit(regUser)}>
                <label htmlFor="username">Nome:</label>
                <input type="text" id="username" {...register('username')}/>

                <label htmlFor="email">E-Mail:</label>
                <input type="text" id="email" {...register('email')}/>

                <label htmlFor="password">Senha:</label>
                <input type="password" id="password" {...register('password')}/>

                <button>Cadastrar!</button>
            </form>
            <p>{msg}</p>
            <div>
                Já tem uma conta?
                <Link to="/">Logar agora.</Link>
            </div>
        </div>
    )
}

export default Cadastro