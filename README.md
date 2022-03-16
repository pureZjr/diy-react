### 手写 React

#### 按照 [didact-explain](https://github.com/chinanf-boy/didact-explain) 自己写一遍

### DAY1

- 目录结构、配置 webpack、babel，相关文件（"build/\*"、"babel.config.json"）
- diy-react 代码："core/\*", 完成 createElement、render 方法
- 开发代码 在 src 目录里面写

### 运行

`yarn start`

> 今天完成成功输入 hello word

### DAY2

#### 在 DAY1 中，我们只完成了根据 jsx 完成对节点的渲染。今天完成了对节点的增、删、改操作。

#### 我们新增加三个对象 _instance_、_element_、_dom_、_childInstances_。

> instance: 包含 dom 和 element 的对象。
> element: 真实 dom 的表现，虚拟 dom。
> dom: 真实 dom。

#### 对 _render_ 方法进行了分解。

> render: 执行*reconcile*
> reconcile: 通过接收 _parentDom_、_instance_、_element_，返回新的*instance*,处理了新增、删除、修改属性、和全量替换节点的情况。
> updateDomProperties: 更新属性和绑定事件。
> instantiate: 通过接收*element*参数，生成*instance*
> reconcileChildren: 循环处理*cileChildren*

### DAY3

#### 本次我们完成了自定义组件和更新组件的功能。
