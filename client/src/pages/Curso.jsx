
const Curso = ( {data} ) =>
{
    return (
        <ul>
            <h2>{data.nome}</h2>
            <li>Tempo: {data.tempo}</li>
            <li>Período: {data.periodo}</li>
        </ul>
    )
}

export default Curso