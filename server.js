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

// Rota para adicionar uma tarefa
app.post("/tarefas", (req, res) => {
    const { tarefa } = req.body
    db.run("INSERT INTO tarefas (tarefa) VALUES (?)", [tarefa], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(201).json({ id: this.lastID, tarefa })
    })
})

// Rota para obter todas as tarefas
app.get("/tarefas", (req, res) => {
    db.all("SELECT * FROM tarefas", [], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json(row)
    })
})

// Rota para obter um tarefa especifica
app.get('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM tarefas WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            res.status(200).json(row);
        } else {
            res.status(404).json({ error: 'Tarefa não encontrada!' });
        }
    });
});



// Rota para editar uma tarefa especifica
app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { tarefa } = req.body;
    db.run("UPDATE tarefas SET tarefa = ? WHERE id = ?", [tarefa, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes) {
            res.status(200).json({ message: 'Tarefa atualizada com sucesso!' });
        } else {
            res.status(404).json({ error: 'Tarefa não encontrada!' });
        }
    });
});


// Rota para excluir uma tarefa
app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM tarefas WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes) {
            res.status(200).json({ message: 'Tarefa removida com sucesso!' });
        } else {
            res.status(404).json({ error: 'Tarefa não encontrada!' });
        }
    });
});