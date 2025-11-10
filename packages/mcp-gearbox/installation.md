---
title: Desktop Installation
sidebar_label: Installation
sidebar_position: 2
---

# MCP Gearbox Desktop Installation

## Prerequisites

* Node.js 18 or higher
* npm or yarn package manager

## Download

Download the latest release for your platform:

* Windows: mcp-gearbox-setup.exe
* macOS: mcp-gearbox.dmg
* Linux: mcp-gearbox.deb or mcp-gearbox.rpm

## Build from Source

```bash
# Clone the repository
git clone https://github.com/rohitsoni007/mcp-gearbox.git
cd mcp-gearbox

# Install dependencies
npm install

# Run in development mode
npm start

# Build for production
npm run make
```

## Technology Stack

* Framework: Electron 39 with Electron Forge
* Frontend: React 19 with TypeScript
* Routing: TanStack Router
* State Management: Redux Toolkit with Redux Persist
* UI Components: shadcn/ui with Radix UI primitives
* Styling: Tailwind CSS 4
* Build Tool: Vite (Rolldown)
* Testing: Vitest + Playwright