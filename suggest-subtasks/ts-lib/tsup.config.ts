import { defineConfig, Options } from "tsup"

export default defineConfig((config) => {
  const inputPath = "index.ts"

  return {
    clean: true,
    target: "esnext",
    format: "esm",
    entry: [inputPath],
    dts: inputPath,
  } satisfies Options
})
