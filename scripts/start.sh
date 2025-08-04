#!/bin/bash

# Define a list of mandatory environment variables to check
MANDATORY_VARS=("NEXT_PUBLIC_BACKEND_URL")

# Define a list of optional environment variables (no check needed)
OPTIONAL_VARS=("NEXT_PUBLIC_ANALYTICS_ID")

# Check if each mandatory variable is set
for VAR in "${MANDATORY_VARS[@]}"; do
    if [ -z "${!VAR}" ]; then
        echo "$VAR is not set. Please set it and rerun the script."
        exit 1
    fi
done

# Combine mandatory and optional variables for replacement
ALL_VARS=("${MANDATORY_VARS[@]}" "${OPTIONAL_VARS[@]}")

# Find and replace BAKED values with real values
find /app/public /app/.next -type f -print0 | xargs -0 grep -i -l "BAKED_" |
while read -r file; do
    for VAR in "${ALL_VARS[@]}"; do
        sed -i "s|BAKED_$VAR|${!VAR}|g" "$file"
    done
done

# Start the Next.js server
node server.js
