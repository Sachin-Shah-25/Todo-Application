const express=require('express');
const { addTodoFun,updateTodoFun,deleteTodoFun } = require('../UserController/todocontroller');
const { verifyUser } = require('../helper/utils');
const todorouter=express.Router();



todorouter.post("/addtodo",verifyUser,addTodoFun);
todorouter.put("/updatetodo/:id",verifyUser,updateTodoFun);
todorouter.delete("/deletetodo/:id",verifyUser,deleteTodoFun);

module.exports=todorouter;