const { default: RootStore } = require("../RootStore")

export const createStore = () => {
  return new RootStore();
}