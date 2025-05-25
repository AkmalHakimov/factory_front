import { select, takeEvery, put, call } from "redux-saga/effects";
import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { expenseToolActions } from "../Reducers/ExpenseToolReducer";

import dayjs from "dayjs";
import { ErrorNotify } from "../../../../utils/ErrorNotify/ErrorNotify";
import { WarningNotify } from "../../../../utils/WarningNotify/WarningNotify";

function* getExpenseTools() {
  const states = yield select((state) => state.expenseTool);
  yield put(expenseToolActions.setLoading());

  const dateVal = states.dateVal 
  ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
  : dayjs().format("YYYY-MM-DD");
  
  const res = yield ApiRequest(`/expenseTool`, "get", null, {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    toolId: states.selectVal,
    offset: states.pageSize,
    date: dateVal
  });

  yield put(expenseToolActions.setTotalPages(res.data.totalElements));
  yield put(expenseToolActions.setData(res.data.content));
  yield put(expenseToolActions.setLoading());
}
function* getLeftAmount(action) {
  const states = yield select((state) => state.tool);

  const res = yield ApiRequest(`/tool/leftAmount`, "get", null, {
    toolId: states?.selectedTool,
    toolTypeId: action.payload,
  });

  // if(res.data == 0){
  //   WarningNotify("Birinchi kirim qo'shing!")
  // }

  yield put(expenseToolActions.setLeftAmount(res.data));
}
function* getCurrentDateTypes(action) {
  const states = yield select((state) => state.tool);
  const res = yield ApiRequest(`/expenseType/currentDateTypes`, "get", null);

  const newOptions = [
    { label: "Chiqim turlari", value: "" },
    ...(res.data?.map((item) => ({
      label: item.name + "(" + item.created_at + ")",
      value: item.id,
      key: item.id,
    })) || []),
  ];

  yield put(expenseToolActions.setCurrentDateTypes(newOptions));
}

function* handleSave(action) {
  const states = yield select((state) => state.expenseTool);
  const value = action.payload.value;

  if (value.expenseTypeId == "Chiqim turlari") {
    value.expenseTypeId = 0;
  }

  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    amount: value.amount,
    price: value.price,
    description: value.description,
    toolId: value.toolId?.value ?? value.toolId,
    toolTypeId: value.toolTypeId?.value ?? value.toolTypeId,
    expenseTypeId: value.expenseTypeId?.value ?? value.expenseTypeId,
  };

  let response;

  if (states.currentItm) {
    response = yield call(
      ApiRequest,
      `/expenseTool/${states.currentItm.id}`,
      "put",
      obj
    );
    if (response.status === 200) {
      // Check if the response is successful
      yield put(expenseToolActions.setCurrentItm(""));
    }
  } else {
    response = yield call(ApiRequest, "/expenseTool", "post", obj);
  }

  yield call(getExpenseTools);
  yield put(expenseToolActions.setModalVisible(false)); // Close the modal
}

function* delItem(action) {
  yield ApiRequest("/expenseTool/" + action.payload, "delete");
  yield call(getExpenseTools);
}

export function* expenseToolSaga() {
  yield takeEvery("expenseTool/getLeftAmount", getLeftAmount);
  yield takeEvery("expenseTool/getCurrentDateTypes", getCurrentDateTypes);
  yield takeEvery("expenseTool/getExpenseTools", getExpenseTools);
  yield takeEvery("expenseTool/handleSave", handleSave);
  yield takeEvery("expenseTool/handleDel", delItem);
}
