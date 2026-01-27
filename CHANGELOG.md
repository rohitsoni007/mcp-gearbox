# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-01-27

### Added
- Agent selection dropdown in header when sidebar is hidden
- Sidebar navigation is now hidden by default

## [0.1.0] - 2025-01-27
- Added support for macOS 12 amd64 arch

## [0.0.6] - 2025-11-17
- remove top helper text
- Added support google antigravity
- cli version to 0.0.15

## [0.0.5] - 2025-11-17
- Added avatar url on server card
- cli version to 0.0.14

## [0.0.4] - 2025-11-14
- Added agent icon on selected agent on top
- Added pagination on server list
- cursor-pointer where clickable and reduce header space


## [0.0.3] - 2025-11-13

- Project Level Configuration Support
- Light theme and Dark theme Toggle
- Agent icons
- skeleton loading in agent & server
- Add Arch Linux AUR packaging (contributed by [@Logic-H](https://github.com/Logic-H))

## [0.0.2] - 2025-11-12
- Copilot CLI Support
- Disable non installed ai agent & ui
- server card status- starting stopping, in row 3 card ui
- Title bar added by window controls
- auto update cli version based on constant on start with uv or python dependency
- Fix duplicate name issue & functionality
- Fix sequential-thinking install failed issue
- overall ui improvements
- remove mcp start stop toast
- reduce caching time to 2 minutes for regular update (from 24 hours)
- improve ui performance
- Fix MCP CLI toast on startup


## [0.0.1] - 2025-11-09

### Added
- Initial release
- Desktop application for managing MCP servers
- Support for multiple AI agents (Claude Desktop, Cline, Zed, Windsurf, Roo Cline)
- Server browsing and search functionality
- One-click server installation and removal
- Grid and list view modes
- Server sorting by stars or name
- Redux state management with persistence
- GitHub Actions CI/CD pipeline
- Cross-platform builds (Windows, macOS, Linux)

[Unreleased]: https://github.com/rohitsoni007/mcp-gearbox/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/rohitsoni007/mcp-gearbox/releases/tag/v0.0.1
