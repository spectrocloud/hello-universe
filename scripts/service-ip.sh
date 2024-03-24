#!/bin/sh
#########################################
# This script is used to query the Kubernetes API for the hostname of the hello-universe service
# and set the API_URI environment variable to the service IP.
# The script is only executed if the QUERY_K8S_API environment variable is set.
#########################################

if [ -n "$QUERY_K8S_API" ]; then

# Point to the internal API server hostname
APISERVER=https://kubernetes.default.svc

# Path to ServiceAccount token
SERVICEACCOUNT=/var/run/secrets/kubernetes.io/serviceaccount

# Read this Pod's namespace
NAMESPACE=$(cat ${SERVICEACCOUNT}/namespace)

# Read the ServiceAccount bearer token
TOKEN=$(cat ${SERVICEACCOUNT}/token)

# Reference the internal certificate authority (CA)
CACERT=${SERVICEACCOUNT}/ca.crt

echo "Acquiring service IP for hello-universe service"
echo ""

HELLO_UNIVERSE_SERVICE=$(curl --silent --cacert ${CACERT} --header "Authorization: Bearer ${TOKEN}" -X GET ${APISERVER}/api/v1/namespaces/hello-universe/services/ui | jq -r '.status.loadBalancer.ingress[0].hostname')

  if [ -z "$HELLO_UNIVERSE_SERVICE" ]; then
    echo "Failed to get service IP for hello-universe service"
    exit 1
  fi

  # Set API_URI only if QUERY_K8S_API is not empty
  echo "Setting API_URI to ${HELLO_UNIVERSE_SERVICE}:3000"
  export API_URI=$HELLO_UNIVERSE_SERVICE:$PORT


  echo "Hello Universe service IP: ${HELLO_UNIVERSE_SERVICE}:3000"

else
  echo "QUERY_K8S_API is not set. Skipping service IP query."
  exit 0
fi


