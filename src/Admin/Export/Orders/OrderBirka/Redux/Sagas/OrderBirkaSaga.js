import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import ApiRequestSec from "../../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";
import { orderBirkaActions } from "../Reducers/OrderBirkaReducer";

function* getOrderBirkas() {
  const states = yield select((state) => state.orderBirka);
  yield put(orderBirkaActions.setLoading());
  const res = yield ApiRequestSec(`/orderBirka`, "get", null, {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  });
  yield put(orderBirkaActions.setTotalPages(res.data.totalElements));
  yield put(orderBirkaActions.setData(res.data.content));
  yield put(orderBirkaActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.orderBirka);
  const value = action.payload.value;

  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    code: value.code,
    orderBirkaAmount: value.orderBirkaAmount,
    storeBirkaAmount: value.storeBirkaAmount,
    birkaPrice: value.birkaPrice,
    beliefCert: value.beliefCert,
    fabIncome: value.fabIncome,
    aktGolden: value.aktGolden,
    paidAmount: value.paidAmount,
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/orderBirka/` + states.currentItm.id, "put", obj);
    yield put(orderBirkaActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/orderBirka", "post", obj);
  }
  yield call(getOrderBirkas);
  yield put(orderBirkaActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/orderBirka/" + action.payload, "delete");
  yield call(getOrderBirkas);
}

export function* orderBirkaSaga() {
  yield takeEvery("orderBirka/getOrderBirkas", getOrderBirkas);
  yield takeEvery("orderBirka/handleSave", handleSave);
  yield takeEvery("orderBirka/handleDel", delItem);
}
