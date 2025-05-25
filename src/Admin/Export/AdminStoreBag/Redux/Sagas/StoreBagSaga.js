import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { storeBagActions } from "../Reducers/StoreBagReducer";
import ApiRequestSec from "../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";


function* getStoreBags() {
  const states = yield select((state) => state.storeBag);
  yield put(storeBagActions.setLoading());
  const res = yield ApiRequestSec(`/storeBag`, "get", null,
   {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  }
  );
  yield put(storeBagActions.setTotalPages(res.data.totalElements));
  yield put(storeBagActions.setData(res.data.content));
  yield put(storeBagActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.storeBag);
  const value = action.payload.value;
  
  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    propertyBag: value.propertyBag,
    propertyGrip: value.propertyGrip,
    amountGr: value.amountGr,
    color: value.color,
    label: value.label,
    birka: value.birka,
    amount: value.amount,
    priceUS: value.priceUS,
    fabCode: value.fabCode,
    fabAmountGr: value.fabAmountGr,
    fabWidth: value.fabWidth,
    fabColor: value.fabColor,
    exploitedFabPm: value.exploitedFabPm,
    limitedBagProp: value.limitedBagProp,
    limitedGripProp: value.limitedGripProp,
    limitedM2: value.limitedM2,
    description: value.description,
    totalPrice: value.totalPrice,
    labelAm: value.labelAm,
    birkaAm: value.birkaAm,
    boxBagAm: value.boxBagAm,
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/storeBag/` + states.currentItm.id, "put", obj);
    yield put(storeBagActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/storeBag", "post", obj);
  }
  yield call(getStoreBags);
  yield put(storeBagActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/storeBag/" + action.payload, "delete");
  yield call(getStoreBags);
}

export function* storeBagSaga() {
  yield takeEvery("storeBag/getStoreBags", getStoreBags );
  yield takeEvery("storeBag/handleSave", handleSave);
  yield takeEvery("storeBag/handleDel", delItem );
}
