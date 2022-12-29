import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CidadeController } from "./../controllers";

const router = Router();

router.get("/", (_, res) => {
    return res.send("Olá, DEV!");
});


router.get("/cidades", CidadeController.getAllValidation ,  CidadeController.getAll );
router.get("/cidades/:id", CidadeController.getByIdValidation ,  CidadeController.getById );
router.put("/cidades/:id", CidadeController.updateByIdValidation ,  CidadeController.updateById);
router.post("/cidades", CidadeController.createValidation ,  CidadeController.create );
router.delete("/cidades/:id", CidadeController.deleteValidation ,  CidadeController.deleteById );

export { router };
