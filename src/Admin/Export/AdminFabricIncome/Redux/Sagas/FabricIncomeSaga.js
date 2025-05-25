import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { fabricIncomeActions } from "../Reducers/FabricIncomeReducer";
import ApiRequestSec from "../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";


function* getFabricIncomes() {
  const states = yield select((state) => state.fabricIncome);
  yield put(fabricIncomeActions.setLoading());
  const res = yield ApiRequestSec(`/fabricIncome`, "get", null,
   {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  }
  );
  yield put(fabricIncomeActions.setTotalPages(res.data.totalElements));
  yield put(fabricIncomeActions.setData(res.data.content));
  yield put(fabricIncomeActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.fabricIncome);
  const value = action.payload.value;
  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    producerCpName: value.producerCpName,
    amountGr: value.amountGr,
    pm: value.pm,
    width: value.width,
    color: value.color,
    priceUS: value.priceUS,
    certified: value.certified,
    paidAmount: value.paidAmount,
    submittedToCp: value.submittedToCp,
    akt: value.akt,
    factureIncome: value.factureIncome,
    submittedToSewPm: value.submittedToSewPm,
    submittedToPaint: value.submittedToPaint,
    submittedToPaintPm: value.submittedToPaintPm,
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/fabricIncome/` + states.currentItm.id, "put", obj);
    yield put(fabricIncomeActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/fabricIncome", "post", obj);
  }
  yield call(getFabricIncomes);
  yield put(fabricIncomeActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/fabricIncome/" + action.payload, "delete");
  yield call(getFabricIncomes);
}

export function* fabricIncomeSaga() {
  yield takeEvery("fabricIncome/getFabricIncomes", getFabricIncomes );
  yield takeEvery("fabricIncome/handleSave", handleSave);
  yield takeEvery("fabricIncome/handleDel", delItem );
}
