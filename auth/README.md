# Auth

## Dependencies

- typescript
- ts-node-dev
- express (and @types/express)
- skaffold
- ingress-nginx
- express-validator

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
