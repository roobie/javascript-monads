
export function setPrototypeOf(object, prototype) {
  function C() {
    Object.assign(this, object);
  }
  C.prototype = prototype;
  return new C();
}
