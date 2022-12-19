import { Router } from "express";

const router = Router();

router.post("/teste", (req,res) => {
    console.log(req.body);
    return res.send("ola, DEV!");
}); 


export {router};