---
title: Getting Started with MCP Gearbox
sidebar_label: Introduction
sidebar_position: 1
---

# Getting Started with MCP Gearbox

Welcome to the MCP Gearbox documentation! MCP Gearbox is a comprehensive ecosystem of tools designed to simplify the management of Model Context Protocol (MCP) servers for AI agents.

## What is MCP Gearbox?

MCP Gearbox provides three main components to help you work with MCP servers:

1. **[MCP Gearbox CLI](../packages/mcp-gearbox-cli/index.md)** - A powerful Python CLI tool for managing MCP servers from the command line
2. **[MCP Gearbox Desktop](../packages/mcp-gearbox/index.md)** - A modern desktop application with a graphical interface for managing MCP servers
3. **[MCP Gearbox JS](../packages/mcp-gearbox-js/index.md)** - A Node.js wrapper that allows you to use the CLI tool via npm

## Which Tool Should You Choose?

### Use the CLI if you:
- Prefer command-line interfaces
- Need to automate MCP server management
- Want to integrate MCP management into scripts
- Are comfortable with terminal-based workflows

### Use the Desktop App if you:
- Prefer graphical interfaces
- Want a visual way to browse and manage MCP servers
- Are new to MCP and want an intuitive experience
- Need to manage multiple AI agents simultaneously

### Use the JS Wrapper if you:
- Are building Node.js applications that need MCP integration
- Want to programmatically manage MCP servers
- Prefer using npm to manage your tools
- Need to integrate MCP management into JavaScript/TypeScript projects

## Supported AI Agents

All MCP Gearbox tools support these AI agents:

* GitHub Copilot
* Continue
* Kiro
* Cursor
* Claude Code
* Gemini CLI
* Qoder
* LM Studio

## Quick Start

### For CLI users:
```bash
npm install -g mcp-gearbox
mcp init
```

### For Desktop users:
1. Download the latest release for your platform
2. Install the application
3. Launch MCP Gearbox
4. Start managing your MCP servers

### For JavaScript/Node.js developers:
```bash
npm install mcp-gearbox
```

```javascript
const { executeMcpCli } = require('mcp-gearbox');
await executeMcpCli(['init', '.']);
```

## Next Steps

- Learn more about the [MCP Gearbox CLI](../packages/mcp-gearbox-cli/index.md)
- Explore the [MCP Gearbox Desktop](../packages/mcp-gearbox/index.md) application
- Check out the [MCP Gearbox JS](../packages/mcp-gearbox-js/index.md) wrapper