import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

type HelmetOptions = Parameters<typeof helmet>[0];

export const helmetConfig: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      'default-src': ["'self'"],
      'base-uri': ["'self'"],
      'block-all-mixed-content': [],
      'font-src': ["'self'", 'https:', 'data:'],
      'frame-ancestors': ["'self'"],
      'img-src': ["'self'", 'data:', 'https:'],
      'object-src': ["'none'"],
      'script-src': ["'self'"],
      'script-src-attr': ["'none'"],
      'style-src': ["'self'", 'https:', "'unsafe-inline'"],
      'upgrade-insecure-requests': [],
    },
  },
};

export const helmetMiddleware = (req: Request, res: Response, next: NextFunction) => {
  helmet(helmetConfig)(req, res, next);
};
