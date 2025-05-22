#!/bin/bash
set -e

echo "INFO: Starting secret upload process for Cloudflare Worker."

WORKER_NAME="web" 


if [ -z "$DMNO_ENV" ]; then
  echo "ERROR: DMNO_ENV is not set. This script needs DMNO_ENV to resolve correct secrets."
  echo "Usage example: DMNO_ENV=production pnpm dmno run -- bash ./scripts/upload-secrets.sh"
  exit 1
fi

echo "INFO: Targeting DMNO environment: $DMNO_ENV"
echo "INFO: Targeting Cloudflare Worker: $WORKER_NAME"

secrets_to_upload=(
  "DATABASE_URI"
  "PAYLOAD_SECRET"
  "RESEND_API_KEY"
  "RESEND_FROM_EMAIL"
  "RESEND_FROM_NAME"
  "S3_BUCKET_NAME"
  "S3_ENDPOINT"
  "S3_ACCESS_KEY_ID"
  "S3_ACCESS_KEY_SECRET"
  "S3_REGION"
  "CMS_SERVER_URL"
  "WEB_SITE_URL"
  "WEB_SITE_REVALIDATE_SECRET"
)

echo "INFO: Will attempt to upload the following secrets: ${secrets_to_upload[*]}"

successful_uploads=0
skipped_uploads=0

for secret_name in "${secrets_to_upload[@]}"; do
  echo "INFO: Resolving '${secret_name}' for service 'web' in environment '${DMNO_ENV}'..."
  secret_value=$(dmno resolve "${secret_name}" --service=web -f plain)

  if [ -z "$secret_value" ]; then
    echo "WARNING: Resolved value for '${secret_name}' is empty. Skipping upload for this secret."
    skipped_uploads=$((skipped_uploads + 1))
    continue
  fi

  echo "INFO: Setting '${secret_name}' in Cloudflare worker '${WORKER_NAME}'..."
  if echo -n "$secret_value" | wrangler secret put "${secret_name}" --name "${WORKER_NAME}"; then
    echo "SUCCESS: '${secret_name}' set."
    successful_uploads=$((successful_uploads + 1))
  else
    echo "ERROR: Failed to set secret '${secret_name}'. Check wrangler output above."
    exit 1 
  fi
done

echo "INFO: Secret upload process finished."
echo "INFO: Successful uploads: $successful_uploads"
echo "INFO: Skipped uploads (empty value): $skipped_uploads"

if [ "$successful_uploads" -eq 0 ] && [ ${#secrets_to_upload[@]} -gt 0 ] && [ "$skipped_uploads" -ne ${#secrets_to_upload[@]} ]; then
  echo "WARNING: No secrets were successfully uploaded. Please check logs and configurations."
fi