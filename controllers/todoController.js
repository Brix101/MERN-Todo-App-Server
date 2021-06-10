const Todo = require("../models/todoModel")
const jwt = require("jsonwebtoken");

// Create and Save a new Todo
exports.create = async (req, res) => {

  // Validate request
  if (!req.body.todo) {
    res.status(409).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);  
  var _userId = decoded.user  
  // Create a Todo
  const todo = {
    todo: req.body.todo,
    completed: req.body.completed ? req.body.completed : false,
    userId: _userId
  };

//   Save Todo in the database
  await Todo.create(todo)
    .then((data) => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({ message:err.message});
    });
};

// Retrieve all Todo from the database.
exports.findAllTodo = async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    const userId = decoded.user  

    await Todo.find({ userId})
      .then((data) => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({ message:err.message});
      });
};


// Find a single Todo with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
      await Todo.findById(id)
        .then((data) => {
          res.send(data);
        }).catch(err => {
          res.status(500).send({ message:err.message});
      });
};

// Update a Todo by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    
    await Todo.updateOne({_id: id},
      { $set: body })
      .then(() => {
        res.send({message: "Todo was Updated successfully."});
      }).catch(err => {
          res.status(500).send({ message:err.message});
      });
};

// Delete a Todo with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    await Todo.findByIdAndDelete(id)
      .then(() => {
          res.send({message: "Todo was Deleted successfully."});
      }).catch(err => {
          res.status(500).send({ message:err.message});
      });
};

// Find all Completed Tutorials
exports.findAllCompleted = (req, res) => {
    // Todo.findAll({ where: { Completed: true } })
    // .then(data => {
    //   res.send(data);
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while retrieving todo."
    //   });
    // });
};