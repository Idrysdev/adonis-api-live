// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext, Response } from "@adonisjs/core/build/standalone";
import Todo from "App/Models/Todo";

export default class TodosController {
    public async index(){
        const todos = Todo.all();
        return todos;
    }

    
    public async store({request, response}:HttpContext)
    {
        Todo.create({title:request.input("title") , is_completed:true})
        return response.status(201).json({'created':true})
    }

    public async edit({params})
    {
        const todo = await Todo.findOrFail(params.id);
        return todo
       
    }

    public async update({request , params})
    {
        const todo = await Todo.findOrFail(params.id)
        todo.title = request.input("title")
        todo.is_completed = request.input("is_completed")
        todo.save()
        return todo

    }

    public async delete({params})
    {
        const todo = await Todo.findOrFail(params.id)
        await todo.delete();
        return "deleted"
    }

 

   
   
} 
