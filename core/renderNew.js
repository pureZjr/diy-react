/**
 * 原本的render纯粹是渲染节点
 * 现在除了渲染操作之外还会保存dom、element、childInstance数据
 * instance: 实例，由dom、element和childInstances组成
 * dom: 真实dom
 * element: 虚拟dom
 * childInstances
 *
 * 每次更新都用新的element和旧的instance去处理
 */

let rootInstance = null;

/**
 * 渲染方法
 * @param element 虚拟dom
 * @param container 挂载的节点
 */
function render(element, container) {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
  console.log({ rootInstance });
}
/**
 * 调和
 * @param parentDom 父节点
 * @param instance 上一个的实例
 * @param element 下一个虚拟dom
 * @returns newInstance
 */
export function reconcile(parentDom, instance, element) {
  if (instance === null || instance === undefined) {
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  } else if (element === null || element === undefined) {
    parentDom.removeChild(instance.dom);
    return null;
  } else if (element.type !== instance.element.type) {
    // 节点类型不同，更新节点
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  } else if (typeof element.type === 'string') {
    // 如果元素标签没变的话，就更新元素的属性和绑定事件
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  } else {
    // 更新组件
    // 更新props
    instance.publicInstance.props = element.props;
    // 调用render获取最新的element
    const childElement = instance.publicInstance.render();
    const oldChildInstance = instance.childInstance;
    const childInstance = reconcile(parentDom, oldChildInstance, childElement);
    instance.dom = childInstance.dom;
    instance.childInstance = childInstance;
    instance.element = element;
    return instance;
  }
}

/**
 * 更新节点的属性和事件，移除所有旧props，加上所有新props
 * @param dom 真实dom
 * @param prevProps 旧props
 * @param nextProps 新props
 */
function updateDomProperties(dom, prevProps, nextProps) {
  const isEvent = (name) => name.startsWith('on');
  const isAttribute = (name) => !isEvent(name) && name !== 'children';

  // 移除以前绑定的事件
  Object.keys(prevProps)
    .filter(isEvent)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // 移除属性
  Object.keys(isAttribute).forEach((name) => {
    dom[name] = null;
  });

  // 添加新的属性
  Object.keys(nextProps)
    .filter(isAttribute)
    .forEach((name) => {
      dom[name] = nextProps[name];
    });

  // 绑定新的事件
  Object.keys(nextProps)
    .filter(isEvent)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

/**
 * 创建实例
 * @param element 虚拟dom
 * @returns instance 实例
 */
function instantiate(element) {
  const { type, props } = element;
  const isDomElement = typeof element.type === 'string';

  if (isDomElement) {
    // 文本
    const isTextElement = type === 'TEXT ELEMENT';
    const dom = isTextElement
      ? document.createTextNode('')
      : document.createElement(type);

    // 插入节点属性或绑定事件
    updateDomProperties(dom, [], props);

    const childElements = props.children || [];

    // 新逻辑
    // 递归查找子实例
    const childInstances = childElements.map(instantiate);

    // 新逻辑
    // 从子实例中找节点，渲染到dom中
    // 这里就相当于旧render方法里面的
    /**
     *  childrenElements.forEach((childEle) => {
     *      render(childEle, dom);
     *  });
     */
    const childDoms = childInstances.map((childInstance) => childInstance.dom);
    childDoms.forEach((childDom) => dom.appendChild(childDom));

    const instance = { dom, element, childInstances };

    return instance;
  } else {
    // 组件
    const instance = {};
    // 组件的实例
    const publicInstance = createPublicInstance(element, instance);
    // 调用组件的render方法，返回 element
    const childElement = publicInstance.render();
    // 生成instance
    const childInstance = instantiate(childElement);
    const dom = childInstance.dom;

    Object.assign(instance, { dom, element, childInstance, publicInstance });
    return instance;
  }
}

/**
 * 调和
 * @param element 虚拟dom
 * @returns instance 实例
 */
function reconcileChildren(instance, element) {
  // 旧真实节点
  const dom = instance.dom;
  // 旧子实例
  const childInstances = instance.childInstances;
  // 新虚拟子节点
  const nextChildElements = element.props.children || [];
  // 新虚拟子实例
  const newChildInstances = [];

  const count = Math.max(childInstances.length, nextChildElements.length);

  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const nextChildElement = nextChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, nextChildElement);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances.filter((instance) => instance !== null);
}

/**
 * 创建组件，就是我们平时写的公共组件
 * @param element 虚拟dom
 * @param internalInstance 组件的实例
 */

function createPublicInstance(element, internalInstance) {
  const { type, props } = element;
  const publicInstance = new type(props);
  // 这里在实例里保存internalInstance（这个跟更新时候用，存的是旧的instance数据）
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
}

export default render;
