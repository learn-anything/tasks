import { fromMarkdown } from "mdast-util-from-markdown"
import { toMarkdown } from "mdast-util-to-markdown"
import { toString } from "mdast-util-to-string"

// TODO: add stream: option
export async function suggestionsv3(task: string, openAiKey: string) {
  const res = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiKey}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Provide detailed steps to do this task: ${task}. Number each step.`,
      max_tokens: 400, // TODO: not sure if should remove or update, try
      temperature: 0,
    }),
  })
  const resJson = await res.json()
  // TODO: fix type
  // @ts-ignore
  const answer = resJson.choices[0].text.trim()
  const suggestedTasks = parseSuggestions(answer)
  return {
    suggestedTasks,
    rawResponse: answer,
  }
}

// TODO: add stream: option
export async function suggestionsv4(task: string, openAiKey: string) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Provide detailed steps to do this task: ${task}. Number each step.`,
        },
      ],
      max_tokens: 400, // TODO: not sure if should remove or update, try
      temperature: 0,
    }),
  })
  const resJson = await res.json()
  // TODO: fix type
  // @ts-ignore
  const answer = resJson.choices[0].message.content.trim()
  const suggestedTasks = parseSuggestions(answer)
  return {
    suggestedTasks,
    rawResponse: answer,
  }
}

export type SuggestedTasks = {
  intro?: string
  tasks: SuggestedTask[]
}
export type SuggestedTask = {
  task: string
  note?: string
}

// parse a string of markdown and return a list of suggested tasks
function parseSuggestions(markdownString: string) {
  const tree = fromMarkdown(markdownString)

  const tasks: SuggestedTasks = { tasks: [] }

  let atSteps = false
  let currentNote = ""
  let currentTask = null

  for (const node of tree.children) {
    if (node.type === "paragraph") {
      const text = toString(node)

      if (/^steps:$/i.test(text.trim())) {
        // Only assign the intro field if there's content before the tasks
        // @ts-ignore
        if (node.position.start.offset > 1) {
          tasks.intro = markdownString
            // @ts-ignore
            .slice(0, node.position.start.offset - 1)
            .trim()
        }
        atSteps = true
      } else if (atSteps) {
        // Accumulate notes
        currentNote += text + "\n"
      }
    }

    if (
      (atSteps || tasks.intro === undefined) &&
      node.type === "list" &&
      node.start
    ) {
      // If we haven't encountered "Steps:" yet, but we found a numbered list, we assume that's where tasks start
      if (!atSteps) {
        // Only assign the intro field if there's content before the tasks
        // @ts-ignore
        if (node.position.start.offset > 1) {
          tasks.intro = markdownString
            // @ts-ignore
            .slice(0, node.position.start.offset - 1)
            .trim()
        }
        atSteps = true
      }

      for (const item of node.children) {
        // If there's a current task, it means we've encountered a new task and should add the current one to the list
        if (currentTask) {
          tasks.tasks.push({
            task: currentTask,
            note: currentNote.trim() || undefined,
          })
          // Reset currentNote for the next task
          currentNote = ""
        }

        const head = item.children[0]
        const taskAndNote = toMarkdown(head).trim().split(/:(.+)/)

        if (taskAndNote.length > 1) {
          currentTask = taskAndNote[0].trim() + ":"
          currentNote = taskAndNote[1].trim()
        } else {
          currentTask = taskAndNote[0].trim()
        }
      }
    }
  }

  // Don't forget to add the last task
  if (currentTask) {
    tasks.tasks.push({
      task: currentTask,
      note: currentNote.trim() || undefined,
    })
  }

  return tasks
}

export async function explainTaskv3(task: string, openAiKey: string) {
  const res = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiKey}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Explain what it means and how to do ${task} in detail.`,
      max_tokens: 400, // TODO: not sure if should remove or update, try
      temperature: 0,
    }),
  })
  const resJson = await res.json()
  const rawResponse = resJson.choices[0].text.trim()
  return {
    rawResponse,
  }
}

export async function explainTaskv4(task: string, openAiKey: string) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Explain what it means and how to do ${task} in detail.`,
        },
      ],
      max_tokens: 200, // TODO: not sure if should remove or update, try
      temperature: 0,
    }),
  })
  const resJson = await res.json()
  const rawResponse = resJson.choices[0].text.trim()
  return {
    rawResponse,
  }
}

// TODO: maybe useful, hard to cache for so not using for now
// export async function explainSubtaskv3(
//   mainTask: string,
//   task: string,
//   openAiKey: string
// ) {
//   const res = await fetch("https://api.openai.com/v1/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${openAiKey}`,
//     },
//     body: JSON.stringify({
//       model: "text-davinci-003",
//       prompt: `I need to eventually do ${mainTask}. Explain what it means and how to do ${task} in detail.`,
//       max_tokens: 400, // TODO: not sure if should remove or update, try
//       temperature: 0,
//     }),
//   })
//   const resJson = await res.json()
//   const rawResponse = resJson.choices[0].text.trim()
//   return {
//     rawResponse,
//   }
// }
