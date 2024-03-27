#!/bin/sh
#########################################
# This script is used to query the Kubernetes API for the hostname of the hello-universe service
# and set the API_URI environment variable to the service IP.
# The script is only executed if the QUERY_K8S_API environment variable is set.
# Inspired by https://kubernetes.io/docs/tasks/run-application/access-api-from-pod/
# API reference: https://kubernetes.io/docs/reference/kubernetes-api/service-resources/service-v1/#ServiceStatus
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

HELLO_UNIVERSE_SERVICE=$(curl --silent --cacert ${CACERT} --header "Authorization: Bearer ${TOKEN}" -X GET ${APISERVER}/api/v1/namespaces/${NAMESPACE}/services/ui | jq -r '.status.loadBalancer.ingress[0].hostname')

  if [ -z "$HELLO_UNIVERSE_SERVICE" ] || [ "$HELLO_UNIVERSE_SERVICE" = "null" ]; then
    echo "HELLO_UNIVERSE_SERVICE is empty or null. Querying service IP using alternative method."
    HELLO_UNIVERSE_SERVICE=$(curl --silent --cacert ${CACERT} --header "Authorization: Bearer ${TOKEN}" -X GET ${APISERVER}/api/v1/namespaces/${NAMESPACE}/services/ui | jq -r '.status.loadBalancer.ingress[0].ip')

    if [ -z "$HELLO_UNIVERSE_SERVICE" ]; then
      echo "Failed to get service IP for hello-universe service"
      exit 1
    fi
  fi

  # Set API_URI only if QUERY_K8S_API is not empty
  echo "Setting API_URI to ${HELLO_UNIVERSE_SERVICE}:3000"
  export API_URI=$HELLO_UNIVERSE_SERVICE:3000
  echo "export API_URI=http://${HELLO_UNIVERSE_SERVICE}:3000" > /app/.env
  
  echo "Hello Universe service IP: ${HELLO_UNIVERSE_SERVICE}:3000"

else
  echo "QUERY_K8S_API is not set. Skipping service IP query."
  exit 0
fi


