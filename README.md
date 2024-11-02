# dyn-serve-web-service

Dynamic web application service. This service provides the ability to install web services
and browser side tools dynamically on an express service.

# Run

## With swerve
```
swerve
```
## Locally
```
npm run server
```

## Portal
```
http://localhost:<port>/
```

### Default
```
http://localhost:3005/
```

## API
### WebService
bastPath: /v1/webservice

#### install
Installs a package from NPM
```
http://host:port/v1/webservice/install?serviceName=<npmPackageName>
body: {
    
}
```

## Management Portal
http://localhost:3005/
