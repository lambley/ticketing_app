// emit event on ticket creation to NATS streaming server
import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@lambley-ticketing/ticketing-common/build';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
