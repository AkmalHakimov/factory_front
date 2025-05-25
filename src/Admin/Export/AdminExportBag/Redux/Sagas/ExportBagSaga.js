import { select, takeEvery, put, call } from "redux-saga/effects";
// import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { exportBagActions } from "../Reducers/ExportBagReducer";
import ApiRequestSec from "../../../../../configure/ApiRequestorSec/ApiRequestSec";
import dayjs from "dayjs";

function* getExportBags() {
  const states = yield select((state) => state.exportBag);
  yield put(exportBagActions.setLoading());
  const res = yield ApiRequestSec(`/exportBag`, "get", null, {
    page: states.page,
    search: states.searchInp,
    offset: states.pageSize,
  });
  yield put(exportBagActions.setTotalPages(res.data.totalElements));
  yield put(exportBagActions.setData(res.data.content));
  yield put(exportBagActions.setLoading());
}
function* getFabOptions() {
  const res = yield ApiRequestSec(`/orderFab/all`, "get");

  const newOptions = [
    { label: "Sumka order", value: "" },
    ...(res.data?.map((item) => ({
      label: item.orderNum,
      value: item.id,
      key: item.id,
    })) || []),
  ];
  yield put(exportBagActions.setFabOptions(newOptions));
}

function* handleSave(action) {
  const states = yield select((state) => state.exportBag);
  const value = action.payload.value;
  let obj = {
    createdAt: dayjs(value.createdAt).format("YYYY-MM-DD"),
    label: value.label,
    birka: value.birka,
    amount: value.amount,
    costBagPrice: value.costBagPrice,
    bagExportPrice: value.bagExportPrice,
    orderFabId: value.orderFabId?.value ?? value.orderFabId,
  };
  if (states.currentItm) {
    yield ApiRequestSec(`/exportBag/` + states.currentItm.id, "put", obj);
    yield put(exportBagActions.setCurrentItm(""));
  } else {
    yield ApiRequestSec("/exportBag", "post", obj);
  }
  yield call(getExportBags);
  yield put(exportBagActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequestSec("/exportBag/" + action.payload, "delete");
  yield call(getExportBags);
}

export function* exportBagSaga() {
  yield takeEvery("exportBag/getExportBags", getExportBags);
  yield takeEvery("exportBag/getFabOptions", getFabOptions);
  yield takeEvery("exportBag/handleSave", handleSave);
  yield takeEvery("exportBag/handleDel", delItem);
}
