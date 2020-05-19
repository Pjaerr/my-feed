import { helper } from "@ember/component/helper";

function getHostName(args) {
  const [url] = args;

  let URLObject;

  try {
    URLObject = new URL(url);

    return URLObject.hostname;
  } catch (e) {
    console.error(e);

    return url;
  }
}

export default helper(getHostName);
