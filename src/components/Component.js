var incubator = document.createElement('div');

export default class Component {

  constructor(template) {
    incubator.innerHTML = template;
    this.element = incubator.children[0];
    this.style = this.element.style;
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

  transform(transformation) {
    this.style.transform = this.style.webkitTransform = transformation;
  }
}
