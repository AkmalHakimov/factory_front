import { select, takeEvery, put, call } from "redux-saga/effects";
import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { boxActions } from "../Reducers/BoxReducer";
import dayjs from "dayjs";

function* getBoxes() {
  const states = yield select((state) => state.box);
  yield put(boxActions.setLoading());

  const dateVal = states.dateVal 
  ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
  : dayjs().format("YYYY-MM-DD");


  const res = yield ApiRequest(`/box`, "get", null,
   {
    page: states.page,
    search: states.searchInp,
    offset: states.pageSize,
    date: dateVal
  });

  yield put(boxActions.setTotalPages(res.data.totalElements));
  yield put(boxActions.setData(res.data.content));
  yield put(boxActions.setLoading());
}

function* handleSave(action) {


  const states = yield select((state) => state.box);
  const value = action.payload.value;

  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    boxContentCount: value.boxContentCount,
    orderNum: value.orderNum,
    boxCount: value.boxCount,
    articleId: value.articleId,
    workerId: value.workerId,
  };

  if (states.currentItm) {
    yield ApiRequest(`/box/` + states.currentItm.id, "put", obj);
    yield put(boxActions.setCurrentItm(""));
  } else {
    yield ApiRequest("/box", "post", obj);
  }
  yield call(getBoxes);
  yield put(boxActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequest("/box/" + action.payload, "delete");
  yield call(getBoxes);
}

export function* boxSaga() {
  yield takeEvery("box/getBoxes", getBoxes );
  yield takeEvery("box/handleSave", handleSave);
  yield takeEvery("box/handleDel", delItem );
}
