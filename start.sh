#!/bin/bash
REACT_APP_API_URI=$API_URI REACT_APP_API_VERSION=$API_VERSION npx react-inject-env set && \
npm run server-prod &