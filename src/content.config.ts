import { ObsidianDocumentSchema, ObsidianMdLoader } from "astro-loader-obsidian";
import { glob } from "astro/loaders";
import { defineCollection, z } from 'astro:content';

import config from '../website.config.mjs';
import { AUTHORS_COLLECTION_NAME, DOCUMENTS_COLLECTION_NAME, TAGS_COLLECTION_NAME } from './constants';


export const collections = {
	[DOCUMENTS_COLLECTION_NAME]: defineCollection({
		loader: ObsidianMdLoader({
			author: config.author,
			base: 'src/content/vault',
			url: '',
		}),
		schema: ({ image }) => ObsidianDocumentSchema.extend({
      image: image().optional(),
      // or
			subtitle: z.string().optional(),
      cover: image().optional(),
			'cover-x': z.number().optional(),
			'cover-y': z.number().optional(),
			order: z.number().optional(),
    }),
	}),
	[AUTHORS_COLLECTION_NAME]: defineCollection({
		loader: glob({ pattern: "**/*.yml", base: "./src/content/authors" }),
		schema:  ({ image }) => z.object({
			name: z.string(),
			avatar: image().optional(),
			title: z.string().optional(),
			description: z.string().optional(),
		})
	}),
	[TAGS_COLLECTION_NAME]: defineCollection({
		loader: glob({ pattern: "**/*.yml", base: "./src/content/tags" }),
		schema:  () => z.object({
			name: z.string(),
			description: z.string().optional(),
		})
	})
};
