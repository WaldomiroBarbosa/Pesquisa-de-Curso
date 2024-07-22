const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())

PORT = 3000

app.listen(PORT, () => 
{
    console.log(`Servidor na porta ${PORT}`)
})

pathU = path.join(__dirname, 'bd', '.', 'bd_usuarios.json')
usuarios = JSON.parse(fs.readFileSync(pathU, {encoding: 'utf-8'}))

pathC = path.join(__dirname, 'bd', '.', 'bd_cursos.json')
cursos = JSON.parse(fs.readFileSync(pathC, {encoding: 'utf-8'}))

app.post("/cadastro", (req, res) =>
{
    const { username, email, password } = req.body
    try
    {
        const usuarioX = usuarios.find(usuario => usuario.email === email)
        if (usuarioX) 
            return res.send(`Já existe um usuário com o e-mail ${email}.`)

        const novo_usuario = 
        {
            id: usuarios.length + 1,
            nome: username,
            email: email,
            senha: password
        }

        usuarios.push(novo_usuario)
        fs.writeFileSync(pathU, JSON.stringify(usuarios, null, 2), {encoding: 'utf-8'})

        return res.send("Usuário cadastrado com sucesso.")

    } catch (error) {
        throw new Error("Erro ao cadastrar.")
    }
})

app.post("/login", (req, res) => 
{
    const { email, password } = req.body

    try 
    {
        usuarioX = usuarios.find(usuario => usuario.email === email)
        if (!usuarioX)
            return res.send(`Usuário com e-mail ${email} não existe.`)
        
        if (usuarioX.senha !== password)
            return res.send("Senha incorreta.")

        return res.send("Usuário autenticado com sucesso.")
    } catch (error) {
        throw new Error("Erro ao logar.")
    }
})

app.get("/cursos", (req, res) =>
{
    return res.json(cursos)
})

app.get("/cursos/:nome", (req, res) =>
{
    const nomeX = req.params.nome.toLowerCase()

    const lista_cursos = cursos.filter(curso => curso.nome.toLowerCase().includes(nomeX))

    if (lista_cursos.length === 0) return res.send("Nenhum curso encontrado.")

    return res.json(lista_cursos)
})