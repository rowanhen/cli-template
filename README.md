# my-cli

> A lean CLI template using Bun, TypeScript, and Effect. Clone, rename, and ship.

## Stack

- **Runtime**: [Bun](https://bun.sh)
- **Language**: TypeScript
- **CLI framework**: [@effect/cli](https://github.com/Effect-TS/effect/tree/main/packages/cli)
- **Platform**: [@effect/platform-bun](https://github.com/Effect-TS/effect/tree/main/packages/platform-bun)
- **Core**: [Effect](https://effect.website)
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
2. Define options with `Options` and prompts with `Prompt` from `@effect/cli`
3. Export a `Command` using `Command.make("name", { options }, handler)`
4. Register it in `src/cli.ts` with `Command.withSubcommands([...])`

See `src/commands/hello.ts` for a working example.

## Renaming the CLI

Search and replace `my-cli` across:
- `package.json` — `name` and `bin` key
- `src/cli.ts` — `Command.make("my-cli")` and the `name` in `Command.run`
- This README

## Publishing

Push to `main`. The release workflow will:

1. Detect the version bump type from Conventional Commits
2. Bump `package.json` version
3. Build and test
4. Publish to npm
5. Commit the version bump, tag it, and create a GitHub Release

**npm publish uses `--provenance`**, which requires [OIDC-based npm publishing](https://docs.npmjs.com/generating-provenance-statements) rather than a static `NPM_TOKEN`. To enable this:

1. Log in to npmjs.com and go to your package's **Settings → Publishing**
2. Enable **"Allow publishing from GitHub Actions using OIDC"** and link the repo
3. Make sure the workflow has `id-token: write` permission (already set)

Until OIDC is configured the publish step will fail, but everything up to that point (version bump, build, test) will run fine.

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

Drop these in as needed to improve formatting and polish.

| Package | What it does |
|---|---|
| [`ora`](https://github.com/sindresorhus/ora) | Flexible terminal spinner — good for long async tasks where you want fine-grained control |
| [`listr2`](https://github.com/listr2/listr2) | Renders a live task list with status indicators — great for multi-step operations |
| [`boxen`](https://github.com/sindresorhus/boxen) | Draws a styled box around output — good for summaries or end-of-run results |
| [`chalk`](https://github.com/chalk/chalk) | Terminal string styling with tagged template literals and 256-color support |
| [`cli-table3`](https://github.com/cli-table/cli-table3) | Pretty tables with borders, alignment, and color support |
| [`update-notifier`](https://github.com/yeoman/update-notifier) | Checks npm for a newer version and nudges the user to upgrade |
