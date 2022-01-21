import { Application, NextFunction, Request, Response } from 'express';

// base endpoint
const base = (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: 'Welcome to the Star Wars mini directory',
  });
};

export { base };
