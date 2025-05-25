import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { storeFabActions } from "../Reducers/StoreFabReducer";
import ApiRequestSec from "../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";


function* getStoreFabs() {
  const states = yield select((state) => state.storeFab);
  yield put(storeFabActions.setLoading());
  const res = yield ApiRequestSec(`/storeFab`, "get", null,
   {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  }
  );
  yield put(storeFabActions.setTotalPages(res.data.totalElements));
  yield put(storeFabActions.setData(res.data.content));
  yield put(storeFabActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.storeFab);
  const value = action.payload.value;
  
  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    producerCpName: value.producerCpName,
    amountGr: value.amountGr,
    pm: value.pm,
    width: value.width,
    color: value.color,
    painterCpName: value.painterCpName,
    priceUS: value.priceUS
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/storeFab/` + states.currentItm.id, "put", obj);
    yield put(storeFabActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/storeFab", "post", obj);
  }
  yield call(getStoreFabs);
  yield put(storeFabActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/storeFab/" + action.payload, "delete");
  yield call(getStoreFabs);
}

export function* storeFabSaga() {
  yield takeEvery("storeFab/getStoreFabs", getStoreFabs );
  yield takeEvery("storeFab/handleSave", handleSave);
  yield takeEvery("storeFab/handleDel", delItem );
}
