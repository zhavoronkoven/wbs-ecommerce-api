import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

export function validateBody(schema: ZodType): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(result.error);
      return;
    }

    req.body = result.data as typeof req.body;
    next();
  };
}

export function validateParams(schema: ZodType): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      next(result.error);
      return;
    }

    req.params = result.data as typeof req.params;
    next();
  };
}

export function validateQuery(schema: ZodType): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      next(result.error);
      return;
    }

    // req.query = result.data as typeof req.query;
    res.locals.validatedQuery = result.data;
    next();
  };
}
