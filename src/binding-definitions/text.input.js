export default WinJS.Class.define(function(element, selector, initialValue, onChangeCb) {
  this.element = element.querySelector(selector);
  this.element.value = initialValue;
  this._onChange();
  element.addEventListener('change', this._onChange.bind(this));
  if (onChangeCb) { this.onValueChange = onChangeCb; }
}, {
    onValueChange(newValue) {
      this.element.value = newValue;
    },
    _onChange() {
      this.onValueChange(value);
    }
  });