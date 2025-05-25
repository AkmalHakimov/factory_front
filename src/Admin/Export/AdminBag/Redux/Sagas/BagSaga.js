import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { bagActions } from "../Reducers/BagReducer";
import ApiRequestSec from "../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";

function* getBags() {
  const states = yield select((state) => state.bag);
  yield put(bagActions.setLoading());
  const res = yield ApiRequestSec(`/bag`, "get", null, {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  });
  yield put(bagActions.setTotalPages(res.data.totalElements));
  yield put(bagActions.setData(res.data.content));
  yield put(bagActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.bag);
  const value = action.payload.value;
  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    amountGr: value.amountGr,
    property: value.property,
    width: value.width,
    exploitedFabricAm: value.exploitedFabricAm,
    sewedBagAm: value.sewedBagAm,
    limitedBagAm: value.limitedBagAm,
    gripMr: value.gripMr,
    gripForBagAm: value.gripForBagAm,
    realAm: value.realAm,
    invalidAm: value.invalidAm,
    gripInvalidBag: value.gripInvalidBag,
    gripCode: value.gripCode,
    realAm: value.realAm
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/bag/` + states.currentItm.id, "put", obj);
    yield put(bagActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/bag", "post", obj);
  }
  yield call(getBags);
  yield put(bagActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/bag/" + action.payload, "delete");
  yield call(getBags);
}

export function* bagSaga() {
  yield takeEvery("bag/getBags", getBags);
  yield takeEvery("bag/handleSave", handleSave);
  yield takeEvery("bag/handleDel", delItem);
}
