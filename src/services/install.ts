#!/usr/bin/env node

import { spawn } from "cross-spawn";
import which from "which";
import fs from "fs";
import path from "path";
import os from "os";
// Constants - defined directly to avoid dependency issues during install
const CONFIG_BASE_DIR = ".mcpgearbox";
const CONFIG_FILE_NAME = "config.json";
const UV_INSTALL_ARGS = [
  "tool",
  "install",
  "mcp-gearbox",
  "--force",
  "--from",
  "git+https://github.com/rohitsoni007/mcp-gearbox-cli",
];
const PYTHON_INSTALL_ARGS = [
  "-m",
  "pip",
  "install",
  "git+https://github.com/rohitsoni007/mcp-gearbox-cli",
];

console.log("Installing mcp-cli Python package...");

// Function to save installation priority to config file
function savePriorityConfig(method: any, executablePath: any) {
  const configDir = path.join(os.homedir(), CONFIG_BASE_DIR);
  const configPath = path.join(configDir, CONFIG_FILE_NAME);
  const config = {
    installMethod: method,
    executablePath: executablePath,
    installedAt: new Date().toISOString(),
  };

  try {
    // Ensure directory exists
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`✅ Priority config saved to ${configPath}`);
  } catch (error: any) {
    console.warn(`⚠️  Could not save config file: ${error.message}`);
  }
}

export async function installMcpCli(): Promise<boolean> {
  // Check for uv first (recommended)
  try {
    const uvPath = which.sync("uv");
    console.log("Found uv, installing with uv tool...");

    const uvInstallResult = await new Promise<boolean>((resolve) => {
      const uvProcess = spawn(uvPath, UV_INSTALL_ARGS, { stdio: "inherit" });

      uvProcess.on("close", (code: number) => {
        if (code === 0) {
          console.log("✅ mcp-cli installed successfully with uv!");
          // Determine the uv executable path
          const homeDir = process.env.HOME || process.env.USERPROFILE;
          const pathSep = process.platform === "win32" ? "\\" : "/";
          const uvMcpCli = `${homeDir}${pathSep}.local${pathSep}bin${pathSep}mcp-cli${
            process.platform === "win32" ? ".exe" : ""
          }`;
          savePriorityConfig("uv", uvMcpCli);
          resolve(true);
        } else {
          console.log("⚠️  uv installation failed, trying pip...");
          resolve(false); // Continue to pip fallback
        }
      });
      uvProcess.on("error", () => {
        console.log("⚠️  uv installation failed, trying pip...");
        resolve(false); // Continue to pip fallback
      });
    });

    if (uvInstallResult) {
      return true; // Successfully installed with uv
    }
  } catch (e) {
    console.log("uv not found, trying pip...");
  }

  // Fallback to pip
  const pythonCommands = ["python3", "python", "py"];
  let pythonPath = null;

  for (const cmd of pythonCommands) {
    try {
      pythonPath = which.sync(cmd);
      break;
    } catch (e) {
      // Continue to next command
    }
  }

  if (!pythonPath) {
    console.error(
      "❌ Python not found. Please install Python 3.11+ and try again."
    );
    console.error("   Visit: https://www.python.org/downloads/");
    process.exit(1);
  }

  console.log(`Found Python at: ${pythonPath}`);
  console.log("Installing mcp-cli with pip...");

  return new Promise<boolean>((resolve, reject) => {
    const pipProcess = spawn(pythonPath, PYTHON_INSTALL_ARGS, {
      stdio: "inherit",
    });

    pipProcess.on("close", (code: number) => {
      if (code === 0) {
        console.log("✅ mcp-cli installed successfully with pip!");
        savePriorityConfig("pip", `${pythonPath} -m mcp_cli`);
        resolve(true);
      } else {
        console.error("❌ Failed to install mcp-cli with pip.");
        console.error("   Please install manually:");
        console.error(
          "   pip install git+https://github.com/rohitsoni007/mcp-gearbox-cli"
        );
        reject(false);
      }
    });
    pipProcess.on("error", (error: any) => {
      console.error("❌ Error during installation:", error.message);
      reject(error);
    });
  });
}

// Only run installation if this script is executed directly
if (require.main === module) {
  installMcpCli().catch((error) => {
    console.error("Installation failed:", error.message);
    process.exit(1);
  });
}