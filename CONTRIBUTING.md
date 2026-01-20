# Contribution Guide

Welcome to the project! We greatly appreciate your contributions.
Before submitting your contribution, please take a moment to read the following guidelines.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request, please first check the
[issue tracker](https://github.com/stackclass/frontend/issues)
to see if the issue already exists. If it doesn't, please create a new issue
and provide as much detail as possible, including:

- A description of the issue
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Relevant logs or screenshots (if applicable)

### Submitting Pull Requests

1. **Fork the Repository**: First, fork this project to your GitHub account.

2. **Clone the Repository**: Clone the forked repository to your local machine.

   ```bash
   git clone https://github.com/stackclass/frontend.git
   cd frontend
   ```

3. **Install Prerequisites**: Make sure you have [just](https://github.com/casey/just) installed.

4. **Setup Development Environment**:

   ```bash
   just setup  # Copies .env.example to .env and installs dependencies
   ```

5. **Create a Branch**: Create a new branch for your changes.

   ```bash
   git checkout -b your-branch-name
   ```

6. **Make Changes**: Make your changes locally.

7. **Run Checks**: Ensure all checks pass before submitting your changes.

   ```bash
   just all  # Runs lint, typecheck, and build
   ```

8. **Commit Changes**: Commit your changes with a clear commit message.

   ```bash
   git add .
   git commit -m "Describe your changes"
   ```

9. **Push Changes**: Push your changes to GitHub.

   ```bash
   git push origin your-branch-name
   ```

10. **Create a Pull Request**: Create a Pull Request on GitHub and describe your changes.
    Make sure your PR includes the following:

    - The purpose of the changes
    - Related issue number (if applicable)
    - Any other relevant context

### Code Style

Please follow the project's code style guidelines:

- Use `ESLint` for static code analysis
- Run the following commands to ensure your code adheres to the style guidelines:

  ```bash
  just lint       # Runs ESLint to check for issues
  just lint-fix   # Runs ESLint with auto-fix
  just typecheck  # Runs TypeScript type checking
  ```

### Available Commands

Run `just` to see all available commands:

```bash
just            # List all commands
just setup      # Setup development environment
just dev        # Run development server
just build      # Build for production
just lint       # Run ESLint
just lint-fix   # Run ESLint with auto-fix
just typecheck  # Type check the project
just check      # Run all checks (lint + typecheck)
just all        # Run all checks and build
just clean      # Clean build artifacts
```

### Documentation

If your changes involve public APIs or features,
please make sure to update the relevant documentation.

## License

By submitting contributions, you agree that your contributions
will be licensed under the project's [LICENSE](LICENSE).

---

Thank you for contributing!
