# Client

For server-side rendering of app, the Next.js client handles fetching and building pages

## Dependencies

- [react](https://www.npmjs.com/package/react)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [next.js](https://www.npmjs.com/package/next)
- [bootstrap](https://www.npmjs.com/package/bootstrap)
- [axios](https://www.npmjs.com/package/axios)

## Start Client

- Install dependencies
- run `npm run dev`

## Next.js - Pages folder

Uses a Pages-style routing

- Index.js - this is the root route
- Other page files - map to other routes

## Note: Serverside rendering - making use of `getInitialProps`

`getInitialProps` is a Next.js convention to load data upon initial request, for serverside rendering.

Although there are difficulties making server requests within the ingress-nginx cluster... (browser requests are unaffected)

To access ingress-nginx within the cluster, the client must make a `Cross namespace service communication` (i.e. between `default` and `ingress-nginx` namespace). Namespace here has a specific meaning in Kubernetes. URL will take a form like so: `http://NAME_OF_SERVICE.NAMESPACE.svc.cluster.local`

In this project, ingress-nginx service name is `ingress-nginx-controller` (find this by running `kubectl get services -n ingress-nginx`)

An `ExternalNameService` is an alternative to map a simpler URL - see [here](https://kubernetes.io/docs/concepts/services-networking/service/)
