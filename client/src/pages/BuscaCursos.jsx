import { useState } from "react"
import axios from "axios"

import { useForm } from "react-hook-form"
import Curso from "./Curso"

const BuscaCursos = () =>
{
    const [msg, setMsg] = useState('  ')
    const [curso, setCurso] = useState(<p>...</p>)

    const form = useForm()
    const { register, handleSubmit } = form

    const searchCourses = (data) =>
    {
        let endpoint = "http://localhost:3000/cursos"
        if (data.curso !== ' ') 
            endpoint = `${endpoint}/${data.curso}`

        axios.get(`${endpoint}`)
        .then( (response) =>
        {
            const view = []
            if (Array.isArray(response.data))
                for (let curso of response.data)
                    view.push(<Curso data={curso}/>)
            else view.push(<Curso data={response.data}/>)

            setCurso(view)
            setMsg(<p></p>)
        }).catch ( (error) =>
        {
            setCurso(<p></p>)
            setMsg(<p>{error.response.data}</p>)
        })
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(searchCourses)}>
                <input type="text" {...register('curso')}/>
                <button>Buscar!</button>
            </form>
            {msg}
            {curso}
        </div>
    )
}

export default BuscaCursos