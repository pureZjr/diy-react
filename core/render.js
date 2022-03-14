function render(ele, parentDom) {
  const { type, props } = ele;

  const isListener = (name) => name.startsWith('on');

  const isTextElement = type === 'TEXT ELEMENT';
  const dom = isTextElement
    ? document.createTextNode('')
    : document.createElement(type);

  // 过滤除了以on开头的对象，并绑定事件
  Object.keys(props)
    .filter(isListener)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2); // 取两位之后
      dom.addEventListener(eventType, props[name]);
    });

  // 过滤事件和children
  const isAttribute = (name) => !isListener(name) && name !== 'children';

  Object.keys(props)
    .filter(isAttribute)
    .forEach((name) => {
      dom[name] = props[name];
    });

  // 拿过滤的children属性执行render
  const childrenElements = props.children || [];
  childrenElements.forEach((childEle) => {
    render(childEle, dom);
  });

  parentDom.appendChild(dom);
}

export default render;
