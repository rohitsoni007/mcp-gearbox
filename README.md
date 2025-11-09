# MCP Gearbox

> A modern desktop application for managing Model Context Protocol (MCP) servers across multiple AI agents

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-39.0.0-47848F?logo=electron)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)

## What is MCP Gearbox?

MCP Gearbox is a powerful desktop application that simplifies the management of Model Context Protocol (MCP) servers for AI agents like Claude, Kiro, and others. Built with Electron, React, and TypeScript, it provides an intuitive interface to discover, install, configure, and manage MCP servers without touching configuration files.

### Key Features

- **🔍 Server Discovery** - Browse and search through available MCP servers from the community
- **⚡ One-Click Installation** - Install MCP servers to your AI agents with a single click
- **🎛️ Multi-Agent Support** - Manage servers across multiple AI agents from one interface
- **📊 Server Management** - Enable, disable, and remove servers with ease
- **🔧 Configuration Made Easy** - No need to manually edit JSON configuration files
- **🎨 Modern UI** - Built with shadcn/ui components and Tailwind CSS for a beautiful experience
- **💾 State Persistence** - Your settings and preferences are saved automatically

## Why MCP Gearbox?

Managing MCP servers manually can be tedious and error-prone. MCP Gearbox eliminates the complexity by:

- Providing a visual interface for server management
- Automating configuration file updates
- Offering server discovery and recommendations
- Supporting multiple AI agents in one place
- Reducing setup time from minutes to seconds

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Download

Download the latest release for your platform:

- **Windows**: `mcp-gearbox-setup.exe`
- **macOS**: `mcp-gearbox.dmg`
- **Linux**: `mcp-gearbox.deb` or `mcp-gearbox.rpm`

### Build from Source

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

## Usage

### Getting Started

1. **Launch MCP Gearbox** - Open the application
2. **Check Agent Status** - View which AI agents are installed and configured
3. **Browse Servers** - Explore available MCP servers
4. **Install Servers** - Click to add servers to your preferred agents
5. **Manage Configuration** - Enable/disable servers as needed

### Managing Servers

- **Add a Server**: Browse the server list and click "Install" on any server
- **Remove a Server**: Navigate to your installed servers and click "Remove"
- **Enable/Disable**: Toggle servers on or off without uninstalling

### Supported AI Agents

- Claude Desktop
- Kiro
- Other MCP-compatible agents

## Technology Stack

- **Framework**: Electron 39 with Electron Forge
- **Frontend**: React 19 with TypeScript
- **Routing**: TanStack Router
- **State Management**: Redux Toolkit with Redux Persist
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite (Rolldown)
- **Testing**: Vitest + Playwright

## Development

### Project Structure

```
mcp-gearbox/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── services/       # API and service layer
│   ├── store/          # Redux store and slices
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── main.ts         # Electron main process
│   ├── preload.ts      # Electron preload script
│   └── renderer.tsx    # React renderer entry
├── tests/              # E2E tests
└── forge.config.ts     # Electron Forge configuration
```

### Available Scripts

```bash
npm start              # Start development server
npm run build          # Build for production
npm run make           # Create distributable packages
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
npm test               # Run unit tests
npm run test:e2e       # Run end-to-end tests
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

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development setup
- Submitting pull requests
- Reporting issues
- Coding standards

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/rohitsoni007/mcp-gearbox/issues)
- **Discussions**: [GitHub Discussions](https://github.com/rohitsoni007/mcp-gearbox/discussions)

## Roadmap

- [ ] Server configuration editor
- [ ] Custom server addition
- [ ] Server health monitoring
- [ ] Backup and restore configurations
- [ ] Dark/light theme toggle
- [ ] Multi-language support

## Acknowledgments

- Built with [Electron Forge](https://www.electronforge.io/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Inspired by the MCP community

---

**Keywords**: MCP, Model Context Protocol, AI agents, Claude Desktop, Kiro, Electron app, server management, AI tools, desktop application, TypeScript, React, MCP servers, AI configuration, developer tools
