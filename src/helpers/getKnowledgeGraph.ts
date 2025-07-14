
import { getCollection } from "astro:content";
import type { KnowledgeGraphNode, KnowledgeGraphLink } from "../types";

export const getKnowledgeGraph = async (slug?: string) => {
  const allDocuments = await getCollection('documents');
  const nodes = new Map<string, KnowledgeGraphNode>();
  const links: KnowledgeGraphLink[] = [];

  const addToNodes = (id: string, title?: string, href?: string, group?: string) => {
    if (!nodes.has(id)) {
      nodes.set(id, {
        id,
        href,
        title,
        radius: 5,
        group,
      })
    } else {
      const node = nodes.get(id) as KnowledgeGraphNode;

      node.radius = node.radius + .3;
      node.title = node.title ?? title;
      node.group = node.group ?? group;
      node.href = node.href ?? href;
    }
  };

  const addToLinks = (source: string, target: string, value: number) => {
    links.push({
      source,
      target,
      value,
    })
  };

  for (const doc of allDocuments) {
    const matchesSlug = !slug || doc.id === slug || doc.data.links?.some(l => l.id === slug);

    if (!matchesSlug) {
      continue;
    }


    addToNodes(doc.id, doc.data.title, doc.data.permalink);

    for (const link of doc.data.links ?? []) {
      const isSlugLink = !slug || doc.id === slug || link.id === slug;

      if (link.id && link.href && isSlugLink) {
        addToLinks(doc.id, link.id, 1);
        addToNodes(link.id, link.title, link.href);
      }
    }
  }

  return {
    nodes: Array.from(nodes.values()),
    links: Array.from(links.values()),
  };
}
