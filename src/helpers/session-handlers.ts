import { Request, Response, NextFunction } from 'express';

export const sessionCheck = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.loggedin) {
    next();
  } else {
    res.status(401).send({
      code: 404,
      message: 'You do not have permission to get this resources.',
    });
  }
}