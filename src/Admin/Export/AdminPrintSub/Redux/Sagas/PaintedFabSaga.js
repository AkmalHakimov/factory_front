import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { printSubActions } from "../Reducers/PaintedFabReducer";
import ApiRequestSec from "../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";


function* getPrintSubs() {
  const states = yield select((state) => state.printSub);
  yield put(printSubActions.setLoading());
  const res = yield ApiRequestSec(`/printSub`, "get", null,
   {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  }
  );
  yield put(printSubActions.setTotalPages(res.data.totalElements));
  yield put(printSubActions.setData(res.data.content));
  yield put(printSubActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.printSub);
  const value = action.payload.value;
  
  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    amountGr: value.amountGr,
    pm: value.pm,
    width: value.width,
    color: value.color,
    submittedToCp: value.submittedToCp,
    akt: value.akt,
    paintServId: value.paintServId
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/printSub/` + states.currentItm.id, "put", obj);
    yield put(printSubActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/printSub", "post", obj);
  }
  yield call(getPrintSubs);
  yield put(printSubActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/printSub/" + action.payload, "delete");
  yield call(getPrintSubs);
}

export function* printSubSaga() {
  yield takeEvery("printSub/getPrintSubs", getPrintSubs);
  yield takeEvery("printSub/handleSave", handleSave);
  yield takeEvery("printSub/handleDel", delItem );
}
