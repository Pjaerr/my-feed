import Service from "@ember/service";

export default class DataStorageService extends Service {
  getCollections() {
    //Return data from localstorage if it exists
    const collections = window.localStorage.getItem("collections");

    if (collections) {
      return JSON.parse(collections);
    } else {
      return null;
    }
  }

  setCollections(collections) {
    window.localStorage.setItem("collections", JSON.stringify(collections));
  }
}
