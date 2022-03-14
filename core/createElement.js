const TEXT_ELEMENT = 'TEXT ELEMENT'; // 类型

// 创建element
const createElement = (type, config, ...args) => {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  // 排除null 和 false的数据，剩下的是就对象执行createElement，是文本就执行createTextElement
  props.children = rawChildren
    .filter((c) => c !== null && c !== false)
    .map((c) => (c instanceof Object ? c : createTextElement(c)));

  return { type, props };
};

// 创建文本
function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}

export default createElement;
