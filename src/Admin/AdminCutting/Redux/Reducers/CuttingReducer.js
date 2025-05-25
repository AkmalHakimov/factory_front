import { createSlice } from "@reduxjs/toolkit";

const cuttingReducer = createSlice({
  name: "cutting",
  initialState: {
    dataSource: [],
    totalPages: "",
    loading: false,
    searchInp: "",
    selectVal: 0,
    page: 1,
    modalVisible: false,
    modalVisibleReport: false,
    currentItm: "",
    pageSize: 6,
    workerReports: [],
    oneWorkerReports: [],
    worker: "",
    dateVal: ""
  },
  reducers: {
    setData: (state, action) => {
      state.dataSource = action.payload;
    },
    setDateVal: (state, action) => {
      state.dateVal = action.payload;
    },

    setWorker: (state, action) => {
      state.worker = action.payload;
    },

    setWorkerReports: (state, action) => {
      state.workerReports = action.payload;
    },
    setOneWorkerReports: (state, action) => {
      state.oneWorkerReports = action.payload;
    },
  
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = !state.loading;
    },
    setSearchInp: (state, action) => {
      state.searchInp = action.payload;
    },
    setSelectVal: (state, action) => {
      state.selectVal = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setModalVisible: (state, action) => {
      state.modalVisible = !state.modalVisible;
    },
    setModalVisibleReport: (state, action) => {
      state.modalVisibleReport = !state.modalVisibleReport;
    },
    setCurrentItm: (state, action) => {
      state.currentItm = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    handleSave: (state, action) => {
    },
    getCuttings: (state, action) => {},
    getWorkerReports: (state, action) => {},
    getOneWorkerReports: (state, action) => {},
    handleDel: () => {},
  },
});

export const cuttingActions = { ...cuttingReducer.actions };
export default cuttingReducer.reducer;
