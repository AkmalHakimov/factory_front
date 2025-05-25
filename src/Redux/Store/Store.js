import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { RootSaga } from "../ConnectionSagas/RootSaga";
import ToolReducer from "../../Admin/AdminBlog/Redux/Reducers/ToolReducer";
import ToolTypeReducer from "../../Admin/AdminToolType/Redux/Reducers/ToolTypeReducer";
import ExpenseToolReducer from "../../Admin/AdminExpenseTool/Redux/Reducers/ExpenseToolReducer";
import IncomeToolReducer from "../../Admin/AdminIncomeTool/Redux/Reducers/IncomeToolReducer";
import expenseCompanyReducer from "../../Admin/AdminExpenseCompany/Redux/Reducers/expenseCompanyReducer";
import ExpenseTypeReducer from "../../Admin/AdminToolSaldo/Redux/Reducers/ExpenseTypeReducer";
import WorkerReducer from "../../Admin/AdminWorker/Redux/Reducers/WorkerReducer";
import ArticleReducer from "../../Admin/AdminArticle/Redux/Reducers/ArticleReducer";
import BoxReducer from "../../Admin/AdminBox/Redux/Reducers/BoxReducer";
import SewingReducer from "../../Admin/AdminSewing/Redux/Reducers/SewingReducer";
import CuttingReducer from "../../Admin/AdminCutting/Redux/Reducers/CuttingReducer";
import ReportReducer from "../../Admin/AdminSecondaryReport/Redux/Reducers/ReportReducer";
import FabricIncomeReducer from "../../Admin/Export/AdminFabricIncome/Redux/Reducers/FabricIncomeReducer";
import BagReducer from "../../Admin/Export/AdminBag/Redux/Reducers/BagReducer";
import PaintServReducer from "../../Admin/Export/AdminPaintServ/Redux/Reducers/PaintServReducer";
import PaintedFabReducer from "../../Admin/Export/AdminPaintedFab/Redux/Reducers/PaintedFabReducer";
import StoreFabReducer from "../../Admin/Export/AdminStoreFab/Redux/Reducers/StoreFabReducer";
import StoreBagReducer from "../../Admin/Export/AdminStoreBag/Redux/Reducers/StoreBagReducer";
import ExportBagReducer from "../../Admin/Export/AdminExportBag/Redux/Reducers/ExportBagReducer";
import OrderFabReducer from "../../Admin/Export/Orders/OrderFab/Redux/Reducers/OrderFabReducer";
import OrderLabReducer from "../../Admin/Export/Orders/OrderLab/Redux/Reducers/OrderLabReducer";
import OrderBirkaReducer from "../../Admin/Export/Orders/OrderBirka/Redux/Reducers/OrderBirkaReducer";
import OrderBoxReducer from "../../Admin/Export/Orders/OrderBox/Redux/Reducers/OrderBoxReducer";
import OrderPackReducer from "../../Admin/Export/Orders/OrderPack/Redux/Reducers/OrderPackReducer";
import OrderSewReducer from "../../Admin/Export/Orders/OrderSewing/Redux/Reducers/OrderSewReducer";
import PrintReducer from "../../Admin/Export/AdminPrint/Redux/Reducers/PrintReducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    tool: ToolReducer,
    toolType: ToolTypeReducer,
    expenseTool: ExpenseToolReducer,
    incomeTool: IncomeToolReducer,
    expenseCompany: expenseCompanyReducer,
    expenseType: ExpenseTypeReducer,
    worker: WorkerReducer,
    article: ArticleReducer,
    box: BoxReducer,
    sewing: SewingReducer,
    cutting: CuttingReducer,
    report: ReportReducer,
    fabricIncome: FabricIncomeReducer,
    bag: BagReducer,
    paintServ: PaintServReducer,
    paintedFab: PaintedFabReducer,
    storeFab: StoreFabReducer,
    storeBag: StoreBagReducer,
    exportBag: ExportBagReducer,
    orderFab: OrderFabReducer,
    orderLab: OrderLabReducer,
    orderBirka: OrderBirkaReducer,
    orderBox: OrderBoxReducer,
    orderPack: OrderPackReducer,
    orderSew: OrderSewReducer,
    print: PrintReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore actions with non-serializable values
        ignoredActions: [
          "expenseTool/handleSave",
          "incomeTool/handleSave",
          "expenseCompany/handleSave",
          "expenseType/handleSave",
          "box/handleSave",
          "sewing/handleSave",
          "cutting/handleSave",
          "report/saveReportPie",
          "fabricIncome/handleSave",
          "bag/handleSave",
          "paintServ/handleSave",
          "paintedFab/handleSave",
          "storeFab/handleSave",
          "storeBag/handleSave",
          "eportBag/handleSave",
          "orderFab/handleSave",
          "orderLab/handleSave",
          "orderBirka/handleSave",
          "orderBox/handleSave",
          "orderPack/handleSave",
          "orderSew/handleSave",
          "print/handleSave",
        ],
        ignoredPaths: ["payload.value.createdAt"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(RootSaga);

export default store;
