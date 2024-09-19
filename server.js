const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Cria um banco de dados SQlite em memória
const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("lista-tarefas.db")

// Cria a tabela 'tarefas' no banco de dados
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY, tarefa TEXT)")
})

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})



