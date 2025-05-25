import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import ApiRequestSec from "../../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";
import { orderSewActions } from "../Reducers/OrderSewReducer";

function* getOrderSews() {
  const states = yield select((state) => state.orderSew);
  yield put(orderSewActions.setLoading());
  const res = yield ApiRequestSec(`/orderSewing`, "get", null, {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  });
  yield put(orderSewActions.setTotalPages(res.data.totalElements));
  yield put(orderSewActions.setData(res.data.content));
  yield put(orderSewActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.orderSew);
  const value = action.payload.value;

  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    sewingColor: value.sewingColor,
    sewingAmount: value.sewingAmount,
    orderSewingAmount: value.orderSewingAmount,
    storeSewingAmount: value.storeSewingAmount,
    sewingPriceWithoutQQ: value.sewingPriceWithoutQQ,
    beliefCert: value.beliefCert,
    fabIncome: value.fabIncome,
    aktGolden: value.aktGolden,
    paidAmount: value.paidAmount,
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/orderSewing/` + states.currentItm.id, "put", obj);
    yield put(orderSewActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/orderSewing", "post", obj);
  }
  yield call(getOrderSews);
  yield put(orderSewActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/orderSewing/" + action.payload, "delete");
  yield call(orderSewActions);
}

export function* orderSewSaga() {
  yield takeEvery("orderSew/getOrderSews", getOrderSews);
  yield takeEvery("orderSew/handleSave", handleSave);
  yield takeEvery("orderSew/handleDel", delItem);
}
