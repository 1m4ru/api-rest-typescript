import { validation } from "./../../shared/middleware/Validation";
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface Icidade {
    cidade: string;
}

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

interface IparamProps {
    id?: number;
}

interface IbodyProps {
    cidade: string;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<Icidade>(
        yup.object().shape({
            cidade: yup.string().required().min(3),
        })
    ),
}));

export const create = async (req: Request<{}, {}, Icidade>, res: Response) => {
    console.log(req.body);

    return res.status(StatusCodes.CREATED).send("Não implementado");
};

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        yup.object().shape({
            page: yup.number().notRequired().moreThan(0),
            limit: yup.number().notRequired().moreThan(0),
            filter: yup.string().notRequired(),
        })
    ),
}));

export const getAll = async (
    req: Request<{}, {}, {}, IQueryProps>,
    res: Response
) => {
    res.setHeader("acess-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", 1);

    return res.status(StatusCodes.OK).json({
        id: 1,
        cidade: "Palhoça",
    });
};

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IparamProps>(
        yup.object().shape({
            id: yup.number().integer().required().moreThan(0),
        })
    ),
}));

export const getById = async (req: Request<IparamProps>, res: Response) => {
    if (Number(req.params.id) === 99999)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: "Registro não encontrado.",
            },
        });

    return res.status(StatusCodes.OK).json({
        id: req.params.id,
        cidade: "Palhoça",
    });
};

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IbodyProps>(
        yup.object().shape({
            cidade: yup.string().required().min(3),
        })
    ),
    params: getSchema<IparamProps>(
        yup.object().shape({
            id: yup.number().integer().required().moreThan(0),
        })
    ),
}));

export const updateById = async (
    req: Request<IparamProps, {}, IbodyProps>,
    res: Response
) => {
    if (Number(req.params.id) === 99999)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: "Registro não encontrado",
            },
        });

    return res.status(StatusCodes.NO_CONTENT).send();
};

export const deleteValidation = validation((getSchema) => ({
    params: getSchema<IparamProps>(
        yup.object().shape({
            id: yup.number().integer().required().moreThan(0),
        })
    ),
}));

export const deleteById = async (req: Request<IparamProps>, res: Response) => {
    if (Number(req.params.id) === 99999)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: "Registro não encontrado",
            },
        });

    return res.status(StatusCodes.NO_CONTENT).send();
};
