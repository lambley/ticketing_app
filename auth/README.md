# Auth

Hand made authentication, including password hashing, creating login tokens

## Dependencies

- typescript
- ts-node-dev
- express (and @types/express)
- skaffold
- ingress-nginx
- express-validator
- express-async-errors
- mongoose

## Initial setup

- run `tsc --init`

## Development environment

- in infra/k8s
- build docker image
- apply deployment
- run `skaffold dev`
- `windows`: add `127.0.0.1 ticketing.dev` to end of `host` file in `C:\Windows\System32\drivers\etc` - this will redirect ticketing.dev to localhost
- `mac`: do the same to the `host` file in `/etc
- when running in chrome (and other browsers), to circumvent the safety warning, type `thisisunsafe` anywhere in the browser window i.e. click anywhere and type - this will allow development access to ticketing/dev (localhost)

## About the database

MongoDB (via Mongoose) and TypeScript can be tricky to connect - typing is the main issue.

Adds 3 extra interfaces to allow TypeScript to check instance creation. See `/models/user.ts`

## About custom errors

All belong to Abstract class CustomError

- `database-connection-error` - (not fully implemented) status 500
- `not-found-error` - status 404 when route not found
- `request-validation-error` - status 400 on failing validation
- `bad-request-error` - status 400 general use bad request
