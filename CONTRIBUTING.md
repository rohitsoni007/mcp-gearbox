# Contributing to MCP Gearbox

Thank you for your interest in contributing to MCP Gearbox! We appreciate your help in making this project better.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Be kind, professional, and constructive in all interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

**When submitting a bug report, include:**

- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots or error messages
- Your environment (OS, Node version, app version)
- Any relevant logs

**Example:**

```markdown
**Bug**: Server installation fails on Windows 11

**Steps to Reproduce:**
1. Open MCP Gearbox
2. Click "Install" on any server
3. Error appears

**Expected**: Server installs successfully
**Actual**: Error message "Command failed"

**Environment:**
- OS: Windows 11
- App Version: 0.0.1
- Node: 18.17.0
```

### Suggesting Features

We love new ideas! Before suggesting a feature:

1. Check if it's already been suggested
2. Ensure it aligns with the project's goals
3. Provide clear use cases and benefits

**Feature request template:**

```markdown
**Feature**: Add server configuration editor

**Problem**: Users need to manually edit JSON files to customize server settings

**Solution**: Add an in-app editor with validation

**Benefits**: 
- Easier configuration
- Prevents syntax errors
- Better user experience
```

### Pull Requests

We actively welcome pull requests!

**Before submitting:**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests
5. Ensure all tests pass
6. Update documentation if needed
7. Commit with clear messages
8. Push to your fork
9. Open a pull request

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Getting Started

```bash
# Clone your fork
git clone https://github.com/your-username/mcp-gearbox.git
cd mcp-gearbox

# Add upstream remote
git remote add upstream https://github.com/rohitsoni007/mcp-gearbox.git

# Install dependencies
npm install

# Start development server
npm start
```

### Project Structure

```
src/
├── components/        # React components
│   ├── ui/           # shadcn/ui components
│   └── home/         # Feature-specific components
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── services/         # API and service layer
├── store/            # Redux store
│   ├── slices/      # Redux slices
│   └── selectors/   # Redux selectors
├── types/            # TypeScript types
├── utils/            # Utility functions
├── main.ts           # Electron main process
├── preload.ts        # Electron preload script
└── renderer.tsx      # React entry point
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` types when possible
- Use strict mode

```typescript
// Good
interface ServerConfig {
  name: string;
  enabled: boolean;
}

// Avoid
const config: any = { ... };
```

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Follow React best practices

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
```

### Styling

- Use Tailwind CSS classes
- Follow the existing design system
- Use shadcn/ui components when available
- Keep styles consistent

### State Management

- Use Redux Toolkit for global state
- Use React hooks for local state
- Keep state minimal and normalized
- Use selectors for derived data

### File Naming

- Components: `PascalCase.tsx` (e.g., `ServerCard.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useMcpService.ts`)
- Utils: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `camelCase.ts` (e.g., `mcp.ts`)

## Testing

### Unit Tests

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

Write tests for:
- Utility functions
- Custom hooks
- Redux slices and selectors
- Complex components

```typescript
// Example test
import { describe, it, expect } from 'vitest';
import { formatServerName } from './utils';

describe('formatServerName', () => {
  it('should format server name correctly', () => {
    expect(formatServerName('my-server')).toBe('My Server');
  });
});
```

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# UI mode
npm run test:e2e:ui
```

## Commit Messages

Use clear, descriptive commit messages:

```bash
# Good
git commit -m "feat: add server search functionality"
git commit -m "fix: resolve installation error on Windows"
git commit -m "docs: update installation instructions"

# Format
<type>: <description>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance
```

## Pull Request Process

1. **Update your branch** with the latest upstream changes
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks**
   ```bash
   npm run lint
   npm run type-check
   npm test
   npm run test:e2e
   ```

3. **Create a clear PR description**
   - What changes were made
   - Why they were made
   - How to test them
   - Screenshots (if UI changes)

4. **Link related issues**
   - Use "Fixes #123" or "Closes #123"

5. **Respond to feedback**
   - Address review comments
   - Make requested changes
   - Keep discussion professional

## Code Review

All submissions require review. We look for:

- Code quality and clarity
- Test coverage
- Documentation updates
- Performance considerations
- Security implications
- Accessibility compliance

## Release Process

Maintainers handle releases:

1. Version bump in `package.json`
2. Update CHANGELOG.md
3. Create release tag
4. Build distributables
5. Publish to GitHub releases

## Getting Help

- **Questions**: Open a discussion on GitHub
- **Bugs**: Create an issue with details
- **Chat**: Join our community (if available)

## Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to MCP Gearbox! 🎉
