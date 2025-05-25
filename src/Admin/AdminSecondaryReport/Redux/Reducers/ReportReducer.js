import { createSlice } from "@reduxjs/toolkit";

const reportReducer = createSlice({
  name: "report",
  initialState: {
    dataSource: [],
    reportSecondary: [],
    storeReports: [],
    totalPages: "",
    loading: false,
    searchInp: "",
    page: 1,
    pageSize: 6,
    dateNum: 31,
    salDateNum: 0,
    choyDateNum: 0,
    sumDateNum: 0,  
    totalExpensePriceSum: "",
    createdAt: "",
    dateVal: "",
    storeDateVal: ""
  },
  reducers: {
    setData: (state, action) => {
      state.dataSource = action.payload;
    },
    setStoreReports: (state, action) => {
      state.storeReports = action.payload;
    },
    setDateVal: (state, action) => {
      state.dateVal = action.payload;
    },
    setStoreDateVal: (state, action) => {
      state.storeDateVal = action.payload;
    },
    setDateNum: (state, action) => {
      state.dateNum = action.payload;
    },
    setCreatedAt: (state, action) => {
      state.createdAt = action.payload;
    },
    setSalDateNum: (state, action) => {
      state.salDateNum = action.payload;
    },
    setChoyDateNum: (state, action) => {
      state.choyDateNum = action.payload;
    },
    setSumDateNum: (state, action) => {
      state.sumDateNum = action.payload;
    },
    setTotalExpensePriceSum: (state, action) => {
      state.totalExpensePriceSum = action.payload;
    },
    setReportSecondary: (state, action) => {
      state.reportSecondary = action.payload;
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
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    handleSave: (state, action) => {},
    saveReportPie: (state, action) => {},
    getReports: (state, action) => {  },
    getStoreReports: (state, action) => {  },
    handleDel: ()  => {},
  },
});

export const reportActions = { ...reportReducer.actions };
export default reportReducer.reducer;
