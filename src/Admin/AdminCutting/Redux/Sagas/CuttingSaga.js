import { select, takeEvery, put, call } from "redux-saga/effects";
import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { cuttingActions } from "../Reducers/CuttingReducer";
import dayjs from "dayjs";

function* getCuttings() {
  const states = yield select((state) => state.cutting);

  const dateVal = states.dateVal 
  ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
  : dayjs().format("YYYY-MM-DD");


  yield put(cuttingActions.setLoading());
  const res = yield ApiRequest(`/cutting`, "get", null, {
    page: states.page,
    search: states.searchInp,
    offset: states.pageSize,
    date: dateVal
  });
  yield put(cuttingActions.setTotalPages(res.data.totalElements));
  yield put(cuttingActions.setData(res.data.content));
  yield put(cuttingActions.setLoading());
}

function* getWorkerReports() {
  const states = yield select((state) => state.cutting);

  const dateVal = states.dateVal 
  ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
  : dayjs().format("YYYY-MM-DD");


  const res = yield ApiRequest(`/cutting/report`, "get", null, {
    page: states.page,
    search: states.searchInp,
    offset: states.pageSize,
    date: dateVal
  });


  yield put(cuttingActions.setTotalPages(res.data.totalElements));
  yield put(cuttingActions.setWorkerReports(res.data.content));
}


function* getOneWorkerReports(action) {
  const states = yield select((state) => state.cutting);
  const firstName = states.workerReports.find(item => item.id === action.payload)?.firstName;
  const lastName = states.workerReports.find(item => item.id === action.payload)?.lastName;

  yield put(cuttingActions.setWorker({
    firstName,
    lastName
  }));

  const dateVal = states.dateVal 
  ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
  : dayjs().format("YYYY-MM-DD");


  yield put(cuttingActions.setModalVisibleReport());
  const resOneWorker = yield ApiRequest(`/cutting/report/oneWorker/` + action.payload, "get", null, {
    page: states.page,
    search: states.searchInp,
    offset: states.pageSize,
    date: dateVal
  });

  yield put(cuttingActions.setOneWorkerReports(resOneWorker.data));
}

function* handleSave(action) {
  const states = yield select((state) => state.cutting);
  const value = action.payload.value;

  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    orderNum: value.orderNum,
    readyProdCount: value.readyProdCount,
    sideOption: value.sideOption,
    articleId: value.articleId,
    workerId: value.workerId,
  };

  

  if (states.currentItm) {
    yield ApiRequest(`/cutting/` + states.currentItm.id, "put", obj);
    yield put(cuttingActions.setCurrentItm(""));
  } else {
    yield ApiRequest("/cutting", "post", obj);
  }
  yield call(getCuttings);
  yield put(cuttingActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequest("/cutting/" + action.payload, "delete");
  yield call(getCuttings);
}

export function* cuttingSaga() {
  yield takeEvery("cutting/getCuttings", getCuttings);
  yield takeEvery("cutting/getWorkerReports", getWorkerReports);
  yield takeEvery("cutting/getOneWorkerReports", getOneWorkerReports);
  yield takeEvery("cutting/handleSave", handleSave);
  yield takeEvery("cutting/handleDel", delItem);
}
