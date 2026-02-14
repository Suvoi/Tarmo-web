# Tarmo - Web

The modern frontend interface for the **Tarmo** system, providing a visual way to manage processes, resources, and templates.

## Disclaimer

This is a work in progress. The project is not yet ready for production use.

## Overview

Tarmo Web is a web application built to interact with the Tarmo Engine. it features a responsive design and an intuitive workflow for defining complex templates and tracking resource usage.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [SWR](https://swr.vercel.app/)
- **Type Safety**: [OpenAPI-TypeScript](https://openapi-ts.pages.dev/) (for auto-generated API types)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) (recommended)

### Installation

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env.local` and set your API URL.

### Running the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Development

This project uses the `engine/oas.yml` file to generate TypeScript types. To update the types after an API change, run the appropriate generation script (if configured) or use `openapi-typescript`.
