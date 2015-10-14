var incubator = document.createElement('div');

export default class Component {

  constructor(template) {
    if (typeof template === 'string') {
      incubator.innerHTML = template;
      template = incubator.children[0];
    }
    this.element = template;
    this.style = template.style;
  }

  appendTo(parent) {
    parent.appendChild(this.element);
  }

  query(selector) {
    return this.element.querySelector(selector);
  }

  queryAll(selector) {
    return this.element.querySelectorAll(selector);
  }

  attribute(key, value) {
    if (!value) {
      return this.element.getAttribute(key);
    }
    this.element.setAttribute(key, value);
  }

  transform(transformation) {
    this.style.transform = transformation;
  }
}
