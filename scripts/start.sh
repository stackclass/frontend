#!/bin/bash

# Define a list of environment variables to check and replace
VARIABLES=("NEXT_PUBLIC_BACKEND_URL" "NEXT_PUBLIC_ANALYTICS_ID")

# Check if each variable is set
for VAR in "${VARIABLES[@]}"; do
    if [ -z "${!VAR}" ]; then
        echo "$VAR is not set. Please set it and rerun the script."
        exit 1
    fi
done

# Find and replace BAKED values with real values
find /app/public /app/.next -type f -print0 | xargs -0 grep -i -l "BAKED_" |
while read -r file; do
    for VAR in "${VARIABLES[@]}"; do
        sed -i "s|BAKED_$VAR|${!VAR}|g" "$file"
    done
done

# Start the Next.js server
node server.js
