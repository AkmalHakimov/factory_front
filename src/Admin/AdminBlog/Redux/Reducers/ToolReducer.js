import { createSlice } from "@reduxjs/toolkit";

const toolReducer = createSlice({
  name: "tool",
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
    options: [],
    toolOptions: [],
    reports: [],
    toolsToolTypes:[],
    pieReports:"",
    totalStatistic: "",
    selectedTool: "",
    oneToolReports:[],
    tool:"",
    dateVal: "",
    totalIncomePrice: 0
  },
  reducers: {
    setData: (state, action) => {
      state.dataSource = action.payload;
    },
    setTotalIncomePrice: (state, action) => {
      state.totalIncomePrice = action.payload;
    },
    setDateVal: (state, action) => {
      state.dateVal = action.payload;
    },
    setTool: (state, action) => {
      state.tool = action.payload;
    },
    setSelectedTool: (state, action) => {
      state.selectedTool = action.payload;
    },
    setOneToolReport: (state, action) => {
      state.oneToolReports = action.payload;
    },
    setModalVisibleReport: (state, action) => {
      state.modalVisibleReport = !state.modalVisibleReport;
    },
    setTotalStatistic: (state, action) => {
      state.totalStatistic = action.payload;
    },
    setPieReports: (state, action) => {
      state.pieReports = action.payload;
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
    setCurrentItm: (state, action) => {
      state.currentItm = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    handleSave: (state, action) => {},
    getTools: (state, action) => {},
    setOptions: (state, action) => {
      state.options = action.payload;
    },
    setToolOptions: (state, action) => {
      state.toolOptions = action.payload;
    },
    setToolsTypes: (state, action) => {
      state.toolsToolTypes = action.payload;
    },
    getToolTypes: (state, action) => {
      //   state.options = action.payload;
    },
  
    getAllTools: (state, action) => {
      //   state.options = action.payload;
    },
    getOneTool: (state, action) => {
      //   state.options = action.payload;
    },
    getOneToolReport: (state, action) => {
      //   state.options = action.payload;
    },
    getPieReport: (state, action) => {
      //   state.options = action.payload;
    },
    getReports: (state, action) => {},
    setReports: (state, action) => {
      state.reports = action.payload;
    },
    handleDel: () => {},
  },
});

export const toolActions = { ...toolReducer.actions };
export default toolReducer.reducer;
