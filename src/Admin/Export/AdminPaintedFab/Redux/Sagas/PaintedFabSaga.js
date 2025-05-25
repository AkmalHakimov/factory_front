import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { paintedFabActions } from "../Reducers/PaintedFabReducer";
import ApiRequestSec from "../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";


function* getPaintedFabs() {
  const states = yield select((state) => state.paintedFab);
  yield put(paintedFabActions.setLoading());
  const res = yield ApiRequestSec(`/paintedFabric`, "get", null,
   {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  }
  );
  yield put(paintedFabActions.setTotalPages(res.data.totalElements));
  yield put(paintedFabActions.setData(res.data.content));
  yield put(paintedFabActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.paintedFab);
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
    yield ApiRequestSec(`/paintedFabric/` + states.currentItm.id, "put", obj);
    yield put(paintedFabActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/paintedFabric", "post", obj);
  }
  yield call(getPaintedFabs);
  yield put(paintedFabActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/paintedFabric/" + action.payload, "delete");
  yield call(getPaintedFabs);
}

export function* paintedFabSaga() {
  yield takeEvery("paintedFab/getPaintedFabs", getPaintedFabs );
  yield takeEvery("paintedFab/handleSave", handleSave);
  yield takeEvery("paintedFab/handleDel", delItem );
}
