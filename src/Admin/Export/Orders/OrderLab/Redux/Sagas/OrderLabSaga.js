import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { orderLabActions } from "../Reducers/OrderLabReducer";
import ApiRequestSec from "../../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";


function* getOrderLabs() {
  const states = yield select((state) => state.orderLab);
  yield put(orderLabActions.setLoading());
  const res = yield ApiRequestSec(`/orderLab`, "get", null,
   {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  }
  );
  yield put(orderLabActions.setTotalPages(res.data.totalElements));
  yield put(orderLabActions.setData(res.data.content));
  yield put(orderLabActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.orderLab);
  const value = action.payload.value;
  
  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    code: value.code,
    orderLabAmount: value.orderLabAmount,
    storeLabAmount: value.storeLabAmount,
    labPrice: value.labPrice,
    beliefCert: value.beliefCert,
    fabIncome: value.fabIncome,
    aktGolden: value.aktGolden,
    paidAmount: value.paidAmount,
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/orderLab/` + states.currentItm.id, "put", obj);
    yield put(orderLabActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/orderLab", "post", obj);
  }
  yield call(getOrderLabs);
  yield put(orderLabActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/orderLab/" + action.payload, "delete");
  yield call(getOrderLabs);
}

export function* orderLabSaga() {
  yield takeEvery("orderLab/getOrderLabs", getOrderLabs );
  yield takeEvery("orderLab/handleSave", handleSave);
  yield takeEvery("orderLab/handleDel", delItem);
}
