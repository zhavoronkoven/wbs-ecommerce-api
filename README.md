# E-Commerce API

[![Node.js](https://img.shields.io/badge/Node.js-24%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-ESNext-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000)](https://mongoosejs.com/)
[![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1)](https://zod.dev/)

A REST API for an e-commerce backend. It provides CRUD operations for users, categories, products, and orders, with request validation, MongoDB persistence, product-category integrity checks, order reference validation, and server-side order total calculation.

## Features

- User, category, product, and order CRUD operations
- Request validation with Zod for bodies, route parameters, and product filters
- MongoDB access through Mongoose
- Product filtering by category: `GET /api/products?categoryId=<id>`
- Validation of referenced users, products, and categories before creating or updating related data
- Order totals calculated on the server from current product prices and quantities
- Password fields excluded from user API responses
- Seed import for categories and products from JSON files

## Requirements

- Node.js 24 or newer
- MongoDB running locally or available through MongoDB Atlas
- npm

## Installation

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=mongodb://username:password@localhost:27017/?authSource=admin
MONGODB_NAME=ecommerce
```

`MONGODB_URI` and `MONGODB_NAME` are required by the database connection module.

## Running the project

Development mode:

```bash
npm run dev
```

Build the TypeScript source:

```bash
npm run build
```

Run the compiled application:

```bash
npm start
```

Import the sample categories and products:

```bash
npm run import
```

The API is mounted under `/api` and uses port `3000` by default.

## API endpoints

### Users

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/users`     | List users    |
| POST   | `/api/users`     | Create a user |
| GET    | `/api/users/:id` | Get a user    |
| PUT    | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

Example request:

```json
{
  "name": "Alex Smith",
  "email": "alex@example.com",
  "password": "secret123"
}
```

### Categories

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| GET    | `/api/categories`     | List categories   |
| POST   | `/api/categories`     | Create a category |
| GET    | `/api/categories/:id` | Get a category    |
| PUT    | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |

### Products

| Method | Endpoint                               | Description               |
| ------ | -------------------------------------- | ------------------------- |
| GET    | `/api/products`                        | List products             |
| GET    | `/api/products?categoryId=:categoryId` | List products by category |
| POST   | `/api/products`                        | Create a product          |
| GET    | `/api/products/:id`                    | Get a product             |
| PUT    | `/api/products/:id`                    | Update a product          |
| DELETE | `/api/products/:id`                    | Delete a product          |

Example request:

```json
{
  "name": "Wireless Keyboard",
  "description": "Compact Bluetooth keyboard",
  "price": 49.99,
  "categoryId": "65f1a2b3c4d5e6f789012345"
}
```

The referenced category must exist when a product is created or when its `categoryId` is changed.

### Orders

| Method | Endpoint          | Description     |
| ------ | ----------------- | --------------- |
| GET    | `/api/orders`     | List orders     |
| POST   | `/api/orders`     | Create an order |
| GET    | `/api/orders/:id` | Get an order    |
| PUT    | `/api/orders/:id` | Update an order |
| DELETE | `/api/orders/:id` | Delete an order |

Example request:

```json
{
  "userId": "65f1a2b3c4d5e6f789012345",
  "products": [
    {
      "productId": "65f1a2b3c4d5e6f789012346",
      "quantity": 2
    }
  ]
}
```

The `total` field calculated by the server from the current product prices and requested quantities. The referenced user and every referenced product must exist.

## Validation

The API validates:

- MongoDB ObjectId route parameters
- Required and non-empty text fields
- Email format
- Non-negative product prices
- Positive integer order quantities
- Product category filters
- Related user, category, and product existence where required

Update schemas use partial validation, so `PUT` endpoints accept partial request bodies.

## Project structure

```text
src/
├── controllers/   Request handlers and business logic
├── db/             MongoDB connection helpers
├── import/         Seed JSON files and import script
├── middleware/     Request validation middleware
├── models/         Mongoose models
├── routes/         Express route definitions
└── schemas/        Zod request schemas
```

## Data models

- `User`: name, email, password
- `Category`: name
- `Product`: name, description, price, category reference
- `Order`: user reference, product items with quantities, calculated total

All models use creation timestamps. User responses omit the password field.

## Scripts

| Command          | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| `npm run dev`    | Start the TypeScript application in watch mode |
| `npm run build`  | Compile TypeScript into `dist/`                |
| `npm start`      | Run the compiled application                   |
| `npm run import` | Import sample categories and products          |
