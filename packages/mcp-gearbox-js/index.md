---
title: MCP Gearbox JS
sidebar_label: JS Overview
sidebar_position: 1
---

# MCP Gearbox - Node.js Wrapper

A Node.js wrapper for the MCP Gearbox CLI Python CLI tool, allowing easy installation and usage via npm.

## Installation

```bash
npm install -g mcp-gearbox
```

## Prerequisites

* Node.js 20.0.0 or higher
* uv or Python 3.11+ (automatically detected during installation)
* Git (for installation from source)

## Supported AI Agents

* GitHub Copilot
* Continue
* Kiro
* Cursor
* Claude Code
* Gemini CLI
* Qoder
* LM Studio

## How it works

This Node.js wrapper:

1. Installation: Automatically installs the Python mcp-cli package using uv (preferred) or pip (fallback)
2. Execution: Provides mcp-cli and mcp commands that proxy to the Python implementation
3. Cross-platform: Works on Windows, macOS, and Linux

## License

MIT - See the main MCP Gearbox CLI repository for details.

## About

MCP Gearbox - Node.js Wrapper

### Topics

nodejs cli mcp mcp-server

## Languages

* JavaScript 58.3%
* TypeScript 41.7%