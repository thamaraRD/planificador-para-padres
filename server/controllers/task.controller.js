const Task = require("../models/task.model");

module.exports.createTask = async (req, res) => {
  try{
    const taskOnly = await Task.create(req.body);
  return res.json( taskOnly ); 
  } catch(err){
      console.log(err);
      return res.status(500).json({ error: err });
    };
};
module.exports.getAllTasks = async (_, res) => {
    try {
      const tasks = await Task.find();
      console.log(tasks);
      return res.json({ tasks });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };

  module.exports.getTaskByParent = async (req, res) =>{
    try{
      // console.log('pasaste por aqui?');
        const taskParent = await Task.find({ author: req.params.id });
        return res.json(taskParent);
    }catch (err){
      return res.status(500).json({ error: err,
          msg: 'error desde el ByParent'
        });
    }
  }

  module.exports.getOneTaskById = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await (await Task.findById(id)).populate('author', 'parentName childName email');
      return res.json( task );
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };

  module.exports.deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTask = await Task.deleteOne({ _id: id });
      return res.json({
        message: "Se ha borrado a la tarea exítosamente",
        task: deletedTask,
      });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };
  module.exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const updateTheTask = await Task.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
      return res.json({
        message: "Se actualizó la tarea correctamente",
        updateTheTask,
      });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };
  module.exports.updateTaskStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const updateTheTask = await Task.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
      return res.json({
        message: "Se actualizó la tarea correctamente",
        updateTheTask,
      });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  };
  