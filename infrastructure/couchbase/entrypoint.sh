#!/bin/bash
set -e

CB_ADMIN_USERNAME="${CB_ADMIN_USERNAME:-Administrator}"
CB_ADMIN_PASSWORD="${CB_ADMIN_PASSWORD:-password}"

CB_BUCKET_NAME="${CB_BUCKET_NAME:-car-bucket}"
CB_BUCKET_RAMSIZE="${CB_BUCKET_RAMSIZE:-512}"
CB_USER="${CB_USER:-caruser}"
CB_USER_PASSWORD="${CB_USER_PASSWORD:-caruserpass}"

CB_HOST="localhost"

# Start Couchbase server in the background
/entrypoint.sh couchbase-server &

echo "Waiting for Couchbase Server to be ready..."
until curl -s -u $CB_ADMIN_USERNAME:$CB_ADMIN_PASSWORD http://$CB_HOST:8091/pools > /dev/null; do
  sleep 5
  echo "Waiting..."
done

echo "Initializing cluster..."
couchbase-cli cluster-init -c $CB_HOST:8091 \
  --cluster-username $CB_ADMIN_USERNAME \
  --cluster-password $CB_ADMIN_PASSWORD \
  --services data,index,query \
  --cluster-ramsize $CB_BUCKET_RAMSIZE \
  --cluster-index-ramsize 256

echo "Creating bucket (if not exists)..."
couchbase-cli bucket-create -c $CB_HOST:8091 \
  --username $CB_ADMIN_USERNAME --password $CB_ADMIN_PASSWORD \
  --bucket $CB_BUCKET_NAME --bucket-type couchbase --bucket-ramsize $CB_BUCKET_RAMSIZE --enable-flush 1 || true

echo "Creating user (if not exists)..."
couchbase-cli user-manage -c $CB_HOST:8091 \
  --username $CB_ADMIN_USERNAME --password $CB_ADMIN_PASSWORD \
  --set --rbac-username $CB_USER --rbac-password $CB_USER_PASSWORD \
  --roles bucket_full_access[$CB_BUCKET_NAME] --auth-domain local || true

echo "Setup done. Keeping container running..."

# Keep the container running
tail -f /dev/null