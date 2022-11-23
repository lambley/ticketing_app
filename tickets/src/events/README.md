# Events

## Handling Publish Event Failures

In the event that the NATS streaming server is down when a transaction/ticket has been created, transactions/tickets will be sent to both a transaction/ticket DB and an Events DB.

The events DB will contain a collection of received events, along with a status of whether the event has been emitted to the respective service.

This will ensure that data is accurate between services.
