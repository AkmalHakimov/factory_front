import { select, takeEvery, put, call } from "redux-saga/effects";
import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { workerActions } from "../Reducers/WorkerReducer";


function* getWorkers() {
  const states = yield select((state) => state.worker);
  yield put(workerActions.setLoading());
  const res = yield ApiRequest(`/worker`, "get", null,
   {
    page: states.page,
    search: states.searchInp,
    offset: states.pageSize,
  }
  );
  yield put(workerActions.setTotalPages(res.data.totalElements));
  yield put(workerActions.setData(res.data.content));
  yield put(workerActions.setLoading());
}

function* getAll() {
  const res = yield ApiRequest(`/worker/all`, "get", null,);

  const newOptions = [
    { label: "Mavjud ishchilar", value: "" },
    ...(res.data?.map((item) => ({
      label: item.firstName + item.lastName,
      value: item.id,
      key: item.id,
    })) || []),
  ]

  yield put(workerActions.setWorkerOptions(newOptions));
}

function* handleSave(action) {
  const states = yield select((state) => state.worker);
  const value = action.payload.value;
  let obj = {
    firstName: value.firstName,
    lastName: value.lastName,
    sacked: value.sacked,
    role: value.role,
  };
  if (states.currentItm) {
    yield ApiRequest(`/worker/` + states.currentItm.id, "put", obj);
    yield put(workerActions.setCurrentItm(""));
  } else {
    yield ApiRequest("/worker", "post", obj);
  }
  yield call(getWorkers);
  yield put(workerActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequest("/worker/" + action.payload, "delete");
  yield call(getWorkers);
}

export function* workerSaga() {
  yield takeEvery("worker/getWorkers", getWorkers );
  yield takeEvery("worker/getAll", getAll );
  yield takeEvery("worker/handleSave", handleSave);
  yield takeEvery("worker/handleDel", delItem );
}
