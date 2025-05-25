import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { paintServActions } from "../Reducers/PaintServReducer";
import ApiRequestSec from "../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";


function* getPaintServs() {
  const states = yield select((state) => state.paintServ);
  yield put(paintServActions.setLoading());
  const res = yield ApiRequestSec(`/paintServ`, "get", null,
   {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  }
  );
  yield put(paintServActions.setTotalPages(res.data.totalElements));
  yield put(paintServActions.setData(res.data.content));
  yield put(paintServActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.paintServ);
  const value = action.payload.value;
  
  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    producerCpName: value.producerCpName,
    amountGr: value.amountGr,
    pm: value.pm,
    width: value.width,
    color: value.color,
    painterCpName: value.painterCpName,
    priceUS: value.priceUS,
    factureIncome: value.factureIncome,
    certified: value.certified,
    paidAmount: value.paidAmount,
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/paintServ/` + states.currentItm.id, "put", obj);
    yield put(paintServActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/paintServ", "post", obj);
  }
  yield call(getPaintServs);
  yield put(paintServActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/paintServ/" + action.payload, "delete");
  yield call(getPaintServs);
}

export function* paintServSaga() {
  yield takeEvery("paintServ/getPaintServs", getPaintServs );
  yield takeEvery("paintServ/handleSave", handleSave);
  yield takeEvery("paintServ/handleDel", delItem );
}
