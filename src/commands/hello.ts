import { Command, Options, Prompt } from "@effect/cli";
import { Console, Effect } from "effect";

const askForName = Prompt.text({
  message: "What is your name?",
  validate: (value) => {
    const trimmed = value.trim();
    return trimmed.length === 0 ? Effect.fail("Name cannot be empty.") : Effect.succeed(trimmed);
  },
});

const name = Options.text("name").pipe(
  Options.withAlias("n"),
  Options.withFallbackPrompt(askForName),
);

export const helloCommand = Command.make("hello", { name }, ({ name }) =>
  Effect.gen(function* () {
    yield* Console.log("Doing something...");
    yield* Effect.sleep("800 millis");
    yield* Console.log("Done!");
    yield* Console.log(`Hello, ${name}! 👋`);
  }),
).pipe(Command.withDescription("An example interactive command"));
