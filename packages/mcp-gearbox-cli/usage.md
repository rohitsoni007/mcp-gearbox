---
title: CLI Usage Examples
sidebar_label: Usage Examples
sidebar_position: 2
---

# MCP Gearbox CLI Usage Examples

## 🔧 Usage Examples

```bash
# Check which AI agents are installed on your system
mcp check

# Interactive Model Context Protocol server selection (choose from available AI agents)
# Configure MCP globally
mcp init

# Configure MCP globally for GitHub Copilot AI agent
mcp init -a copilot

# Configure MCP globally for Continue AI
mcp init -a continue

# Configure MCP globally for Kiro AI agent
mcp init -a kiro

# Configure MCP globally for Cursor AI agent
mcp init -a cursor

# Configure MCP globally for Qoder AI agent
mcp init -a qoder

# Configure MCP globally for Claude Code
mcp init -a claude

# Configure MCP globally for Gemini CLI
mcp init -a gemini

# Configure MCP globally for LM Studio AI agent
mcp init -a lmstudio

# Add specific MCP servers directly without interactive selection
# Method 1: Space-separated in quotes
mcp init -a copilot --servers "git filesystem"

# Method 2: Multiple option flags
mcp init -a copilot -s git -s filesystem

# Add specific servers for Continue AI with JSON output (compact)
mcp init -a continue --servers "git filesystem" --json

# Add specific servers for Continue AI with pretty JSON output
mcp init -a continue --servers "git filesystem" --json --pretty

# Add servers to current directory project
mcp init . -a copilot --servers "git filesystem"

# Add servers to new project directory
mcp init my-project -a continue -s git -s filesystem

# Initialize MCP in current directory
mcp init .

# Initialize MCP in a new project directory
mcp init my-project

# Initialize MCP for GitHub Copilot AI agent in new project directory
mcp init my-project -a copilot

# Initialize MCP for Continue AI agent in new project directory
mcp init my-project -a continue

# Initialize MCP for Kiro AI agent in new project directory
mcp init my-project -a kiro

# Initialize MCP for Cursor AI agent in new project directory
mcp init my-project -a cursor

# Initialize MCP for Claude Code in new project directory
mcp init my-project -a claude

# Initialize MCP for Gemini CLI in new project directory
mcp init my-project -a gemini

# Initialize MCP for Qoder AI agent in new project directory
mcp init my-project -a qoder
```

### mcp list Examples

```bash
# Interactive MCP server listing (choose from available AI agents)
# List servers from global configuration
mcp list

# List servers for specific agent from global configuration
mcp list -a copilot
mcp list -a continue
mcp list -a kiro
mcp list -a cursor
mcp list -a claude
mcp list -a gemini
mcp list -a qoder
mcp list -a lmstudio

# List servers from current directory configuration
mcp list -p .

# List servers from specific project directory
mcp list -p my-project

# List servers for specific agent from project
mcp list -a copilot -p my-project

# Output in JSON format (useful for scripting and automation)
mcp list -a continue --json
mcp list -a continue -j

# JSON output for project-specific configuration
mcp list -a continue -p my-project --json
mcp list -a continue -p my-project -j

# List all available MCP servers (interactive display)
mcp list --servers
mcp list -s

# List all available MCP servers with JSON output (pretty printed)
mcp list --servers --json

# List all available MCP servers with pretty JSON output
mcp list --servers --json --pretty
mcp list -s -j --pretty
```

### mcp rm Examples

```bash
# Interactive MCP server removal (choose from configured servers)
# Remove servers from global configuration
mcp rm

# Interactive removal for specific agent
mcp rm -a copilot

# Remove specific MCP servers from global configuration
mcp rm git filesystem

# Remove specific servers for GitHub Copilot AI agent
mcp rm git filesystem -a copilot

# Remove specific servers for Continue AI
mcp rm git filesystem -a continue

# Remove specific servers for Kiro AI agent
mcp rm git filesystem -a kiro

# Remove specific servers for Cursor AI agent
mcp rm git filesystem -a cursor

# Remove specific servers for Claude Code
mcp rm git filesystem -a claude

# Remove specific servers for Gemini CLI
mcp rm git filesystem -a gemini

# Remove all MCP servers from global configuration
mcp rm --all

# Remove all servers for specific agent
mcp rm --all -a copilot

# Interactive removal from current directory configuration
mcp rm -p .

# Interactive removal from specific project directory
mcp rm -p my-project

# Remove specific servers from current directory configuration
mcp rm git filesystem -p .

# Remove specific servers from specific project directory
mcp rm git filesystem -p my-project

# Remove all servers from project directory
mcp rm --all -p my-project

# Remove servers with force (skip confirmations)
mcp rm git filesystem --force

# Remove all servers with force
mcp rm --all --force

# Output in JSON format (useful for scripting and automation)
mcp rm git filesystem -a continue --json
mcp rm git filesystem -a continue -j

# Output in pretty JSON format (human-readable)
mcp rm git filesystem -a continue --json --pretty

# Remove all servers with JSON output
mcp rm --all -a continue --json
mcp rm --all -a continue -j

# Remove all servers with pretty JSON output
mcp rm --all -a continue --json --pretty

# Remove servers from project with JSON output
mcp rm git filesystem -p my-project -a continue --json
mcp rm git filesystem -p my-project -a continue -j
```

### mcp check Examples

```bash
# Check all AI agents installation status
mcp check

# Check specific agent installation status
mcp check -a copilot
mcp check -a continue
mcp check -a kiro
mcp check -a cursor
mcp check -a claude
mcp check -a gemini
mcp check -a qoder
mcp check -a lmstudio

# Output in JSON format (useful for scripting and automation)
mcp check --json
mcp check -j

# Output in pretty JSON format (human-readable)
mcp check --json --pretty
mcp check -j --pretty

# Check specific agent with JSON output
mcp check -a continue --json
mcp check -a continue -j

# Check specific agent with pretty JSON output
mcp check -a continue --json --pretty
```

### General Examples

```bash
# Show version
mcp --version
mcp -v
```