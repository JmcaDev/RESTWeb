import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";



export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDatasource
    ){}

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto)
    }

    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll()
    }

    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id)
    }

    updateById(updatedTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateById(updatedTodoDto)
    }

    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id)
    }
}
