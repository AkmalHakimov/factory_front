import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { printActions } from "../Reducers/PrintReducer";
import ApiRequestSec from "../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";

function* getPrints() {
  const states = yield select((state) => state.print);
  yield put(printActions.setLoading());
  const res = yield ApiRequestSec(`/print`, "get", null, {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  });
  yield put(printActions.setTotalPages(res.data.totalElements));
  yield put(printActions.setData(res.data.content));
  yield put(printActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.print);
  const value = action.payload.value;
  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    bagProp: value.bagProp,
    gripProp: value.gripProp,
    amount: value.amount,
    color: value.color,
    cpName: value.cpName,
    gr: value.gr,
    designName: value.designName,
    pmPrice: value.pmPrice,
    fabIncome: value.fabIncome,
    aktGolden: value.aktGolden,
    paidAmount: value.paidAmount
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/print/` + states.currentItm.id, "put", obj);
    yield put(printActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/print", "post", obj);
  }
  yield call(getPrints);
  yield put(printActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/print/" + action.payload, "delete");
  yield call(printActions);
}

export function* printSaga() {
  yield takeEvery("print/getPrints", getPrints);
  yield takeEvery("print/handleSave", handleSave);
  yield takeEvery("print/handleDel", delItem);
}
