import type { Request, Response, NextFunction } from 'express';
import Order from '../models/Order.ts';

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find();

    res.status(200).json(
      orders.map((order) => ({
        id: order._id,
        userId: order.userId,
        products: order.products,
        total: order.total,
      })),
    );
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json({
      id: order._id,
      userId: order.userId,
      products: order.products,
      total: order.total,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.status(200).json({
      id: order._id,
      userId: order.userId,
      products: order.products,
      total: order.total,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.status(200).json({
      id: order._id,
      userId: order.userId,
      products: order.products,
      total: order.total,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
