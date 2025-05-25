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
import TableStore from "./TableReport/TableStore";      


import Title from "antd/es/skeleton/Title";
import "../AdminReport/Report.scss";

export default function Store() {
  const { Header, Content, Footer, Sider } = Layout;
  const { Title } = Typography;

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
          <Title>Ombor</Title>
          <TableStore />
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
