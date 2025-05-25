import { all, fork } from "redux-saga/effects";
import { toolSaga } from "../../Admin/AdminBlog/Redux/Sagas/ToolSaga";
import { toolTypeSaga } from "../../Admin/AdminToolType/Redux/Sagas/ToolTypeSaga";
import { expenseToolSaga } from "../../Admin/AdminExpenseTool/Redux/Sagas/ExpenseToolSaga";
import { incomeToolSaga } from "../../Admin/AdminIncomeTool/Redux/Sagas/IncomeToolSaga";
import { expenseCompanySaga } from "../../Admin/AdminExpenseCompany/Redux/Sagas/expenseCompanySaga";
import { expenseTypeSaga } from "../../Admin/AdminToolSaldo/Redux/Sagas/expenseTypeSaga";
import { workerSaga } from "../../Admin/AdminWorker/Redux/Sagas/WorkerSaga";
import { articleSaga } from "../../Admin/AdminArticle/Redux/Sagas/ArticleSaga";
import { boxSaga } from "../../Admin/AdminBox/Redux/Sagas/BoxSaga";
import { sewingSaga } from "../../Admin/AdminSewing/Redux/Sagas/SewingSaga";
import { cuttingSaga } from "../../Admin/AdminCutting/Redux/Sagas/CuttingSaga";
import { reportSaga } from "../../Admin/AdminSecondaryReport/Redux/Sagas/ReportSaga";
import { fabricIncomeSaga } from "../../Admin/Export/AdminFabricIncome/Redux/Sagas/FabricIncomeSaga";
import { bagSaga } from "../../Admin/Export/AdminBag/Redux/Sagas/BagSaga";
import { paintServSaga } from "../../Admin/Export/AdminPaintServ/Redux/Sagas/PaintServSaga";
import { paintedFabSaga } from "../../Admin/Export/AdminPaintedFab/Redux/Sagas/PaintedFabSaga";
import { storeFabSaga } from "../../Admin/Export/AdminStoreFab/Redux/Sagas/StoreFabSaga";
import { storeBagSaga } from "../../Admin/Export/AdminStoreBag/Redux/Sagas/StoreBagSaga";
import { exportBagSaga } from "../../Admin/Export/AdminExportBag/Redux/Sagas/ExportBagSaga";
import { orderFabSaga } from "../../Admin/Export/Orders/OrderFab/Redux/Sagas/OrderFabSaga";
import { orderLabSaga } from "../../Admin/Export/Orders/OrderLab/Redux/Sagas/OrderLabSaga";
import { orderBirkaSaga } from "../../Admin/Export/Orders/OrderBirka/Redux/Sagas/OrderBirkaSaga";
import { orderBoxSaga } from "../../Admin/Export/Orders/OrderBox/Redux/Sagas/OrderBoxSaga";
import { orderPackSaga } from "../../Admin/Export/Orders/OrderPack/Redux/Sagas/OrderPackSaga";
import { orderSewSaga } from "../../Admin/Export/Orders/OrderSewing/Redux/Sagas/OrderSewSaga";
import { printSaga } from "../../Admin/Export/AdminPrint/Redux/Sagas/PrintSaga";

export function* RootSaga() {
  try {
    yield all([
      fork(toolSaga),
      fork(toolTypeSaga),
      fork(expenseToolSaga),
      fork(incomeToolSaga),
      fork(expenseCompanySaga),
      fork(expenseTypeSaga),
      fork(workerSaga),
      fork(articleSaga),
      fork(boxSaga),
      fork(sewingSaga),
      fork(cuttingSaga),
      fork(reportSaga),
      fork(fabricIncomeSaga),
      fork(bagSaga),
      fork(paintServSaga),
      fork(paintedFabSaga),
      fork(storeFabSaga),
      fork(storeBagSaga),
      fork(exportBagSaga),
      fork(orderFabSaga),
      fork(orderLabSaga),
      fork(orderBirkaSaga),
      fork(orderBoxSaga),
      fork(orderPackSaga),
      fork(orderSewSaga),
      fork(printSaga),
    ]);
  } catch (error) {
    console.log(error);
  }
}
