# Frontend web application for StackClass

[![License](https://img.shields.io/github/license/stackclass/frontend)](https://github.com/stackclass/frontend/blob/main/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/stackclass/frontend)](https://github.com/stackclass/frontend/graphs/contributors)
[![GitHub issues](https://img.shields.io/github/issues/stackclass/frontend)](https://github.com/stackclass/frontend/issues)

A modern frontend for StackClass built with Next.js.

## Features

- **Next.js**: Fast and SEO-friendly React framework.
- **Geist Font**: Optimized font loading with `next/font`.
- **Vercel Deployment**: Easy deployment on Vercel.
- **Responsive Design**: Works on all devices.

## Prerequisites

- [Node.js](https://nodejs.org/) 22 or later
- [just](https://github.com/casey/just) command runner (recommended)

## Getting Started

This project uses [just](https://github.com/casey/just) as a command runner. To see all available commands:

```bash
just
```

### Setup

```bash
just setup  # Copies .env.example to .env and installs dependencies
```

### Development

```bash
just dev    # Run the development server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Other Commands

```bash
just build      # Build for production
just lint       # Run ESLint
just typecheck  # Run TypeScript type checking
just check      # Run all checks (lint + typecheck)
just all        # Run all checks and build
just clean      # Clean build artifacts
```

### Docker

```bash
just docker-build           # Build Docker image
just docker-run             # Run Docker container
just docker-build v1.0.0    # Build with specific tag
```

## Contributing

If anything feels off, or if you feel that some functionality is missing, please
check out the [contributing page](CONTRIBUTING.md). There you will find
instructions for sharing your feedback, building the project locally, and
submitting pull requests to the project.

## License

Copyright (c) The StackClass Authors. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
