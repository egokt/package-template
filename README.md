# Template Package

A TypeScript package template with modern development tooling and best practices.

## Quick Start

1. **Setup**: Update `package.json` with your package name and description
2. **Install**: `npm install`
3. **Develop**: Write code in `src/`, tests in `tests/`
4. **Build**: `npm run build` or `npm run build:watch`
5. **Publish**: `npm run publish`

## Build System

Uses dual TypeScript configs for flexible compilation:

- `tsconfig.json` - Development (includes src + tests)
- `tsconfig.build.json` - Package/production build (src only)

### Build Commands

```bash
# Full build (compile + copy files)
# This is the normal build command to use. It is also used for packaging prep.
npm run build

# Production build (no sourcemaps) for minimal builds,
# such as direct file dependencies within containers.
npm run build:prod

npm run build:watch    # Build + watch for changes
npm run clean          # Remove build directory
```

## Code Quality & Formatting

Integrated ESLint + Prettier setup with TypeScript support:

```bash
npm run format         # Format code and fix linting issues
npm run lint           # Check code quality (zero warnings)
npm run test           # Run Jest tests
npm run ci:check       # Full CI pipeline (lint + format + test)
```

### Key Features

- **TypeScript**: Strict typing, modern ES2023 features
- **ESLint**: Zero-warning policy with auto-import organization
- **Prettier**: Consistent formatting (single quotes, 120 chars, 2 spaces)
- **Jest**: ES modules support with TypeScript integration

## CI/CD Pipeline

Automated GitHub Actions workflow for continuous integration:

### Test Workflow

The package includes a GitHub Actions workflow (`.github/workflows/template_test.yml`) that:

- **Triggers**: On pushes to `main` branch and pull requests affecting the package
- **Node.js**: Tests against Node.js 22.14.0 in Ubuntu environment
- **Steps**:
  - Installs dependencies with `npm ci`
  - Builds the package with `npm run build`
  - Runs the full CI check pipeline with `npm run ci:check` (linting, formatting, and testing)

### Workflow Features

- **Sparse checkout**: Only checks out the package directory for faster builds
- **Dependency caching**: Uses npm cache for faster installations
- **GitHub Packages support**: Ready for private dependencies (commented configuration)
- **Path-based triggers**: Only runs when package files change

### Usage in New Projects

When copying this template:

1. **Copy workflow file**: Copy `.github/workflows/template_test.yml` to `.github/workflows/` in your repo root
   - ⚠️ **Important**: The file must be copied, not symlinked - GitHub Actions does not support symlinks in the workflows directory
2. Update the workflow name in `template_test.yml`
3. Set `PACKAGE_TAG_PREFIX` and `PACKAGE_PATH` environment variables
4. Uncomment GitHub Packages configuration if needed

## VSCode Integration

**Important**: Add this package folder to your VSCode workspace for auto-formatting.

```
File → Add Folder to Workspace → Select this directory
```

Provides:

- Format on save with Prettier
- Auto-fix ESLint issues on save
- Import organization for TS/JS files

## Project Structure

```
src/           # Source code
tests/         # Test files
build/         # Compiled output
.vscode/       # Editor settings
```

### Configuration Files

- `eslint.config.js` - Modern flat config with TypeScript rules
- `.prettierrc` - Code formatting rules
- `tsconfig.json` / `tsconfig.build.json` - TypeScript compilation
- `jest.config.js` - Test configuration

## Publishing

### Manual Publishing

The `publish` script builds to `build/` directory and publishes from there:

```bash
npm run publish  # Build + publish to npm registry
```

Files copied to build: `package.json`, `README.md`, `LICENSE.md`

### Automated Publishing via GitHub Actions

The package includes an automated publishing workflow (`.github/workflows/template_publish.yml`) that publishes to npm when version tags are pushed.

#### How It Works

- **Triggers**: When a tag with the format `<configured package tag>/v<version>` is pushed to the repository
- **Version Validation**: Checks that the tag version matches the version in `package.json`
- **Duplicate Check**: Fails if the version already exists in the npm registry
- **CI Pipeline**: Runs the full test suite before publishing

#### Publishing a New Version

1. **Update version**: Update the version in `package.json`
2. **Create and push tag**:
   ```bash
   git tag -a -m "Release version 1.2.3" template/v1.2.3
   git push --tags
   ```
3. **Automatic publish**: The workflow will automatically build, test, and publish

#### Tag Management

For development workflows, you can delete and recreate tags:

```bash
# Delete local tag
git tag -d template/v1.2.3

# Delete remote tag
git push --delete origin template/v1.2.3

# Recreate and push tag
git tag -a -m "Release version 1.2.3" template/v1.2.3
git push --tags
```

⚠️ **Warning**: Deleting and recreating tags may cause unexpected behavior in other developers' local environments and deployed systems.

#### Workflow Configuration

When copying this template:

1. **Copy workflow file**: Copy `.github/workflows/template_publish.yml` to `.github/workflows/` in your repo root
2. Update the workflow name and `PACKAGE_TAG_PREFIX` environment variable
3. Update the `on.push.tags` pattern to match your package prefix
4. Uncomment GitHub Packages configuration if publishing privately
