# my-cli

> A lean CLI template using Bun, TypeScript, and Commander. Clone, rename, and ship.

## Stack

- **Runtime**: [Bun](https://bun.sh)
- **Language**: TypeScript
- **CLI framework**: [Commander](https://github.com/tj/commander.js)
- **Prompts**: [@clack/prompts](https://github.com/natemoo-re/clack)
- **Colors**: [picocolors](https://github.com/alexeyraspopov/picocolors)
- **Versioning**: Conventional Commits + automated GitHub Actions release

## Getting Started

```bash
# 1. Clone and install
bun install

# 2. Run in dev mode (no build step)
bun run dev hello

# 3. Build
bun run build

# 4. Link locally for testing
npm link
my-cli hello
```

## Adding a Command

1. Create `src/commands/my-command.ts`
2. Export a `Command` from Commander
3. Register it in `src/cli.ts` with `program.addCommand(...)`

## Renaming the CLI

Search and replace `my-cli` across:
- `package.json` — `name` and `bin` key
- `src/cli.ts` — `.name("my-cli")`
- This README

## Publishing

Push to `main`. The release workflow will:

1. Detect the version bump type from Conventional Commits
2. Bump `package.json` version
3. Build and test
4. Publish to npm (requires `NPM_TOKEN` secret)
5. Commit the version bump, tag it, and create a GitHub Release

**Required secret**: Add `NPM_TOKEN` to your repo's Settings → Secrets.

## Commit Format

Uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add export command
fix(hello): handle empty input
feat!: breaking API change
```

The git hook at `.githooks/commit-msg` enforces this locally after `bun install` (which runs `prepare`).

## Version Bump Rules

| Commit type | Version bump |
|---|---|
| Any type with `!` | major |
| `feat` | minor |
| Everything else | patch |

## Suggested Packages

Drop these in as needed to improve interactivity, formatting, and polish.

| Package | What it does |
|---|---|
| [`ora`](https://github.com/sindresorhus/ora) | Flexible terminal spinner — good for long async tasks where you want fine-grained control |
| [`listr2`](https://github.com/listr2/listr2) | Renders a live task list with status indicators — great for multi-step operations |
| [`boxen`](https://github.com/sindresorhus/boxen) | Draws a styled box around output — good for summaries or end-of-run results |
| [`chalk`](https://github.com/chalk/chalk) | If you outgrow picocolors — supports tagged template literals and 256-color |
| [`gradient-string`](https://github.com/bokub/gradient-string) | Applies color gradients to strings — nice for banners and headers |
| [`figlet`](https://github.com/patorjk/figlet.js) | Generates ASCII art from text — for a splash header on startup |
| [`cli-table3`](https://github.com/cli-table/cli-table3) | Pretty tables with borders, alignment, and color support |
| [`update-notifier`](https://github.com/yeoman/update-notifier) | Checks npm for a newer version and nudges the user to upgrade |
