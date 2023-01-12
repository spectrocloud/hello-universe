# Hello Universe

Hello Universe is a demo application intended for learning about [Palette](https://docs.spectrocloud.com/introduction) and to help showcase product features.

<p align="center">
<img src="./static/img/demo.gif" alt="drawing" width="400"/>
</p>

# Run App

Get started with Hello Universe by choosing between two deployment approcahes; docker or a non-docker based approach.

## Docker

Hello Universe is available as a Docker image.
To run Hello Universe issue the following commands:

```shell
docker pull ghcr.io/spectrocloud/hello-universe:1.0.4
docker run -p 8080:8080 ghcr.io/spectrocloud/hello-universe:1.0.4
```

## Non-Docker
To run locally without Docker:

```
git clone git@github.com:spectrocloud/hello-universe.git
npm ci
npm run start
```

## Environment Variables

Hello Universe accepts the following environment variables:

| Variable    | Description                                        | Default   |
|-------------|----------------------------------------------------|-----------|
| API_URI     | The fully qualified hostname and port of the API server, such as `http://localhost:3000`    | "" |
| API_VERSION  | The API version number    | `1` |
| REVERSE_PROXY| Enable to use the reverse proxy. This value is set to `true` in the proxy container image. |`false`|


## Connecting to API Server

Hello Universe's capabilities can be expanded if connected to the [Hello Universe API](https://github.com/spectrocloud/hello-universe-api). 
To connect Hello Universe to the API server, provide the API server's fully qualified hostname and port as an environment variable value.
Be aware that the API server requires an available Postgres database. Checkout [Hello Universe DB](https://github.com/spectrocloud/hello-universe-db) for a dockerized Postgres instance ready for integration with the Hello Universe API.


```shell
API_URI=http://localhost:3000
```

If you are using the Docker image then use the `-e` flag parameter.

```shell
docker run -p 8080:8080  -e API_URI=http://localhost:3000 ghcr.io/spectrocloud/hello-universe:1.0.4
```

### Reverse Proxy

A Docker container with a reverse proxy for `http://0.0.0.0:3000` is available. The reverse proxy is usefull for scenarios when you need to deploy the 
hello universe application into a Kubernetes cluster or similar architectures and need the UI to route requests internal to the hosting platform 
to reach the API. **The reverse proxy expects the API to be listening on port `3000`.**

```shell
docker run -p 8080:8080 -e API_URI="http://myprivate.api.address.example:3000"  ghcr.io/spectrocloud/hello-universe:1.0.5-proxy
```

# Development

Create an environment file `.env` file and add the following values:

```
REACT_APP_API_URI=http://localhost:3000
REACT_APP_API_VERSION=1
```

The `.env` file is how you point to the local development API server. Otherwise, you will use the global API counter.


## Clean
To remove the build folder use the command `make clean`

## Build
To build the hosting assets use the command `make build`
### Development Server
To start the local development server without a proxy use the command `make start`.

### Server w/o Reverse Proxy
To start the Caddy server without a reverse proxy use the command `make start-prod`.

### Server w/o Reverse Proxy
To start the Caddy server with a reverse proxy use the command `make start-proxy`.

## Dependencies

- [Caddy](https://caddyserver.com/docs/)
- [Count API](https://countapi.xyz/) is used to keep a global count of clicks.
- [React Spring](https://github.com/pmndrs/react-spring) is used to animate the logo.
