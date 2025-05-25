import {React,useEffect} from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  Typography,
  theme,
  Card,
  Col,
  Row,
  Statistic,
} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { connect, useDispatch, useSelector } from "react-redux";
import { Pie } from '@ant-design/plots';
import { toolActions } from "../AdminBlog/Redux/Reducers/ToolReducer";
import { reportActions } from "./Redux/Reducers/ReportReducer";



import Title from "antd/es/skeleton/Title";
import TableReport from "./TableSecondaryReport/TableSecondaryReport";
import TableSecondaryReport from "./TableSecondaryReport/TableSecondaryReport";
import "../AdminReport/Report.scss";

export default function SecondaryReport() {
  const { Header, Content, Footer, Sider } = Layout;
  const { Title } = Typography;
  const reportStates = useSelector((state) => state.report);


  useEffect(() => {
    toolActions.getPieReport();
  }, [reportStates?.totalExpensePriceSum]);

  
  const toolStates = useSelector((state) => state.tool);
  const config = {
    // data: [
    //   { type: 'Salfetka', value: toolStates.pieReport.salfetkaTotal },
    //   { type: 'Sumka', value:  toolStates.pieReport.sumkaTotal},
    //   { type: 'Choyshab', value:  toolStates.pieReport.choyshabTotal  },
    // ],
    data: [
      { type: 'Salfetka', value: 10 },
      { type: 'Sumka', value:  20},
      { type: 'Choyshab', value: 30  },
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
     
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Content
        style={{
          margin: "0 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            paddingTop: 10,
          }}
        >
          <Title>Hisobotlar</Title>
        </div>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Row className="my-3" gutter={16}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Kirim"
                  value={toolStates.totalStatistic?.totalIncomeAmount}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  // suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Asosiy xarajatlar chiqimi"
                  value={reportStates?.totalExpensePriceSum}
                  precision={2}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<ArrowDownOutlined />}
                  // suffix="%"
                />
              </Card>
            </Col>
          </Row>

      

          <TableSecondaryReport />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer>
    </Layout>
  );
}
