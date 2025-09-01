import { Request, Response } from "express"
import { prisma } from "../../data/postgreSQL"


export class TodosController {

    //* DI: Dependencies Injections
    constructor() {}

    public getTodos = async (req: Request, res: Response) => {
        
        const todos = await prisma.todo.findMany()

        return res.json(todos)
        
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id

        if(isNaN(id)) return res.status(400).json({error: `ID argument is not a number`})

        const todo = await prisma.todo.findUnique({where: {
            id
        }})

        if(todo){
            res.json(todo)
        }else {
            res.status(404).json({error: `TODO with id ${id} not found`})
        }
    }

    public createTodo = async (req: Request, res: Response) => {

        const { text } = req.body

        if(!text) return res.status(400).json({ error: "Text property is required"})

        const todo = await prisma.todo.create({
            data: {text: text}
        })

        res.json(todo)

    }

    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id
        if(isNaN(id)) return res.status(400).json({error: `ID argument is not a number`})

        const todo = await prisma.todo.findUnique({where: {id}})
        if(!todo) return res.status(404).json({ error: `Todo with id ${id} not found`})

        const {text, completedAt} = req.body

        todo.text = text || todo.text

        if(completedAt === "null"){
            todo.completedAt = null
        }else {
            todo.completedAt = new Date(completedAt || todo.completedAt)
        }

        const updateTodo = await prisma.todo.update({
            where: {
                id
            },
            data: {
                text: todo.text,
                completedAt: todo.completedAt
            }
        })

        return res.json(updateTodo)

    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id

        const todo = await prisma.todo.findUnique({where: {id}})
        if(!todo) return res.status(404).json({ error: `Todo with id ${id} not found`})

        const deleteTodo = await prisma.todo.delete({where: {id}})

        res.status(200).json({message: `Todo with ID ${id} was deleted successfully`})

    }

}
