import React from "react";
import { Breadcrumb, Layout, Menu, Typography, theme } from "antd";
import TableExpenseTool from "./TableTools/TableExpenseTool";
import Title from "antd/es/skeleton/Title";

export default function ExpenseTool() {
  const { Header, Content, Footer, Sider } = Layout;
  const { Title } = Typography;

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
          <Title>Uskunalar chiqimi</Title>
        </div>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <TableExpenseTool />
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
