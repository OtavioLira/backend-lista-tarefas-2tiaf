const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("lista-tarefas.db")

db.serialize(() => {
    db.run("CREATE TABLE IF NOT tarefas (id INTEGER PRIMARY KEY, tarefas TEXT)")
})

modules.exports = db;