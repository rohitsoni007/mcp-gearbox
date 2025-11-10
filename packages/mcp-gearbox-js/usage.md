---
title: JS Usage
sidebar_label: Usage
sidebar_position: 2
---

# MCP Gearbox JS Usage

## CLI Usage

After installation, you can use the CLI commands directly:

```bash
# Interactive MCP server selection
mcp init

# Configure for specific AI agent
mcp init -a copilot
mcp init -a continue
mcp init -a kiro
mcp init -a cursor
mcp init -a qoder
mcp init -a claude
mcp init -a gemini
mcp init -a lmstudio

# Initialize in current directory
mcp init .

# Initialize in specific directory
mcp init my-project -a kiro
```

## Programmatic Usage

You can also use this package programmatically in your Node.js applications:

```javascript
const { executeMcpCli, isMcpCliInstalled } = require('mcp-gearbox');

async function example() {
  // Check if mcp-cli is installed
  const isInstalled = await isMcpCliInstalled();
  console.log('MCP Gearbox installed:', isInstalled);
  
  // Execute mcp-cli command
  const result = await executeMcpCli(['init', '.', '-a', 'kiro']);
  console.log('Exit code:', result.code);
}
```

### TypeScript Support

```typescript
import { executeMcpCli, isMcpCliInstalled, ExecutionResult } from 'mcp-gearbox';

async function example(): Promise<void> {
  const isInstalled: boolean = await isMcpCliInstalled();
  console.log('MCP Gearbox installed:', isInstalled);
  
  const result: ExecutionResult = await executeMcpCli(['init', '.', '-a', 'kiro']);
  console.log('Exit code:', result.code);
}
```

## Troubleshooting

### Python not found

If you get a "Python not found" error:

1. Install Python 3.11+ from python.org
2. Ensure Python is in your PATH
3. Try reinstalling: npm uninstall -g mcp-gearbox && npm install -g mcp-gearbox

### Installation fails

If the automatic installation fails:

1. Install manually: pip install git+https://github.com/rohitsoni007/mcp-gearbox-cli
2. Or use uv: uv tool install mcp-gearbox --force --from git+https://github.com/rohitsoni007/mcp-gearbox-cli