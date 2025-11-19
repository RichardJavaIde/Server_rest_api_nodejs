import { Request ,Response } from "express";
import Product  from "../models/Product.model";
import {validationResult} from "express-validator"

export const crearProduct = async (req: Request, res: Response) => {



let errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}


    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
}