import { helper } from "@ember/component/helper";

function isEqual(args) {
  const [value1, value2] = args;
  return value1 === value2;
}

export default helper(isEqual);
