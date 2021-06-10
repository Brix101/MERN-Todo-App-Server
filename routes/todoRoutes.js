const Todos = require("../controllers/todoController");
const auth = require("../middlewares/auth");
const router = require("express").Router();

// Create a new todo
router.post("/create" ,auth, Todos.create);

// Retrieve all Todos
router.get("/todos", Todos.findAllTodo);

// Retrieve all published Todos
router.get("/completed", Todos.findAllCompleted);

// Retrieve a single todo with id
router.get("/:id", Todos.findOne);

// Update a todo with id
router.put("/:id",auth, Todos.update);

// Delete a todo with id
router.delete("/:id",auth, Todos.delete);


module.exports = router;