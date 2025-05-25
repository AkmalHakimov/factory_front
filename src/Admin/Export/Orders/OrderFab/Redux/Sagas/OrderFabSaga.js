import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { orderFabActions } from "../Reducers/OrderFabReducer";
import ApiRequestSec from "../../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";


function* getOrderFabs() {
  const states = yield select((state) => state.orderFab);
  yield put(orderFabActions.setLoading());
  const res = yield ApiRequestSec(`/orderFab`, "get", null,
   {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  }
  );
  yield put(orderFabActions.setTotalPages(res.data.totalElements));
  yield put(orderFabActions.setData(res.data.content));
  yield put(orderFabActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.orderFab);
  const value = action.payload.value;

  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    clientName: value.clientName,
    orderNum: value.orderNum,
    bagProp: value.bagProp,
    gripProp: value.gripProp,
    bagCount: value.bagCount,
    fabGr: value.fabGr,
    bagM2: value.bagM2,
    availableFabPm: value.availableFabPm,
    width: value.width,
    color: value.color,
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/orderFab/` + states.currentItm.id, "put", obj);
    yield put(orderFabActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/orderFab", "post", obj);
  }
  yield call(getOrderFabs);
  yield put(orderFabActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/orderFab/" + action.payload, "delete");
  yield call(getOrderFabs);
}

export function* orderFabSaga() {
  yield takeEvery("orderFab/getOrderFabs", getOrderFabs );
  yield takeEvery("orderFab/handleSave", handleSave);
  yield takeEvery("orderFab/handleDel", delItem );
}
