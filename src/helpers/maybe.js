export default function maybe() {
  let value = arguments[0];
  let len = arguments.length;

  for (let i = 1; i < len; i++) {
    if (value == null) {
      return;
    }
    value = arguments[i](value);
  }
  return value;
}
