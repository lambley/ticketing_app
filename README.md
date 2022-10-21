# ticketing_app

Ticket reselling app created using microservices architecture

**Technologies**:

- `React` (Frontend)
- `Typescript` and `Express` - creating an npm library (Backend)
- `MongoDB` and `Redis` (Database)
- `Next.js` (Framework)
- `Docker`, `Kubernetes`, `NATS streaming server` (Infrastructure)
- `Google Cloud` (remote environment) [optional]

**Global Dependencies**

- [cookie-session](https://www.npmjs.com/package/cookie-session)

## Features

- Users can list a ticket for an event for sale
- Other users can purchase this ticket
- Any user can list tickets for sale and purchase tickets
- When a user attemps to purchase a ticket, the ticket is 'locked' for 15 minutes
- While 'locked', no other user can purchase that ticket
- Ticket prices can be edited if they are not locked

## Resource Types

| User     |        |
| -------- | ------ |
| email    | string |
| password | string |

| Ticket  |                    |
| ------- | ------------------ |
| title   | string             |
| price   | number             |
| userId  | reference to User  |
| orderId | reference to Order |

| Order     |                                             |
| --------- | ------------------------------------------- |
| userId    | reference to User                           |
| status    | created/cancelled/awaitingPayment/completed |
| expiresAt | Date                                        |
| ticketId  | reference to ticket                         |

| Charge         |                          |
| -------------- | ------------------------ |
| orderId        | reference to Order       |
| status         | created/failed/completed |
| amount         | number                   |
| stripeId       | string                   |
| stripeRefundId | string                   |

## Service Types

| Name       | Desc                                                                    |
| ---------- | ----------------------------------------------------------------------- |
| auth       | all signup/in/out                                                       |
| tickets    | controls creation, editing, and ticket update logic                     |
| orders     | creating and editing orders                                             |
| expiration | monitors order time (default 15mins), after which an order is cancelled |
| payments   | responsible for charges via stripe                                      |

## Event types

- UserCreated UserUpdated
- OrderCreated OrderCancelled OrderExpired
- TicketCreated TicketUpdated
- ChargeCreated

## GoogleCloud

- notes on remote setup here

## Testing in Microservices

- Using [Jest](https://jestjs.io/) - with command `npm run test`.
- Make fake requests with [supertest](https://www.npmjs.com/package/supertest) library.

Scope:

- Test a single piece of code in isolation - e.g. `Unit Tests` for _individual middleware_
- Test how different pieces of code work together e.g. from one middleware to routehandler
- Test how different components work together e.g. testing microservice
- Test how different microservices work togehter e.g. how orders service works with ticketing service

Test Goals

- Basic Request Handling
- Unit Tests for database Models
- Event emitting and receiving
