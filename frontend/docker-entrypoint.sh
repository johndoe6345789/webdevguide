#!/bin/sh
set -e

# Replace the build-time placeholder with the runtime API URL.
# Next.js inlines NEXT_PUBLIC_* vars into the JS bundles at build time,
# so we sed the compiled output before starting the server.
if [ -n "$NEXT_PUBLIC_API_URL" ]; then
  find /app/.next -type f -name '*.js' -exec \
    sed -i "s|__NEXT_PUBLIC_API_URL_PLACEHOLDER__|$NEXT_PUBLIC_API_URL|g" {} +
fi

exec "$@"
