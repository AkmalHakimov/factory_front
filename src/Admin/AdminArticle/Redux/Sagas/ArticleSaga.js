import { select, takeEvery, put, call } from "redux-saga/effects";
import ApiRequest from "../../../../configure/ApiRequestor/ApiRequest";
import { articleActions } from "../Reducers/ArticleReducer";

function* getArticles() {
  const states = yield select((state) => state.article);
  yield put(articleActions.setLoading());
  const res = yield ApiRequest(`/article`, "get", null, {
    page: states.page,
    search: states.searchInp,
    offset: states.pageSize,
  });
  yield put(articleActions.setTotalPages(res.data.totalElements));
  yield put(articleActions.setData(res.data.content));
  yield put(articleActions.setLoading());
}

function* getAll() {
  const res = yield ApiRequest(`/article/all`, "get", null,);

  const newOptions = [
    { label: "Artikul turlari", value: "" },
    ...(res.data?.map((item) => ({
      label: item.name,
      value: item.id,
      key: item.id,
    })) || []),
  ]

  yield put(articleActions.setArticleOptions(newOptions));
}

function* handleSave(action) {
  const states = yield select((state) => state.article);
  const value = action.payload.value;
  let obj = {
    name: value.name,
    width: value.width,
    height: value.height,
    sideNum: value.sideNum,
    betPrice: value.betPrice,
    cuttingPrice: value.cuttingPrice,
    packPrice: value.packPrice,
    yarnPrice: value.yarnPrice,
    chipPrice: value.chipPrice,
    cleaningPrice: value.cleaningPrice,
    buttonOpenPrice: value.buttonOpenPrice,
    yarnOpenPrice: value.yarnOpenPrice,
    blueLabelPrice: value.blueLabelPrice,
    labelPrice: value.labelPrice,
    yellowChipPrice: value.yellowChipPrice,
    plankPrice: value.plankPrice,
    makePackPrice: value.makePackPrice,
  };
  if (states.currentItm) {
    yield ApiRequest(`/article/` + states.currentItm.id, "put", obj);
    yield put(articleActions.setCurrentItm(""));
  } else {
    yield ApiRequest("/article", "post", obj);
  }
  yield call(getArticles);
  yield put(articleActions.setModalVisible());
}

function* delItem(action) {
  yield ApiRequest("/article/" + action.payload, "delete");
  yield call(getArticles);
}

export function* articleSaga() {
  yield takeEvery("article/getArticles", getArticles);
  yield takeEvery("article/getAll", getAll);
  yield takeEvery("article/handleSave", handleSave);
  yield takeEvery("article/handleDel", delItem);
}
