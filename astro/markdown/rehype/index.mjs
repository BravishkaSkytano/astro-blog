
const rewrite = (node, index, parent) => {
  if (
    node.type === "element" &&
    node.tagName === "pre" &&
    node.properties.dataLanguage === "plaintext"
  ) {
    node.type = "text";
    node.value = "";
    node.children = [];
  }

  return node;
};

export default {
  rewrite,
}