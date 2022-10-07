# ticketing_app
Ticket reselling app created using microservices architecture
Built using:
- React (Frontend)
- Typescript and Express (Backend)
- MongoDB (Database)
- Docker and Kubernetes (Infrastructure)

## Features
- Users can list a ticket for an event for sale
- Other users can purchase this ticket
- Any user can list tickets for sale and purchase tickets
- When a user attemps to purchase a ticket, the ticket is 'locked' for 15 minutes
- While 'locked', no other user can purchase that ticket
- Ticket prices can be edited if they are not locked
