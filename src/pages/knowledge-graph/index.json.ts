import type { APIRoute } from "astro";

import { getKnowledgeGraph } from "../../helpers/getKnowledgeGraph";

export const GET: APIRoute = async () => {
  const data = await getKnowledgeGraph();

  return new Response(
    JSON.stringify(data),
  );
}
