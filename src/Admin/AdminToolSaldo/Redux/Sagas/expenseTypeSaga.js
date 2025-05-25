import { select, takeEvery, put, call } from "redux-saga/effects";
import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import {expenseTypeActions } from "../Reducers/ExpenseTypeReducer";
import dayjs from "dayjs";

function* getExpenseTypes() {
  const states = yield select((state) => state.expenseType);
  yield put(expenseTypeActions.setLoading());
  const res = yield ApiRequest(`/expenseType`, "get", null, {
    page: states.page,
    search: states.searchInp,
    offset: states.pageSize,
  });

  yield put(expenseTypeActions.setTotalPages(res.data.totalElements));
  yield put(expenseTypeActions.setData(res.data.content));
  yield put(expenseTypeActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.expenseType);
  const value = action.payload.value;

  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    amount: value.amount,
    name: value.name,
  };

  if (states.currentItm) {
    yield ApiRequest(`/expenseType/` + states.currentItm.id, "put", obj);
    yield put(expenseTypeActions.setCurrentItm(""));
  } else {
    yield ApiRequest("/expenseType", "post", obj);
  }
  yield call(getExpenseTypes);
  yield put(expenseTypeActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequest("/expenseType/" + action.payload, "delete");
  yield call(getExpenseTypes);
}

export function* expenseTypeSaga() {
  yield takeEvery("expenseType/getExpenseTypes", getExpenseTypes);
  yield takeEvery("expenseType/handleSave", handleSave);
  yield takeEvery("expenseType/handleDel", delItem);
}
