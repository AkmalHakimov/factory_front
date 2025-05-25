import { select, takeEvery, put, call } from "redux-saga/effects";
import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import {sewingActions } from "../Reducers/SewingReducer";
import dayjs from "dayjs";

function* getSewings() {
  const states = yield select((state) => state.sewing);
  yield put(sewingActions.setLoading());

  
  const dateVal = states.dateVal 
  ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
  : dayjs().format("YYYY-MM-DD");


  const res = yield ApiRequest(`/sewing`, "get", null, {
    page: states.page,
    search: states.searchInp,
    offset: states.pageSize,
    date: dateVal
  });
  yield put(sewingActions.setTotalPages(res.data.totalElements));
  yield put(sewingActions.setData(res.data.content));
  yield put(sewingActions.setLoading());
}


function* getWorkerReports() {
  const states = yield select((state) => state.sewing);

  const dateVal = states.dateVal 
  ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
  : dayjs().format("YYYY-MM-DD");


  const res = yield ApiRequest(`/sewing/report`, "get", null, {
    page: states.page,
    search: states.searchInp,
    offset: states.pageSize,
    date: dateVal,
    workerId: states.selectVal
  });


  yield put(sewingActions.setTotalPages(res.data.totalElements));
  yield put(sewingActions.setWorkerReports(res.data.content));
}


function* getOneWorkerReports(action) {
  const states = yield select((state) => state.sewing);
  const firstName = states.workerReports.find(item => item.workerId === action.payload)?.firstName;
  const lastName = states.workerReports.find(item => item.workerId === action.payload)?.lastName;

  yield put(sewingActions.setWorker({
    firstName,
    lastName
  }));

  const dateVal = states.dateVal 
  ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
  : dayjs().format("YYYY-MM-DD");


  yield put(sewingActions.setModalVisibleReport());
  const resOneWorker = yield ApiRequest(`/sewing/report/oneWorker/` + action.payload, "get", null, {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
    date: dateVal
  });

  yield put(sewingActions.setOneWorkerReports(resOneWorker.data));
}

function* handleSave(action) {
  const states = yield select((state) => state.sewing);
  const value = action.payload.value;

  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    orderNum: value.orderNum,
    count: value.count,
    chipCount: value.chipCount,
    cleaningCount: value.cleaningCount,
    buttonOpenCount: value.buttonOpenCount,
    yarnOpenCount: value.yarnOpenCount,
    blueLabel: value.blueLabel,
    yellowChip: value.yellowChip,
    plankDrawing: value.plankDrawing,
    packBag: value.packBag,
    artMat: value.artMat,
    articleId: value.articleId,
    workerId:  value.workerId,
  };

  if (states.currentItm) {
    yield ApiRequest(`/sewing/` + states.currentItm.id, "put", obj);
    yield put(sewingActions.setCurrentItm(""));
  } else {
    yield ApiRequest("/sewing", "post", obj);
  }
  yield call(getSewings);
  yield put(sewingActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequest("/sewing/" + action.payload, "delete");
  yield call(getSewings);
}

export function* sewingSaga() {
  yield takeEvery("sewing/getSewings", getSewings);
  yield takeEvery("sewing/getWorkerReports", getWorkerReports);
  yield takeEvery("sewing/getOneWorkerReports", getOneWorkerReports);
  yield takeEvery("sewing/handleSave", handleSave);
  yield takeEvery("sewing/handleDel", delItem);
}
