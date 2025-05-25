import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import ApiRequestSec from "../../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";
import { orderPackActions } from "../Reducers/OrderPackReducer";

function* getOrderPacks() {
  const states = yield select((state) => state.orderPack);
  yield put(orderPackActions.setLoading());
  const res = yield ApiRequestSec(`/orderPack`, "get", null, {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  });
  yield put(orderPackActions.setTotalPages(res.data.totalElements));
  yield put(orderPackActions.setData(res.data.content));
  yield put(orderPackActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.orderPack);
  const value = action.payload.value;

  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    packProp: value.packProp,
    packAmount: value.packAmount,
    orderPackAmount: value.orderPackAmount,
    weight: value.weight,
    storeWeight: value.storeWeight,
    packPriceWithoutQQ: value.packPriceWithoutQQ,
    beliefCert: value.beliefCert,
    fabIncome: value.fabIncome,
    aktGolden: value.aktGolden,
    paidAmount: value.paidAmount,
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/orderPack/` + states.currentItm.id, "put", obj);
    yield put(orderPackActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/orderPack", "post", obj);
  }
  yield call(getOrderPacks);
  yield put(orderPackActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/orderPack/" + action.payload, "delete");
  yield call(getOrderPacks);
}

export function* orderPackSaga() {
  yield takeEvery("orderPack/getOrderPacks", getOrderPacks);
  yield takeEvery("orderPack/handleSave", handleSave);
  yield takeEvery("orderPack/handleDel", delItem);
}
