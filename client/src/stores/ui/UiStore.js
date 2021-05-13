import GlobalView from "./GlobalView";

//User interface global state used when app scales in future
export default class UiStore {
  globalView;

  constructor(rootStore) {
    this.globalView = new GlobalView(rootStore);
  }
}