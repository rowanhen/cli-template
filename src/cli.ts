#!/usr/bin/env node

import { Command } from "@effect/cli";
import { BunContext, BunRuntime } from "@effect/platform-bun";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Effect } from "effect";
import { helloCommand } from "./commands/hello.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, "..", "package.json"), "utf-8"));

const command = Command.make("my-cli").pipe(
  Command.withDescription("A CLI tool"),
  Command.withSubcommands([helloCommand]),
);

Command.run(command, {
  name: "my-cli",
  version: pkg.version,
})(process.argv).pipe(Effect.provide(BunContext.layer), BunRuntime.runMain);
