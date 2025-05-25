import { createSlice } from "@reduxjs/toolkit";

const toolTypeReducer = createSlice({
  name: "toolType",
  initialState: {
    dataSource: [],
    toolTypes: [],
    totalPages: "",
    loading: false,
    searchInp: "",
    selectVal: 0,
    page: 1,
    typeModalVisible: false,
    currentItm: "",
    pageSize: 6,
    nameInp: ""
  },
  reducers: {
    setData: (state, action) => {
      state.dataSource = action.payload;
    },
    setToolTypes: (state, action) => {
      state.toolTypes = action.payload;
    },
    setName: (state, action) => {
      state.nameInp = action.payload;
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
    setSearchInp: (state, action) => {
      state.searchInp = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTypeModalVisible: (state, action) => {
      state.typeModalVisible = !state.typeModalVisible;
    },
    setCurrentItm: (state, action) => {
      state.currentItm = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    getToolTypes: (state, action) => {
      // state.options = action.payload;
    },
    handleSave: (state, action) => {},
    delItem: () => {},
    handleEdit: () => {},
  },
});

export const toolTypeActions = { ...toolTypeReducer.actions };
export default toolTypeReducer.reducer;
