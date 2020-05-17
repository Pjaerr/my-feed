import { helper } from "@ember/component/helper";

function isequal(args) {
  let [value1, value2] = args;
  return value1 === value2;
}

export default helper(isequal);
