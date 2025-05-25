import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import ApiRequestSec from "../../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";
import { orderBoxActions } from "../Reducers/OrderBoxReducer";

function* getOrderBoxs() {
  const states = yield select((state) => state.orderBox);
  yield put(orderBoxActions.setLoading());
  const res = yield ApiRequestSec(`/orderBox`, "get", null, {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  });
  yield put(orderBoxActions.setTotalPages(res.data.totalElements));
  yield put(orderBoxActions.setData(res.data.content));
  yield put(orderBoxActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.orderBox);
  const value = action.payload.value;

  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    boxProp: value.boxProp,
    bagAmount: value.bagAmount,
    orderBoxAmount: value.orderBoxAmount,
    storeBirkaAmount: value.storeBirkaAmount,
    boxPriceWithoutQQ: value.boxPriceWithoutQQ,
    beliefCert: value.beliefCert,
    fabIncome: value.fabIncome,
    aktGolden: value.aktGolden,
    paidAmount: value.paidAmount,
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/orderBox/` + states.currentItm.id, "put", obj);
    yield put(orderBoxActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/orderBox", "post", obj);
  }
  yield call(getOrderBoxs);
  yield put(orderBoxActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/orderBox/" + action.payload, "delete");
  yield call(getOrderBoxs);
}

export function* orderBoxSaga() {
  yield takeEvery("orderBox/getOrderBoxs", getOrderBoxs);
  yield takeEvery("orderBox/handleSave", handleSave);
  yield takeEvery("orderBox/handleDel", delItem);
}
