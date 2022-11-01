# Tickets Service

Function of this service:

- (READ) List all tickets - index, `GET: /api/tickets`
- (READ) Show individual tickets - show, `GET: /api/tickets/:id`
- (CREATE) Create a new ticket - _needs authentication_ - new, `POST: /api/tickets`
- (UPDATE) Edit a ticket - _needs authentication_ - update, `POST: /api/tickets/:id`

## Sharing Code between services - some thoughts

`require_auth` middleware already exists in `auth` service - how can other services access that middleware, or other 'common code'?

- Copy 'common code' - _bad idea_
- Git Submodule for 'common code' - _better, but fiddly_
- Publish 'common code' as an NPM package - _better, approach that is used here_

Library used in this project is on [npmjs.com](https://www.npmjs.com/org/lambley-ticketing)
