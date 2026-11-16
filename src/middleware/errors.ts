import type { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';

export const errors: ErrorRequestHandler = (error, _req, res, next) => {
  console.error(error);

  if (res.headersSent) {
    next(error);

    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      message: 'Validation error',
      details: error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });

    return;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      message: 'Database validation error',
      details: Object.values(error.errors).map((item) => ({
        path: item.path,
        message: item.message,
      })),
    });
    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({
      message: 'Invalid value',
      details: [
        {
          path: error.path,
          message: `Invalid ${error.kind}`,
        },
      ],
    });

    return;
  }

  if (typeof error === 'object' && error !== null) {
    const err = error as {
      statusCode?: number;
      message?: string;
    };

    res.status(err.statusCode ?? 500).json({
      message: err.message ?? 'Internal server error',
    });

    return;
  }

  res.status(500).json({
    message: 'Internal server error',
  });
};
