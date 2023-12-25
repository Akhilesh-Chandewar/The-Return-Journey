import { Request, Response } from 'express';
import { ProductDTO, createProductDTO } from '../dto/productDto';

export const products: ProductDTO[] = [];

export const getAllProducts = (req: Request, res: Response) => {
    try {
        if (!products.length) {
            throw new Error('No products available');
        }
        res.status(200).json({
            success: true,
            products: products
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

export const getProductDetails = (req: Request, res: Response) => {
  try {
      const productId = req.params.id;
      const product = products.find((p) => p.id === productId);
      if (product) {
          res.json(product);
      } else {
          throw new Error('Product not found');
      }
  } catch (error:any) {
      res.status(404).json({
          success: false,
          message: error.message || 'Not Found'
      });
  }
};

export const createProduct = (req: Request, res: Response) => {
    try {
        const { name, description, price } = req.body;

        if (!name || !description || !price) {
            throw new Error('Please provide values for name, description, and price.');
        }

        const parsedPrice = parseFloat(price);

        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            throw new Error('Please provide a valid price.');
        }

        if (description.length > 1000) {
            throw new Error('Description is too long.');
        }

        const newProduct: ProductDTO = createProductDTO(name, description, parsedPrice);
        products.push(newProduct);

        res.status(201).json({ success: true, product: newProduct });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || 'Bad Request'
        });
    }
};

export const updateProduct = (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const updatedProduct: ProductDTO = req.body;
        const index = products.findIndex((p) => p.id === productId);

        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            res.json(products[index]);
        } else {
            throw new Error('Product not found');
        }
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message || 'Not Found'
        });
    }
};

export const deleteProduct = (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const index = products.findIndex((p) => p.id === productId);

        if (index !== -1) {
            const deletedProduct = products[index];
            products.splice(index, 1);
            res.json(deletedProduct);
        } else {
            throw new Error('Product not found');
        }
    } catch (error:any) {
        res.status(404).json({
            success: false,
            message: error.message || 'Not Found'
        });
    }
};


