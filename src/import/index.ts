// TODO: use bulkWrite()
import { Types } from 'mongoose';

import { connect, disconnect } from '../db/index.ts';

import Category from '../models/Category.ts';
import Product from '../models/Product.ts';

import categories from './categories.json' with { type: 'json' };
import products from './products.json' with { type: 'json' };

type CategoryData = {
  name: string;
};

const importCategory = async (categoryData: CategoryData) => {
  return await Category.findOneAndUpdate(
    { name: categoryData.name },
    { $set: categoryData },
    { upsert: true, returnDocument: 'after' },
  );
};

type ProductData = {
  name: string;
  description: string;
  price: number;
  categoryId: Types.ObjectId;
};

const importProduct = async (productData: ProductData) => {
  return await Product.findOneAndUpdate(
    { name: productData.name },
    { $set: productData },
    { upsert: true, returnDocument: 'after' },
  );
};

const importData = async () => {
  try {
    await connect();

    // Import categories
    const categoryIds = new Map<string, Types.ObjectId>();

    for (const categoryData of categories) {
      const category = await importCategory(categoryData);

      if (!category) {
        throw new Error(`Category was not imported: ${categoryData.name}`);
      }

      categoryIds.set(categoryData.name, category._id);

      console.log(`Category successfully imported: ${categoryData.name}`);
    }

    // Import products
    for (const productData of products) {
      const productCategoryId = categoryIds.get(productData.category);

      if (!productCategoryId) {
        throw new Error(
          `CategoryId not found for product: ${productData.name}, ${productData.category}`,
        );
      }

      await importProduct({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        categoryId: productCategoryId,
      });

      console.log(`Product successfully imported: ${productData.name}`);
    }
  } catch (error) {
    console.error('Data import error:', error);
    process.exitCode = 1;
  } finally {
    await disconnect();
  }
};

importData();
