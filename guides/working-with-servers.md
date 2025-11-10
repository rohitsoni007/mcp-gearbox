---
title: Working with MCP Servers
sidebar_label: Working with Servers
sidebar_position: 2
---

# Working with MCP Servers

This guide explains how to discover, install, and manage Model Context Protocol (MCP) servers using the MCP Gearbox tools.

## What are MCP Servers?

MCP servers are services that provide additional capabilities to AI coding agents through the Model Context Protocol. They can offer features like:

- File system access
- Git repository operations
- Database connectivity
- API integrations
- Custom tool execution
- And much more

## Discovering Available Servers

### Using the CLI

```bash
# List all available MCP servers
mcp list --servers

# List servers with JSON output
mcp list --servers --json
```

### Using the Desktop App

1. Open the MCP Gearbox Desktop application
2. Navigate to the "Servers" tab
3. Browse the available servers in the discovery view
4. Use the search and filter options to find specific servers

## Installing Servers

### Global Installation

Install servers globally to make them available to all projects:

```bash
# Interactive installation
mcp init

# Install specific servers for a specific agent
mcp init -a copilot --servers "git filesystem"

# Install multiple servers at once
mcp init -a continue -s git -s filesystem -s http
```

### Project-Specific Installation

Install servers for a specific project:

```bash
# Initialize MCP in current directory
mcp init .

# Install specific servers for current project
mcp init . -a copilot --servers "git filesystem"

# Initialize MCP in a new project directory
mcp init my-project -a continue -s git -s filesystem
```

### Using the Desktop App

1. Open the MCP Gearbox Desktop application
2. Select the AI agent you want to configure
3. Browse or search for servers
4. Click "Install" on the servers you want to add
5. The servers will be automatically configured for your selected agent

## Managing Installed Servers

### Listing Configured Servers

```bash
# List globally configured servers
mcp list

# List servers for a specific agent
mcp list -a copilot

# List servers for current project
mcp list -p .

# List servers for a specific project
mcp list -p my-project

# List servers for a specific agent in a specific project
mcp list -a continue -p my-project
```

### Removing Servers

```bash
# Interactive removal
mcp rm

# Remove specific servers globally
mcp rm git filesystem

# Remove specific servers for a specific agent
mcp rm git filesystem -a copilot

# Remove all servers globally
mcp rm --all

# Remove all servers for a specific agent
mcp rm --all -a continue

# Remove servers from current project
mcp rm git filesystem -p .

# Remove all servers from a specific project
mcp rm --all -p my-project

# Force removal without confirmation
mcp rm git filesystem --force
```

### Using the Desktop App

1. Open the MCP Gearbox Desktop application
2. Navigate to the "Installed" tab
3. View your configured servers
4. Toggle servers on/off using the switches
5. Click "Remove" to uninstall servers
6. Use "Enable All" or "Disable All" for bulk operations

## Server Configuration

### Understanding Configuration Files

MCP Gearbox automatically generates configuration files for your AI agents:

- **GitHub Copilot**: `.vscode/settings.json`
- **Continue**: `.continue/config.py` or `.continue/config.js`
- **Kiro**: `.kiro/config.json`
- **Cursor**: `.cursor/rules.json`
- **Claude Code**: `.claude/config.json`
- **Gemini CLI**: `.gemini/config.json`
- **Qoder**: Project-level configuration (limited support)
- **LM Studio**: No project-level configuration needed

### Configuration Options

Most MCP servers support configuration options. When using the CLI, you can specify servers with options:

```bash
# Install a server with specific options (example syntax)
mcp init -a copilot --servers "filesystem?read=true&write=false"
```

In the Desktop app, you can configure server options through the settings interface.

## Best Practices

### 1. Start Small

Begin with essential servers like `git` and `filesystem` before adding more specialized ones.

### 2. Agent-Specific Configuration

Different AI agents may benefit from different server combinations:

- **GitHub Copilot**: git, filesystem, terminal
- **Continue**: git, filesystem, search, bash
- **Kiro**: git, filesystem, database, api

### 3. Project-Specific Setup

For projects with specific requirements, create project-specific configurations:

```bash
# In your project directory
mcp init . -a continue --servers "git filesystem database"
```

### 4. Regular Maintenance

Periodically review and update your server configurations:

```bash
# Check which agents are installed
mcp check

# List your current configuration
mcp list

# Update servers as needed
mcp rm old-server
mcp init -a continue -s new-server
```

## Troubleshooting

### Common Issues

1. **Server not appearing in agent**: Check that the agent is properly installed and that the configuration file was generated correctly.

2. **Permission errors**: Some servers require specific permissions. Check the server documentation for requirements.

3. **Connection issues**: Verify that the server process is running and accessible.

### Checking Agent Status

```bash
# Check all installed agents
mcp check

# Check specific agent
mcp check -a copilot

# Get detailed status in JSON format
mcp check --json --pretty
```

### Using the Desktop App for Troubleshooting

1. Open the MCP Gearbox Desktop application
2. Go to the "Status" or "Diagnostics" tab
3. Check agent installation status
4. Review server health (when implemented)
5. View configuration file locations
6. Access detailed logs and error messages

## Advanced Usage

### Scripting with the CLI

Create scripts to automate your MCP setup:

```bash
#!/bin/bash
# setup-mcp.sh

echo "Setting up MCP for new project..."
mcp init . -a continue --servers "git filesystem bash" --json
echo "MCP setup complete!"
```

### JSON Output for Automation

Use JSON output to integrate with other tools:

```bash
# Get server list as JSON
mcp list --json > servers.json

# Process with jq or other JSON tools
mcp list --json | jq '.servers[] | select(.enabled==true)'
```

### Combining Tools

You can use multiple MCP Gearbox tools together:

1. Use the Desktop app for initial setup and discovery
2. Use the CLI for automation and scripting
3. Use the JS wrapper for custom integrations

This approach gives you the benefits of both visual management and programmatic control.