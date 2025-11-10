---
title: Desktop Usage
sidebar_label: Usage
sidebar_position: 3
---

# MCP Gearbox Desktop Usage

## Getting Started

1. Launch MCP Gearbox - Open the application
2. Check Agent Status - View which AI agents are installed and configured
3. Browse Servers - Explore available MCP servers
4. Install Servers - Click to add servers to your preferred agents
5. Manage Configuration - Enable/disable servers as needed

## Managing Servers

* Add a Server: Browse the server list and click "Install" on any server
* Remove a Server: Navigate to your installed servers and click "Remove"
* Enable/Disable: Toggle servers on or off without uninstalling

## Development

### Project Structure

```
mcp-gearbox/
├── src/
│   ├── components/ # React components
│   ├── hooks/ # Custom React hooks
│   ├── pages/ # Page components
│   ├── services/ # API and service layer
│   ├── store/ # Redux store and slices
│   ├── types/ # TypeScript type definitions
│   ├── utils/ # Utility functions
│   ├── main.ts # Electron main process
│   ├── preload.ts # Electron preload script
│   └── renderer.tsx # React renderer entry
├── tests/ # E2E tests
└── forge.config.ts # Electron Forge configuration
```

### Available Scripts

```bash
npm start # Start development server
npm run build # Build for production
npm run make # Create distributable packages
npm run lint # Run ESLint
npm run format # Format code with Prettier
npm test # Run unit tests
npm run test:e2e # Run end-to-end tests
```

### Testing

```bash
# Unit tests with Vitest
npm test
npm run test:watch
npm run test:coverage

# E2E tests with Playwright
npm run test:e2e
npm run test:e2e:ui
```

## Contributing

We welcome contributions! Please see our CONTRIBUTING.md for details on:

* Code of Conduct
* Development setup
* Submitting pull requests
* Reporting issues
* Coding standards

## Acknowledgments

* Built with Electron Forge
* UI components from shadcn/ui
* Icons from Lucide
* Inspired by the MCP community

Keywords: MCP, Model Context Protocol, AI agents, Claude Desktop, Kiro, Electron app, server management, AI tools, desktop application, TypeScript, React, MCP servers, AI configuration, developer tools

## About

A modern desktop application for managing Model Context Protocol (MCP) servers across multiple AI agents

### Topics

electron react desktop-app typescript mcp developer-tools ai-agents tailwindcss ai-tools shadcn-ui model-context-protocol mcp-servers claude-code kiro

## Releases

Release v0.0.1 (20251109-125811) Latest

Nov 9, 2025

+ 1 release

## Languages

* TypeScript 97.8%
* CSS 2.1%
* HTML 0.1%