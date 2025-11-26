import { Request ,Response } from "express";
import Product  from "../models/Product.model";
import { where } from "sequelize";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products =  await Product.findAll({ where: { availability: true } });  
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
}
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product =  await Product.findOne({ where: { id, availability: true } });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
}
export const crearProduct = async (req: Request, res: Response) => {

   try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
}

export const UpdateProduct = async (req: Request, res: Response) => {
    

    try {
        const { id } = req.params;
        const product =  await Product.findOne({ where: { id, availability: true } });
        if (product) {
            // Update product fields
            await product.update(req.body);
            await product.save();

           res.json({data:product})
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
}

export const UpdateAvailability = async (req: Request, res: Response) => {
    

    try {
        const { id } = req.params;
        const product =  await Product.findOne({ where: { id } });
        if (product) {
            // Update availability field
            product.availability = !product.dataValues.availability;
            await product.save();

           res.json({data:product})
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;      
        const deletedCount = await Product.destroy({ where: { id } });
        if (deletedCount) {
            res.json({ message: 'Product deleted successfully' });  
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
}