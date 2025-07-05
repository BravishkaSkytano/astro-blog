
import { fromMarkdown } from "mdast-util-from-markdown";

export { fromMarkdown };

export const mdast2Tree = (mdast, properties) => {
  if (mdast.type === "text") {
    return mdast;
  }

  mdast.tagName = mdast.type;
  mdast.type = "element";
  mdast.properties = properties;

  if (mdast.tagName === "root") {
    mdast.tagName = "div";
  }

  if (mdast.tagName === "link") {
    mdast.tagName = "a";
    mdast.properties = {
      href: mdast.url,
      title: mdast.title,
    };
  }

  if (mdast.tagName === "list") {
    mdast.tagName = "ul";
  }

  if (mdast.tagName === "listItem") {
    mdast.tagName = "li";
  }

  if (mdast.tagName === "paragraph") {
    mdast.tagName = "p";
  }

  if (mdast.children) {
    mdast.children.map((c) => mdast2Tree(c));
  }

  return mdast;
};