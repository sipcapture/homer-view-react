import invariant from "invariant";
import camelCase from "lodash/camelCase";

function isStringsEquial(str1, str2) {
  invariant(
    arguments.length,
    `seems you didn't add enough arguments, current arguments.length is - ${
      arguments.length
    }`
  );
  if (arguments.length === 1) {
    return camelCase(str1.toString().toLowerCase());
  }

  return (
    camelCase(str1.toString().toLowerCase()) ===
    camelCase(str2.toString().toLowerCase())
  );
}

export default isStringsEquial;
