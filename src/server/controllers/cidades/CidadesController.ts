import { validation } from "./../../shared/middleware/Validation";
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface Icidade {
    cidade: string;
    estado: string;
}
interface IFilter {
    filter?: string;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<Icidade>(yup.object().shape({
        cidade: yup.string().required().min(3),
        estado: yup.string().required().min(2),
    }),
) ,
    query: getSchema<IFilter>(yup.object().shape({
        filter: yup.string().required().min(2),
    })) 
}));

export const create = async (req: Request<{}, {}, Icidade>, res: Response) => {
    console.log(req.body);

    return res.send("Create");
};
