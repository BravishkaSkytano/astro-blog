

import remarkEmbedder from '@remark-embedder/core';
import remarkEmbedderOembed from '@remark-embedder/transformer-oembed';
import rehypeRewrite from "rehype-rewrite";
import remarkCodeExtra from "remark-code-extra";
import remarkObsidianCallout from 'remark-obsidian-callout';

import rehypeRewriteConfig from "./rehype/index.mjs";
import remarkCodeExtraConfig from "./remark/code/index.mjs";

export default {
  remarkPlugins: [
    remarkObsidianCallout, 
    [remarkEmbedder.default, {
      transformers: [
        [remarkEmbedderOembed.default]
      ],
    }],
    [
      remarkCodeExtra,
      remarkCodeExtraConfig,
    ],
  ],
  rehypePlugins: [
    [
      rehypeRewrite,
      rehypeRewriteConfig,
    ],
  ],
  shikiConfig: {
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
}