import type { CollectionEntry } from "astro:content";
import type { DocumentContext, TagsContext } from "../types";

export const buildTags = (
  doc: DocumentContext,
  tags: CollectionEntry<"tags">[] = []
): TagsContext => {
  const docTags = doc.data.tags?.filter((dt) => !tags.some((t) => t.id === dt)) ?? [];

  return {
    tags: tags.concat(
      docTags?.map((t) => ({
        id: t,
        collection: "tags",
        data: {
          name: t,
        },
      }))
    ),
  };
};
