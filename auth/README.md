# Auth

## Dependencies

- typescript
- ts-node-dev
- express (and @types/express)
- skaffold
- ingress-nginx

## Initial setup

- run `tsc --init`

## Deployment

- in infra/k8s
- build docker image
- apply deployment
- run `skaffold dev`
