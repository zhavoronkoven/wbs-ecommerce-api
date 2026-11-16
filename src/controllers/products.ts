import type { Request, Response, NextFunction } from 'express';
import Product from '../models/Product.ts';
import Category from '../models/Category.ts';

type ProductQuery = {
  categoryId?: string;
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = res.locals.validatedQuery as ProductQuery;

    const products = await Product.find(categoryId ? { categoryId } : {});

    res.status(200).json(
      products.map((product) => ({
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
      })),
    );
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isCategoryExists = await categoryExists(req.body.categoryId);

    if (!isCategoryExists) {
      next({ statusCode: 404, message: 'Category not found' });
      return;
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      next({ statusCode: 404, message: 'Product not found' });
      return;
    }

    res.status(200).json({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.categoryId !== undefined) {
      const exists = await categoryExists(req.body.categoryId);

      if (!exists) {
        next({ statusCode: 404, message: 'Category not found' });
        return;
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      next({ statusCode: 404, message: 'Product not found' });
      return;
    }

    res.status(200).json({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      next({ statusCode: 404, message: 'Product not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// *** //

const categoryExists = async (categoryId: string) => {
  return Boolean(await Category.exists({ _id: categoryId }));
};
