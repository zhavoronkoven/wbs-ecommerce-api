import type { Request, Response, NextFunction } from 'express';
import Category from '../models/Category.ts';

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find();

    res.status(200).json(
      categories.map((category) => ({
        id: category._id,
        name: category.name,
      })),
    );
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      id: category._id,
      name: category.name,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json({
      id: category._id,
      name: category.name,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json({
      id: category._id,
      name: category.name,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
