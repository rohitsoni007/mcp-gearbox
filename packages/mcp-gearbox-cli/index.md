---
title: MCP Gearbox CLI
sidebar_label: CLI Overview
sidebar_position: 1
---

# MCP Gearbox CLI

💫 MCP CLI to help you get started with MCP servers faster

CLI tool to quickly download, configure, and deploy Model Context Protocol (MCP) servers for AI agents — cross-platform support for Windows, macOS, and Linux.

## 🤔 Overview

MCP Gearbox is a powerful Python CLI dev-tools package that provides an interactive way to discover, download, and configure Model Context Protocol (MCP) servers from the official ecosystem. This AI-powered tool automatically configures model-context-protocol servers for your preferred AI coding agent with cross-platform support and intelligent configuration management.

## ⚡ Installation

### Using uv (recommended)

```bash
uv tool install mcp-gearbox --from git+https://github.com/rohitsoni007/mcp-gearbox-cli
```

### To upgrade mcp-cli run:

```bash
uv tool install mcp-gearbox --force --from git+https://github.com/rohitsoni007/mcp-gearbox-cli
```

### Using uvx (one-time execution)

```bash
uvx --from git+https://github.com/rohitsoni007/mcp-gearbox-cli mcp-cli
```

### Using uv & pip

```bash
uv tool install mcp-gearbox
```

### Using npm

```bash
npm install -g mcp-gearbox
```

### Using pip

```bash
pip install mcp-gearbox
```

### Development installation

```bash
git clone https://github.com/rohitsoni007/mcp-gearbox-cli
cd mcp-gearbox-cli
uv sync
```

## 🤖 Supported AI Agents

| Agent | Support | Notes |
| --- | --- | --- |
| GitHub Copilot | ✅ |
| Continue | ✅ |
| Kiro | ✅ |
| Cursor | ✅ |
| Claude Code | ✅ |
| Gemini CLI | ✅ |
| Qoder | ⚠️ | Qoder does not support project-level MCP configuration |
| LM Studio | ✅ | LM Studio does not need project-level MCP configuration |

## 🔧 MCP CLI Reference

The mcp command supports the following options:

### Commands

| Command | Description |
| --- | --- |
| init | Initialize MCP configuration (supports both project-specific and global configuration) |
| list | List configured MCP servers or all available servers |
| rm | Remove MCP servers from configuration |
| check | Check which AI agents are installed on your system |

### mcp init Arguments & Options

| Argument/Option | Type | Description |
| --- | --- | --- |
| `<directory>` | Argument | Directory to initialize MCP configuration (use . for current directory, omit for global configuration) |
| `--servers, -s` | Option | MCP server names to add directly. Use multiple times (-s git -s filesystem) or space-separated (-s "git filesystem") - optional |
| `--agent, -a` | Option | AI agent to configure: copilot, continue, kiro, cursor, claude, gemini, qoder, or lmstudio |
| `--json, -j` | Option | Output in JSON format without banner or UI |
| `--pretty` | Option | Pretty print JSON output (default: false) |

### mcp list Arguments & Options

| Argument/Option | Type | Description |
| --- | --- | --- |
| `--agent, -a` | Option | AI agent to list servers for: copilot, continue, kiro, cursor, claude, gemini, qoder, or lmstudio |
| `--project, -p` | Option | Project path (use '.' for current directory, omit for global configuration) |
| `--servers, -s` | Option | List all available MCP servers instead of configured ones |
| `--json, -j` | Option | Output in JSON format without banner or UI |
| `--pretty` | Option | Pretty print JSON output when listing available servers (default: false) |

### mcp rm Arguments & Options

| Argument/Option | Type | Description |
| --- | --- | --- |
| `<servers>` | Argument | MCP server names to remove (e.g., 'git', 'filesystem') - optional |
| `--all, -A` | Option | Remove all MCP servers |
| `--agent, -a` | Option | AI agent to configure: copilot, continue, kiro, cursor, claude, gemini, qoder, or lmstudio |
| `--project, -p` | Option | Project path (use '.' for current directory, omit for global configuration) |
| `--force, -f` | Option | Skip confirmation prompts |
| `--json, -j` | Option | Output in JSON format without banner or UI |
| `--pretty` | Option | Pretty print JSON output (default: false) |

### mcp check Arguments & Options

| Argument/Option | Type | Description |
| --- | --- | --- |
| `--agent, -a` | Option | Specific agent to check: copilot, continue, kiro, cursor, claude, gemini, qoder, or lmstudio |
| `--json, -j` | Option | Output in JSON format without banner or UI |
| `--pretty` | Option | Pretty print JSON output (default: false) |

## 📚 Features

* 🎯 Interactive AI agent selection and configuration
* 📋 Interactive MCP server selection with intelligent filtering
* 🔧 Automatic model-context-protocol configuration file generation
* 🌍 Cross-platform Python dev-tools support (Windows, Linux, macOS)
* 📁 Automatic AI agent configuration path detection
* 🔍 System-wide AI agent installation detection and status checking
* 🛠️ CLI-based workflow for seamless developer experience

## 🎯 Experimental Goals

* Common MCP server for all AI agents - Unified configuration and management across different AI platforms
* Future edit feature - Planned functionality to modify and update existing MCP configurations

## 🔧 Requirements

* Linux/macOS/Windows
* uv for package management
* Python 3.11+
* Git

If you encounter issues with an agent, please open an issue so we can refine the integration.

## 👥 Maintainers

* Rohit Soni (@rohitsoni007)

## 💬 Support

For support, please open a GitHub issue. We welcome bug reports, feature requests, and questions about using MCP CLI.

## 🙏 Acknowledgements

This project is based on the data from Model Context Protocol Servers and Github MCP Registry.

## 📄 License

This project is licensed under the terms of the MIT open source license. Please refer to the LICENSE file for the full terms.