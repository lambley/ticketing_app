# Auth

Custom authentication service, including password hashing, creating JSON Web Tokens (JWTs), using JWTs in Cookies (for server-side rendering) etc.

## Dependencies

- typescript
- ts-node-dev
- express (and @types/express)
- skaffold
- ingress-nginx
- express-validator
- express-async-errors
- mongoose
- [cookie-session](https://www.npmjs.com/package/cookie-session) (and @types/cookie-session)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (and @types/jsonwebtoken)

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

## About JWTs
- JWT encoded in base64 - go [here](https://www.base64decode.org/) to decode cookie value
- Visit [jwt.io](https://jwt.io/) to find out more about JWTs
