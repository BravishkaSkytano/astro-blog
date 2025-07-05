
import { fromMarkdown, mdast2Tree } from './utils.mjs';

export const spoiler = (node) => {
  const newNode = mdast2Tree(fromMarkdown(node.value, undefined));

  return {
    before: [
      {
        type: 'element',
        tagName: 'input',
        properties: {
          type: 'checkbox',
          id: 'spoilerToggle',
          className: 'absolute sr-only peer'
        }
      },
      {
        type: 'element',
        tagName: 'label',
        properties: {
          for: 'spoilerToggle',
          className: "spoiler"
        },
        children: [
          {
            type: 'element',
            tagName: 'p',
            children: [
              {
                type: 'text',
                value: 'Display Spoiler'
              }
            ]
          }
        ]
      },
      {
        type: 'element',
        tagName: 'label',
        properties: {
          for: 'spoilerToggle',
          className: "spoiled"
        },
        children: newNode.children,
      },
    ]
  }
}