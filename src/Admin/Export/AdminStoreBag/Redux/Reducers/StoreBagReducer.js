import { createSlice } from "@reduxjs/toolkit";

const storeBagReducer = createSlice({
  name: "storeBag",
  initialState: {
    dataSource: [],
    totalPages: "",
    loading: false,
    searchInp: "",
    selectVal: 0,
    page: 1,
    modalVisible: false,
    currentItm: "",
    pageSize: 6,
  },
  reducers: {
    setData: (state, action) => {
      state.dataSource = action.payload;
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
    handleSave: (state, action) => {
    },
    getStoreBags: (state, action) => {},
    handleDel: () => {},
    getAll: () => {},
  },
});

export const storeBagActions = { ...storeBagReducer.actions };
export default storeBagReducer.reducer;
