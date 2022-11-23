// emit event on ticket update to NATS streaming server
import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@lambley-ticketing/ticketing-common/build';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
