

import { spoiler } from "./spoiler.mjs";
import { timeline } from "./timeline.mjs";


const transform = (node) => {
  if (node.lang === "timeline-labeled") {
    return timeline(node)
  }

  if (node.lang === "spoiler-markdown") {
    return spoiler(node)
  }

  return null;
};

export default {
  transform,
}