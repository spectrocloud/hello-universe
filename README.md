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
docker pull ghcr.io/spectrocloud/hello-universe:1.0.2
docker run -p 8080:8080 ghcr.io/spectrocloud/hello-universe:1.0.2
```

## Non-Docker
To run locally without Docker:

```
git clone git@github.com:spectrocloud/hello-universe.git
npm ci
npm run start
```

## Dependencies

- [Count API](https://countapi.xyz/) is used to keep a global count of clicks.
- [React Spring](https://github.com/pmndrs/react-spring) is used to animate the logo.