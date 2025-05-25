import { select, takeEvery, put, call } from "redux-saga/effects";
import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { toolTypeActions } from "../Reducers/ToolTypeReducer";
function* getToolTypes() {
  const states = yield select((state) => state.toolType);
  yield put(toolTypeActions.setLoading());
  const res = yield ApiRequest(`/toolType`, "get", null,
   {
    page: states.searchInp ? 1 : states.page,
    search: states.searchInp,
    offset: states.pageSize,
  }
  );
  yield put(toolTypeActions.setTotalPages(res.data.totalElements));
  yield put(toolTypeActions.setData(res.data.content));
  yield put(toolTypeActions.setLoading());
}

function* HandleSave() {
  const states = yield select((state) => state.toolType);
  if (states.currentItm) {
    yield ApiRequest("/toolType/" + states.currentItm.id, "put", {
      name: states.nameInp,
    });
    yield put(toolTypeActions.setCurrentItm(""));
  } else {
    yield ApiRequest("/toolType", "post", {
      name: states.nameInp,
    });
  }
  yield call(getToolTypes);
  yield put(toolTypeActions.setName(""));
  yield put(toolTypeActions.setTypeModalVisible());
}

function* handleDel(action) {
  yield ApiRequest(`/toolType/${action.payload}`, "delete");
  yield call(getToolTypes);
}

function* handleEdit(action) {
  yield put(toolTypeActions.setTypeModalVisible());
  yield put(toolTypeActions.setName(action.payload.name));
  yield put(toolTypeActions.setCurrentItm(action.payload));
}

export function* toolTypeSaga() {
  yield takeEvery("toolType/getToolTypes", getToolTypes);
  yield takeEvery("toolType/handleSave", HandleSave);
  yield takeEvery("toolType/delItem", handleDel);
  yield takeEvery("toolType/handleEdit", handleEdit);
}
