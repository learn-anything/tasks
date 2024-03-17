# Topic suggestions

> Given a topic, show similar topics

> TODO: readme needs big update

This component uses:

- Cloudflare workers/workers AI
- Cloudflare vectorize

To given a text of input provide a suggestion of a topic (3 topics).

It's powered by [BAAI/bge-large-en-v1.5](https://huggingface.co/BAAI/bge-large-en-v1.5) to generate embeddings for topics and input.

## Setup

### Data needed

- `account_id` from cloudflare
- `index_name` to decide a name for [vectorize](https://developers.cloudflare.com/vectorize/) index

### Environment

`npm install`

### Index topics

- Execute the `generate_topic_embeddings.ipynb` <a href="https://colab.research.google.com/github/learn-anything/ml/blob/master/generate_topics_embeddings.ipynb" target="_parent\"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

- Create a vectorize index: `wrangler vectorize create index_name --dimensions=1024 --metric=cosine`

- Index the topics embeddings: `wrangler vectorize insert index_name --file embeddings.ndjson`

Add the following to `wrangler.toml`

```
[[vectorize]]
binding = "VECTORIZE_INDEX" # available within your Worker on env.VECTORIZE_INDEX
index_name = "index_name"

[ai]
binding = "AI" #available in your worker via env.AI
```

### Deploy

`wrangler deploy`

## Features

**Get embeddings for text**

```
curl --request POST \
  --url https://url-topics-suggestions.will-all-gs.workers.dev/get_topic \
  --header 'Content-Type: application/json' \
  --data '{
  "text": "music"
}'
```

**Add embeddings for a given topic**

```
curl --request PUT \
  --url https://url-topics-suggestions.will-all-gs.workers.dev/get_topic \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "religionS",
  "prettyName": "Religions",
  "connections": []
}'
```

**Delete a given topic**

```
curl --request DELETE \
  --url https://url-topics-suggestions.will-all-gs.workers.dev/get_topic \
  --header 'Content-Type: application/json' \
  --data '{
  "ids": ["idA", "idB"]
}'
```

## Limitations

- Did not know how to make the vectorize tests locally, related to a [known issue](https://developers.cloudflare.com/workers/platform/known-issues/#wrangler-dev)
- workers AI is only available to paid workers plans
