## AI Tasks in Rust

Using:

- [llm-chain](https://llm-chain.xyz/) to chain prompts + do calls to OpenAI & other LLMs
- [Axum router](https://github.com/tokio-rs/axum) to expose the routes
- [markdown](https://github.com/wooorm/markdown-rs) to parse output from LLMs and structure it into format needed

### Run

Assumes [rust](https://www.rust-lang.org/tools/install) is installed.

```
cd rust/http # or rust/lib depending on what you want to develop
cargo watch -q -- sh -c "tput reset && cargo run -q"
```

### Deploy

> TODO: add instructions

> TODO: use nix to create optimal Docker container from the code, write down command for it here

### Current Endpoints

Endpoints take in `OPENAI_API_KEY` as header value. You can self host the endpoint yourself and pass your key to the endpoint safely.

Below shows examples of calling deployed endpoint from JS.

#### Subtasks

```js
// process.env.AI_ENDPOINT = server hosting the routes
// task = task for which you want to create subtasks
// process.env.OPENAI_API_KEY = OpenAI API key
const suggestions = await fetch(
  `${process.env.AI_ENDPOINT}/subtasks?request=${task}`,
  {
    headers: {
      OPENAI_KEY: process.env.OPENAI_API_KEY!,
    },
  }
)
```

Returns:

```js
type SuggestedTasks = {
  tasks: {
    task: string
    note: string
  }
}
```

#### Explain

> TODO: finish and document
