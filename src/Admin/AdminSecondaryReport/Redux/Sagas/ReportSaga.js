import { select, takeEvery, put, call } from "redux-saga/effects";
import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
// import { incomeToolActions } from "../Reducers/IncomeToolReducer";
import { reportActions } from "../Reducers/ReportReducer";
import dayjs from "dayjs";
import { SuccessNotify } from "../../../../utils/SuccessNotify/SuccessNotify";
import { ErrorNotify } from "../../../../utils/ErrorNotify/ErrorNotify";
import { WarningNotify } from "../../../../utils/WarningNotify/WarningNotify";

function* getReports() {
  const states = yield select((state) => state.report);
  yield put(reportActions.setLoading());

  const res = yield ApiRequest(`/report/secondary`, "get", null, {
    page: states.page,
    search: states.searchInp,
    offset: states.pageSize,
    date: states.dateVal 
    ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
    : dayjs().format("YYYY-MM-DD")
  });

  yield put(reportActions.setTotalPages(res.data.totalElements));

  let s = 0;
  for (let i = 0; i < res.data.content.length; i++) {
    s += res.data.content[i]?.totalExpensePrice || 0;
  }

  yield put(reportActions.setTotalExpensePriceSum(s));

  yield put(reportActions.setReportSecondary(res.data.content));
  yield put(reportActions.setLoading());
}
function* getStoreReports() {
  const states = yield select((state) => state.report);
  yield put(reportActions.setLoading());

  const res = yield ApiRequest(`/report/store`, "get", null, {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
    date: states.dateVal 
    ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
    : dayjs().format("YYYY-MM-DD")
  });

  yield put(reportActions.setTotalPages(res.data.totalElements));
  yield put(reportActions.setStoreReports(res.data.content));
  yield put(reportActions.setLoading());
}

function* saveReportPie(action) {
  const states = yield select((state) => state.report);
  if (states.createdAt == "") {
    WarningNotify("Qiymat kiritilsin!");
    return;
  }

  const parsedDate = dayjs(states.createdAt, "DD-MM-YYYY");

  console.log(dayjs(parsedDate).format("YYYY-MM-DD"));

  let obj = {
    createdAt: dayjs(parsedDate).format("YYYY-MM-DD"),
    monthDateNum: states.dateNum,
    dateNumSal: parseInt(states.salDateNum, 10),
    dateNumChoy: parseInt(states.choyDateNum, 10),
    dateNumSumka: parseInt(states.sumDateNum, 10),
  };
  yield ApiRequest(`/report`, "post", obj);
  SuccessNotify("done!");
}

// function* delItem(action) {
//   yield ApiRequest("/incomeTool/" + action.payload, "delete");
//   yield call(getIncomeTools);
// }

export function* reportSaga() {
  yield takeEvery("report/getReports", getReports);
  yield takeEvery("report/getStoreReports", getStoreReports);
  yield takeEvery("report/saveReportPie", saveReportPie);
  // yield takeEvery("incomeTool/handleDel", delItem );
}
