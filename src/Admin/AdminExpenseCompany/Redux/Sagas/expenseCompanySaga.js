import { select, takeEvery, put, call } from "redux-saga/effects";
import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { expenseCompanyActions } from "../Reducers/expenseCompanyReducer";
import dayjs from "dayjs";

function* getExpenseCompany() {
  const states = yield select((state) => state.expenseCompany);
  yield put(expenseCompanyActions.setLoading());
  const res = yield ApiRequest(`/expenseCompany`, "get", null, {
    page: states.page,
    search: states.searchInp,
    offset: states.pageSize,
  });

  yield put(expenseCompanyActions.setTotalPages(res.data.totalElements));
  yield put(expenseCompanyActions.setData(res.data.content));
  yield put(expenseCompanyActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.expenseCompany);
  const value = action.payload.value;

  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    amount: value.amount,
    price: value.price,
    name: value.name,
    type: value.type,
    description: value.description,
  };

  if (states.currentItm) {
    yield ApiRequest(`/expenseCompany/` + states.currentItm.id, "put", obj);
    yield put(expenseCompanyActions.setCurrentItm(""));
  } else {
    yield ApiRequest("/expenseCompany", "post", obj);
  }
  yield call(getExpenseCompany);
  yield put(expenseCompanyActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequest("/expenseCompany/" + action.payload, "delete");
  yield call(getExpenseCompany);
}

export function* expenseCompanySaga() {
  yield takeEvery("expenseCompany/getExpenseCompany", getExpenseCompany);
  yield takeEvery("expenseCompany/handleSave", handleSave);
  yield takeEvery("expenseCompany/handleDel", delItem);
}
