import { Router } from "express";
import { TodosRoutes } from "./todos/routes";


export class AppRoutes {

    static get routes(): Router {

        const router = Router()

        router.use("/api/todo", TodosRoutes.routes)

        return router
    }


}

