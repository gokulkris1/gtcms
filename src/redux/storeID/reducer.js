import storeAction from "./actions";

const initState = {
  storeId: null,
  storeName: null,
  isStore: false,
  branchCount: 0,
  deviceCount: 0
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case storeAction.SET:
      return {
        ...state,
        storeId: action.storeId,
        storeName: action.storeName
      };
    case storeAction.RESET:
      return {
        ...state,
        storeId: null,
        storeName: null
      };
    case storeAction.ISSTORE:
      return {
        ...state,
        isStore: action.isStore
      };
    case storeAction.COUNTS:
      return {
        ...state,
        branchCount: action.branchCount
      };
    case storeAction.DEVICECOUNT:
      return {
        ...state,
        deviceCount: action.deviceCount
      };
    default:
      return state;
  }
}
