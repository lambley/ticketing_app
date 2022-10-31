import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
} from '@lambley-ticketing/ticketing-common/build';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post(
  '/api/ticket',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      // override currentUser warning - requireAuth middleware checks user exists
      userId: req.currentUser!.id,
    });

    await ticket.save();

    res.status(201).send({ msg: 'ticket created', ticket });
  }
);

export { router as createTicketRouter };
