const { useContext } = require("react")
const { StoreContext } = require("./StoreContext")

const useStore = () => {
  return useContext(StoreContext);
}

export { useStore };