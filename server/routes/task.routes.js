const { createTask, getTaskByParent, getOneTaskById, getAllTasks, deleteTask, updateTask, updateTaskStatus } = require("../controllers/task.controller");

module.exports = (app) => {
app.post("/api/tasks/create", createTask); //crear tarea
app.get('/api/tasks/parent/:id', getTaskByParent);
app.get('/api/tasks/:id', getOneTaskById);
app.get('/api/tasks', getAllTasks);
app.delete('/api/tasks/delete/:id', deleteTask);
app.put('/api/task/update/:id', updateTask); //Actualizar tarea
app.put('/api/tasks/update/:id', updateTaskStatus); //Actualizar tarea
};