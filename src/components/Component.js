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

  transform(transformation) {
    this.style.transform = this.style.webkitTransform = transformation;
  }
}
