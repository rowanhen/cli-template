import { Command } from "commander";
import { intro, outro, text, spinner, isCancel, cancel } from "@clack/prompts";
import pc from "picocolors";

export const helloCommand = new Command("hello")
  .description("An example interactive command")
  .option("-n, --name <name>", "your name")
  .action(async (options) => {
    intro(pc.bgCyan(pc.black(" my-cli ")));

    let name = options.name as string | undefined;

    if (!name) {
      const response = await text({
        message: "What is your name?",
        placeholder: "stranger",
        validate(value) {
          if (value.trim().length === 0) return "Name cannot be empty.";
        },
      });

      if (isCancel(response)) {
        cancel("Cancelled.");
        process.exit(0);
      }

      name = response;
    }

    const s = spinner();
    s.start("Doing something...");
    await new Promise((r) => setTimeout(r, 800));
    s.stop("Done!");

    outro(`Hello, ${pc.cyan(name)}! 👋`);
  });
