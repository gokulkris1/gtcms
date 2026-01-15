const storeActions = {
  SET: "SET",
  RESET: "RESET",
  ISSTORE: "ISSTORE",
  COUNTS: "COUNTS",
  DEVICECOUNT: "DEVICECOUNT",

  setStoreId: data => {
    return {
      type: storeActions.SET,
      storeId: data.id,
      storeName: data.name
    };
  },
  resetStoreId: () => {
    return {
      type: storeActions.RESET
    };
  },
  setIsStore: data => {
    return {
      type: storeActions.ISSTORE,
      isStore: data
    };
  },
  setStoreBranchCounts: data => {
    return {
      type: storeActions.COUNTS,
      branchCount: data
    };
  },
  setStoreDeviceCounts: data => {
    return {
      type: storeActions.DEVICECOUNT,
      deviceCount: data
    };
  }
};

export default storeActions;
