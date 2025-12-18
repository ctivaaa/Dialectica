import { Router } from "express";
import librosController from "../controllers/libros.js";

const librosRouter= Router()

librosRouter.post("/", librosController.create)
librosRouter.get("/", librosController.readAll)
librosRouter.get("/:id", librosController.readOne)
librosRouter.put("/:id", librosController.update)
librosRouter.delete("/:id", librosController.delete)


export default librosRouter               