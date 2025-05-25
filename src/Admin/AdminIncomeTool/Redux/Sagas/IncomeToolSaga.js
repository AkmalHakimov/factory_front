import { select, takeEvery, put, call } from "redux-saga/effects";
import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { incomeToolActions } from "../Reducers/IncomeToolReducer";
import dayjs from "dayjs";

function* getIncomeTools() {
  const states = yield select((state) => state.incomeTool);
  yield put(incomeToolActions.setLoading());

  const dateVal = states.dateVal 
  ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
  : dayjs().format("YYYY-MM-DD");

  const res = yield ApiRequest(`/incomeTool`, "get", null,
   {
    page: states.page,
    search: states.searchInp,
    toolId: states.selectVal,
    offset: states.pageSize,
    date: dateVal
  }
  );


  yield put(incomeToolActions.setTotalPages(res.data.totalElements));
  yield put(incomeToolActions.setData(res.data.content));
  yield put(incomeToolActions.setLoading());
}

function* handleSave(action) {
  const states = yield select((state) => state.incomeTool);
  const value = action.payload.value;
  
  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    amount: value.amount,
    price: value.price,
    paymentType: value.paymentType,
    toolId: value.toolId?.value ?? value.toolId,
    toolTypeId: value.toolTypeId?.value ?? value.toolTypeId,
  };

  if (states.currentItm) {
    yield ApiRequest(`/incomeTool/` + states.currentItm.id, "put", obj);
    yield put(incomeToolActions.setCurrentItm(""));
  } else {
    yield ApiRequest("/incomeTool", "post", obj);
  }
  yield call(getIncomeTools);
  yield put(incomeToolActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequest("/incomeTool/" + action.payload, "delete");
  yield call(getIncomeTools);
}

export function* incomeToolSaga() {
  yield takeEvery("incomeTool/getIncomeTools", getIncomeTools);
  yield takeEvery("incomeTool/handleSave", handleSave);
  yield takeEvery("incomeTool/handleDel", delItem );
}
