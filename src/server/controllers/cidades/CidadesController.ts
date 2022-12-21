import { Request, Response } from "express";
import * as yup from 'yup';

interface Icidade {
    nome: string;
}

const bodyValidation: yup.SchemaOf<Icidade> = yup.object().shape({
nome: yup.string().required().min(3),


});

export const create = async(req: Request<{}, {}, Icidade>, res: Response) => {
  let validateData: Icidade | undefined= undefined;
    try {
     validateData =  await bodyValidation.validate(req.body);
    } catch (error) {
        const yupError = error as yup.ValidationError;

        return res.json({
            errors: {
              default: yupError.message,

            }
    });
    }
    
    console.log(validateData);

    return res.send("Create!");
};
