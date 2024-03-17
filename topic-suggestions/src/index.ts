import { Ai } from '@cloudflare/ai';

export interface Env {
	VECTORIZE_INDEX: VectorizeIndex;
	AI: any;
}

interface EmbeddingResponse {
	shape: number[];
	data: number[][];
}
interface GetTopicPayload {
	text: string;
}
interface AddTopicPayload {
	name: string;
	prettyName: string;
	connections: Array<string>;
}
interface DelTopicPayload {
	ids: Array<string>;
}

export default {
	async fetch(request: Request, env: Env) {
		let path = new URL(request.url).pathname;
		if (path === '/topics') {
			if (request.method === 'POST') {
				let payload: GetTopicPayload = await request.json();
				const ai = new Ai(env.AI);
				const input = { text: [payload.text] };
				const output: EmbeddingResponse = await ai.run('@cf/baai/bge-large-en-v1.5', input);
				const matches = await env.VECTORIZE_INDEX.query(output.data[0], { topK: 3 });
				return Response.json({
					matches: matches,
				});
			}
			if (request.method === 'PUT') {
				let payload: AddTopicPayload = await request.json();
				const ai = new Ai(env.AI);
				const input = { text: [payload.prettyName] };
				const output: EmbeddingResponse = await ai.run('@cf/baai/bge-large-en-v1.5', input);
				const index_payload = {
					id: payload.name,
					values: output.data[0],
					metadata: { connections: payload.connections, prettyName: payload.prettyName },
				};
				let inserted = await env.VECTORIZE_INDEX.insert([index_payload]);
				return Response.json(inserted);
			}
			if (request.method === 'DELETE') {
				let payload: DelTopicPayload = await request.json();
				let idsToDelete = payload.ids;
				const deleted = await env.VECTORIZE_INDEX.deleteByIds(idsToDelete);
				return Response.json(deleted);
			}
		}
	},
};
