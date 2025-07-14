import type { GetStaticPaths } from "astro";
import { getCollection } from "astro:content";

import {
	AUTHORS_COLLECTION_NAME,
	DOCUMENTS_COLLECTION_NAME,
	TAGS_COLLECTION_NAME,
} from "../constants";
import type {
	AuthorContext,
	DocumentContext,
	NavigationContext,
	PageContext,
	TagsContext,
} from "../types";

import { buildAuthor } from "../helpers/buildAuthor";
import { buildPage } from "../helpers/buildPage";
import { buildTags } from "../helpers/buildTags";
import { buildTree } from "../helpers/buildTree";

import website from "../../website.config.json";

export type Props = {
	author?: AuthorContext;
	document: DocumentContext;
	navigation: NavigationContext;
	page: PageContext;
	tags: TagsContext;
  website: typeof website;
};

export const getStaticPaths = (async () => {
	const authors = await getCollection(AUTHORS_COLLECTION_NAME);
	const documents = await getCollection(DOCUMENTS_COLLECTION_NAME);
	const tags = await getCollection(TAGS_COLLECTION_NAME);

	const tree = buildTree(documents);

	return documents
		.filter((d) => d.data.publish !== false)
		.map((document) => ({
			params: { slug: document.id },
			props: {
				author: buildAuthor(
					document,
					authors.find((a) => a.id === document.data.author),
				),
				document,
				navigation: {
					tree,
					backlinks: documents.filter((d) =>
						d.data.links?.some((l) => l.href === document.data.permalink),
					),
				},
				page: buildPage(document),
				tags: buildTags(
					document,
					tags.filter((t) => document.data.tags?.some((dt) => dt === t.id)),
				),
        website,
			} satisfies Props,
		}));
}) satisfies GetStaticPaths;


export const getStaticPathsForThemePage = async (theme: string) => {
	const allStaticPaths = await getStaticPaths();

	const staticPath = allStaticPaths.find(
		p => p.params.slug === `themes/${theme}/${theme}`
	) ?? allStaticPaths.find(
		p => p.params.slug === 'examples/cheatsheets/markdown-cheatsheet'
	);

	return staticPath;
}
