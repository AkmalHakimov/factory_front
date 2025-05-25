import "./index.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import HomeAdmin from "./Admin/HomeAdmin/HomeAdmin";
import axios from "axios";
import { BASE_URL } from "./configure/ApiRequestor/ApiRequest";
import { useEffect } from "react";
import NotFound from "./pages/404/NotFound";
import Tools from "./Admin/AdminBlog/Tools";
import ToolType from "./Admin/AdminToolType/ToolType";
import ExpenseTool from "./Admin/AdminExpenseTool/ExpenseTool";
import IncomeTool from "./Admin/AdminIncomeTool/IncomeTool";
import ExpenseCompany from "./Admin/AdminExpenseCompany/ExpenseCompany";
import Report from "./Admin/AdminReport/Report";
import Dashboard from "./Admin/Dashboard/Dashboard";
import ExpenseType from "./Admin/AdminToolSaldo/ExpenseType";
import Worker from "./Admin/AdminWorker/Worker";
import Article from "./Admin/AdminArticle/Article";
import Box from "./Admin/AdminBox/Box";
import Sewing from "./Admin/AdminSewing/Sewing";
import Cutting from "./Admin/AdminCutting/Cutting";
import WorkerReport from "./Admin/AdminWorkerReport/WorkerReport";
import CuttingReport from "./Admin/AdminCuttingReport/CuttingReport";
import SecondaryReport from "./Admin/AdminSecondaryReport/SecondaryReport";
import Store from "./Admin/AdminStore/Store";
import FabricIncome from "./Admin/Export/AdminFabricIncome/FabricIncome";
import Bag from "./Admin/Export/AdminBag/Bag";
import PaintServ from "./Admin/Export/AdminPaintServ/PaintServ";
import PaintedFab from "./Admin/Export/AdminPaintedFab/PaintedFab";
import StoreFab from "./Admin/Export/AdminStoreFab/StoreFab";
import StoreBag from "./Admin/Export/AdminStoreBag/StoreBag";
import ExportBag from "./Admin/Export/AdminExportBag/ExportBag";
import OrderFab from "./Admin/Export/Orders/OrderFab/OrderFab";
import OrderLab from "./Admin/Export/Orders/OrderLab/OrderLab";
import OrderBirka from "./Admin/Export/Orders/OrderBirka/OrderBirka";
import OrderBox from "./Admin/Export/Orders/OrderBox/OrderBox";
import OrderPack from "./Admin/Export/Orders/OrderPack/OrderPack";
import OrderSew from "./Admin/Export/Orders/OrderSewing/OrderSew";
import Print from "./Admin/Export/AdminPrint/Print";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  function securityFrontend() {
    if (location.pathname.startsWith("/admin")) {
      if (localStorage.getItem("access_token") !== null) {
        axios({
          url: BASE_URL + "api/user/me",
          method: "get",
          headers: {
            Authorization: localStorage.getItem("access_token"),
          },
        })
          .then((res) => {
            let s = res.data.roles.filter(
              (item) => item.roleName === "ROLE_ADMIN"
            )[0];
            if (!s) {
              navigate("/404");
            }
          })
          .catch((err) => {
            navigate("/login");
          });
      } else {
        navigate("/404");
      }
    }
  }

  // useEffect(()=>{
  //   securityFrontend()
  // },[location.pathname])
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeAdmin />}>
          <Route path="/uskunalar" element={<Tools />} />
          <Route path="/uskunalar turlari" element={<ToolType />} />
          <Route path="/uskunalar chiqimi" element={<ExpenseTool />} />
          <Route path="/uskunalar kirimi" element={<IncomeTool />} />
          <Route path="/store" element={<Store />} />
          <Route path="/chiqim turlari" element={<ExpenseType></ExpenseType>} />
          <Route
            path="/korxona chiqimi"
            element={<ExpenseCompany></ExpenseCompany>}
          />
          <Route path="/hisobot" element={<Report></Report>} />
          <Route path="/dashboard" element={<Dashboard></Dashboard>} />
          <Route path="/workers" element={<Worker></Worker>} />
          <Route path="/article" element={<Article></Article>} />
          <Route path="/box" element={<Box></Box>} />
          <Route path="/sewing" element={<Sewing></Sewing>} />
          <Route path="/cutting" element={<Cutting></Cutting>} />
          <Route path="/fabricIncome" element={<FabricIncome></FabricIncome>} />
          <Route path="/bag" element={<Bag></Bag>} />
          <Route path="/workerReport" element={<WorkerReport></WorkerReport>} />
          <Route
            path="/secondaryReport"
            element={<SecondaryReport></SecondaryReport>}
          />
          <Route
            path="/cuttingReport"
            element={<CuttingReport></CuttingReport>}
          />

          <Route
            path="/paintServ"
            element={<PaintServ></PaintServ>}
          />
          <Route
            path="/paintedFabric"
            element={<PaintedFab></PaintedFab>}
          />
          <Route
            path="/storeFabric"
            element={<StoreFab></StoreFab>}
          />
           <Route
            path="/storeBag"
            element={<StoreBag></StoreBag>}
          />
           <Route
            path="/exportBag"
            element={<ExportBag></ExportBag>}
          />
           <Route
            path="/orderFab"
            element={<OrderFab></OrderFab>}
          />
           <Route
            path="/orderLab"
            element={<OrderLab></OrderLab>}
          />
           <Route
            path="/orderBirka"
            element={<OrderBirka></OrderBirka>}
          />
           <Route
            path="/orderBox"
            element={<OrderBox></OrderBox>}
          />
           <Route
            path="/orderPack"
            element={<OrderPack></OrderPack>}
          />
           <Route
            path="/orderSewing"
            element={<OrderSew></OrderSew>}
          />
           <Route
            path="/print"
            element={<Print></Print>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
