import { NextApiRequest, NextApiResponse } from 'next';

// Defining the correct type for the middleware
export default function initMiddleware(middleware: (req: NextApiRequest, res: NextApiResponse, next: () => void) => void) {
  return (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    middleware(req, res, () => {
      // No need to pass arguments here for next()
      return next();
    });
  };
}
