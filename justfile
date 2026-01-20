# List all available commands
default:
    just --list

# Install dependencies
install:
    npm install

# Run the development server
dev:
    npm run dev

# Build the project for production
build:
    npm run build

# Start the production server
start:
    npm run start

# Run ESLint to check for issues
lint:
    npm run lint

# Run ESLint with auto-fix
lint-fix:
    npm run lint -- --fix

# Type check the project
typecheck:
    npx tsc --noEmit

# Clean the build artifacts
clean:
    rm -rf .next node_modules

# Run all the checks (lint + typecheck)
check:
    just lint
    just typecheck

# Run all commands in the local environment
all:
    just check
    just build

# Setup development environment
setup:
    cp -n .env.example .env || true
    just install

# Build Docker image locally
docker-build tag="latest":
    docker build -t stackclass-frontend:{{ tag }} .

# Run Docker container locally
docker-run tag="latest" port="3000":
    docker run -p {{ port }}:3000 --env-file .env stackclass-frontend:{{ tag }}

# Bump version in package.json (interactive)
bump-version:
    #!/usr/bin/env bash
    set -euo pipefail

    # Show current version
    current_version=$(node -p "require('./package.json').version")
    echo "Current version: $current_version"

    # Prompt for new version
    read -p "New version: " new_version

    # Validate version format
    if ! [[ "$new_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "Error: Version must be in format X.Y.Z (e.g., 1.0.0)"
        exit 1
    fi

    echo ""

    # Update package.json
    npm version "$new_version" --no-git-tag-version
    echo "Updated package.json"

    # Run full validation
    echo ""
    echo "Running validation..."
    just all

    echo ""
    echo "Version bump to $new_version completed! Run 'just release' to commit and push."

# Release current version (commit, tag, push)
release:
    #!/usr/bin/env bash
    set -euo pipefail

    # Helper function for confirmation
    confirm() {
        read -p "$1 [y/N] " response
        case "$response" in
            [yY][eE][sS]|[yY]) return 0 ;;
            *) return 1 ;;
        esac
    }

    # Get current version from package.json
    version=$(node -p "require('./package.json').version")

    echo "=== Release v$version ==="
    echo ""

    # Step 1: Git add and commit
    echo "=== [1/3] Git add and commit ==="
    echo "Changes to be committed:"
    git status --short
    echo ""
    if confirm "Run 'git add -A && git commit -m \"chore: bump version to $version\"'?"; then
        git add -A
        git commit -m "chore: bump version to $version"
        echo ""
    else
        echo "Aborted at step 1/3."
        exit 0
    fi

    # Step 2: Git tag
    echo "=== [2/3] Git tag ==="
    if confirm "Run 'git tag -m \"v$version\" v$version'?"; then
        git tag -m "v$version" "v$version"
        echo ""
    else
        echo "Aborted at step 2/3."
        exit 0
    fi

    # Step 3: Push branch and tag
    echo "=== [3/3] Push branch and tag ==="
    if confirm "Run 'git push origin main v$version'?"; then
        git push origin main "v$version"
        echo ""
    else
        echo "Aborted at step 3/3."
        exit 0
    fi

    echo "=== Release v$version completed successfully! ==="
