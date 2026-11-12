import type { Request, Response, NextFunction } from 'express';
import Order from '../models/Order.ts';
import User from '../models/User.ts';
import Product from '../models/Product.ts';

type OrderProduct = {
  productId: string;
  quantity: number;
};

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
    const isUserExists = await userExists(req.body.userId);

    if (!isUserExists) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const isProductListExists = await productListExist(req.body.products);

    if (!isProductListExists) {
      res.status(400).json({ message: 'Product(s) not found' });
      return;
    }

    const total = await calculateTotal(req.body.products);

    if (total === null) {
      res.status(400).json({ message: 'Product(s) not found' });
      return;
    }

    const order = await Order.create({ ...req.body, total });

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
    const orderPrev = await Order.findById(req.params.id);
    let products;

    if (!orderPrev) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    if (req.body.userId !== undefined) {
      const isUserExists = await userExists(req.body.userId);

      if (!isUserExists) {
        res.status(400).json({ message: 'User not found' });
        return;
      }
    }

    if (req.body.products !== undefined) {
      const isProductListExists = await productListExist(req.body.products);

      if (!isProductListExists) {
        res.status(400).json({ message: 'Product(s) not found' });
        return;
      }

      products = req.body.products;
    } else {
      products = orderPrev.products;
    }

    const total = await calculateTotal(products);

    if (total === null) {
      res.status(400).json({ message: 'Product(s) not found' });
      return;
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { ...req.body, total },
      {
        new: true,
        runValidators: true,
      },
    );

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

// *** //

const userExists = async (userId: string) => {
  return Boolean(await User.exists({ _id: userId }));
};

const productListExist = async (products: OrderProduct[]) => {
  for (const product of products) {
    const exists = await Product.exists({
      _id: product.productId,
    });

    if (!exists) {
      return false;
    }
  }

  return true;
};

const calculateTotal = async (products: OrderProduct[]) => {
  let total = 0;

  for (const product of products) {
    const productPrice = await Product.findById(product.productId).select('price');

    if (!productPrice) {
      return null;
    }

    total += productPrice.price * product.quantity;
  }

  return total;
};
