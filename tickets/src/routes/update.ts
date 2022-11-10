import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorisedError,
} from '@lambley-ticketing/ticketing-common/build';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    // throw 404 error if no ticket is found
    if (!ticket) {
      throw new NotFoundError();
    }

    // check user owns the ticket theyre trying to edit
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorisedError();
    }

    // as update is valid and authentic - update ticket
    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();

    // send back updated ticket
    res.send(ticket);
  }
);

export { router as updateTicketRouter };