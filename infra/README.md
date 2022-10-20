# K8s folder - naming convention

- `service-depl.yaml` - for service deployments, `foldername-depl`
- `service-mongo-depl.yaml` - for each services database instance, `foldername-mongo-depl`
- in general, `servicename-servicetype.yaml` is the convention here

## Coupled deployment and clusterIP services

For each service deployment, the respective clusterIP service is created in the same file.

## Creating secrets

- We don't want a config file, so can use an imperative command
- with command:

```
kubectl create secret generic [secret-name] --from-literal=[secret-variable-name]=[secret]
```

- run `kubectl get secrets` to view all current secrets`
