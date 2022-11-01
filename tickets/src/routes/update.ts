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
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    // throw 404 error if no ticket is found
    if (!ticket) {
      throw new NotFoundError();
    }

    // send back updated ticket
    res.send(ticket);
  }
);

export { router as updateTicketRouter };
