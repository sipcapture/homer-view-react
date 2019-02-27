import invariant from "invariant";
import sortMethod from "./sortMethod";

const configureDropDown = (arr, options, sortingAttribute) => {
  invariant(
    options.text && options.value,
    "seems you forgot add requirted values to options object, text and value are required, key is optional "
  );

  if (!arr.length) {
    return arr;
  }

  const copiedArray = [...arr];
  let sortedName = "Name";

  const hasOrder = !!copiedArray.filter(item => item.Order && item.Order > 0)
    .length;

  if (sortingAttribute) {
    sortedName = sortingAttribute;
  } else if (hasOrder) {
    sortedName = "Order";
  }

  copiedArray.sort((a, b) => sortMethod(a[sortedName], b[sortedName]));

  return copiedArray.map(item => {
    const { key, value, text, ...rest } = options;
    const requiredOptions = {
      key: item[key || value],
      value: item[value],
      text: item[text]
    };
    const otherOptions = Object.keys(rest).reduce((accumulator, value) => {
      accumulator[value] = item[rest[value]];
      return accumulator;
    }, {});

    return {
      ...requiredOptions,
      ...otherOptions
    };
  });
};

export default configureDropDown;
