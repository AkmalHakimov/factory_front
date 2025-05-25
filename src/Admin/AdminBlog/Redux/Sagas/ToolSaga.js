import { select, takeEvery, put, call } from "redux-saga/effects";
import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { toolActions } from "../Reducers/ToolReducer";
import dayjs from "dayjs";

function* getToolTypes() {
  const states = yield select((state) => state.tool);
  yield put(toolActions.setLoading());
  const res = yield ApiRequest(`/toolType/all`, "get", null);

  const newOptions = [
    { label: "Uskuna turlari", value: "" },
    ...(res.data?.map((item) => ({
      label: item.name,
      value: item.id,
      key: item.id,
      desc: item.name,
    })) || []),
  ];
  // yield put(toolActions.setTotalPages(res.data.totalElements));
  yield put(toolActions.setOptions(newOptions));
  yield put(toolActions.setLoading());
}

function* getTools() {
  const states = yield select((state) => state.tool);
  yield put(toolActions.setLoading());
  const res = yield ApiRequest(`/tool`, "get", null, {
    page: states.page,
    search: states.searchInp,
    toolTypeId: states.selectVal,
    offset: states.pageSize,
  });
  yield put(toolActions.setTotalPages(res.data.totalElements));
  yield put(toolActions.setData(res.data.content));
  yield put(toolActions.setLoading());
}

function* getAllTools() {
  const states = yield select((state) => state.tool);
  yield put(toolActions.setLoading());
  const res = yield ApiRequest(`/tool/all`, "get", null);

  const newOptions = [
    { label: "Uskunalar", value: "" },
    ...(res.data?.map((item) => ({
      label: item.name,
      value: item.id,
      key: item.id,
    })) || []),
  ];

  yield put(toolActions.setToolOptions(newOptions));
  yield put(toolActions.setLoading());
}

function* getOneTool(action) {
  const states = yield select((state) => state.tool);
  const res = yield ApiRequest(`/tool/one/` + action.payload, "get", null);

  const newOptions = [
    { label: "Uskunalar turlari", value: "" },
    ...(res.data.toolTypes?.map((item) => ({
      label: item.name,
      value: item.id,
      key: item.id,
    })) || []),
  ];

  yield put(toolActions.setSelectedTool(action.payload));
  yield put(toolActions.setToolsTypes(newOptions));
}
function* getOneToolReport(action) {
  yield put(toolActions.setOneToolReport([]));

  const states = yield select((state) => state.tool);

  yield put(toolActions.setModalVisibleReport());
  const res = yield ApiRequest(
    `/tool/oneToolReport/` + action.payload,
    "get",
    null,
    {
      date: states.dateVal 
      ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
      : dayjs().format("YYYY-MM-DD")
    }
  );
  const resData = yield ApiRequest(`/tool/one/` + action.payload, "get", null);

  yield put(toolActions.setOneToolReport(res.data));
  yield put(toolActions.setTool(resData.data));
}

function* getReports() {
  const states = yield select((state) => state.tool);
  yield put(toolActions.setLoading());
  const res = yield ApiRequest(`/tool/report`, "get", null, {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
    date: states.dateVal 
    ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
    : dayjs().format("YYYY-MM-DD")
  });

  let s = 0;
  for (let i = 0; i < res?.data?.content?.length; i++) {
    s += res.data.content[i].totalExpensePrice;
  }

  yield put(toolActions.setTotalIncomePrice(s));

  const resData = yield ApiRequest(`/tool/calculateBalance`, "get", null);
  yield put(toolActions.setTotalStatistic(resData.data));

  yield put(toolActions.setTotalPages(res.data.totalElements));
  yield put(toolActions.setReports(res.data.content));
  yield put(toolActions.setLoading());
}

function* getPieReport() {
  const states = yield select((state) => state.tool);

  const valDate =states.dateVal 
  ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
  : dayjs().format("YYYY-MM-DD");

  const res = yield ApiRequest(`/tool/pieReport`, "get", null,{
    date: valDate
  });
  yield put(toolActions.setPieReports(res.data));
}

function* handleSave(action) {
  const states = yield select((state) => state.tool);
  const value = action.payload.value;
  let newArr = [];
  if (value.toolTypeId[0].label) {
    value.toolTypeId.map((item, index) => {
      newArr[index] = item.value;
    });
  } else {
    newArr = value.toolTypeId;
  }
  let obj = {
    name: value.name,
    marka: value.marka,
    color: value.color,
    size: value.size,
    code: value.code,
    dimension: value.dimension,
    // toolTypeIds: value.toolTypeId?.value ?? value.toolTypeId,
    toolTypeIds: newArr,
  };
  if (states.currentItm) {
    yield ApiRequest(`/tool/` + states.currentItm.id, "put", obj);
    yield put(toolActions.setCurrentItm(""));
  } else {
    yield ApiRequest("/tool", "post", obj);
  }
  yield call(getTools);
  yield put(toolActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequest("/tool/" + action.payload, "delete");
  yield call(getTools);
}

export function* toolSaga() {
  yield takeEvery("tool/getOneTool", getOneTool);
  yield takeEvery("tool/getOneToolReport", getOneToolReport);
  yield takeEvery("tool/getPieReport", getPieReport);
  yield takeEvery("tool/getToolTypes", getToolTypes);
  yield takeEvery("tool/getReports", getReports);
  yield takeEvery("tool/getTools", getTools);
  yield takeEvery("tool/getAllTools", getAllTools);
  yield takeEvery("tool/handleSave", handleSave);
  yield takeEvery("tool/handleDel", delItem);
}
