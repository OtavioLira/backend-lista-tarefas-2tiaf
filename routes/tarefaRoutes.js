const express = require("express")
const router = express.Router()
const tarefaController = require("../controllers/tarefaController")

// Rotas para criar nova tarefa
router.post("/tarefas", tarefaController.createTarefas)

// Rotas para listar todas as tarefas
router.get("/tarefas", tarefaController.getTarefas)

// Rotas para obter uma tarefa especifica
router.get("/tarefas/:id", tarefaController.getTarefaById)

// Rotas para atualizar uma tarefa
router.put("/tarefas/:id", tarefaController.updateTarefa)

// Rotas para deletar uma tarefa
router.delete("/tarefas/:id", tarefaController.deleteTarefa)

module.exports = router;