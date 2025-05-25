import React from "react";
import { Breadcrumb, Layout, Menu, Typography, theme } from "antd";
import Title from "antd/es/skeleton/Title";
import TableOrderFab from "./TableTools/TableOrderFab";

export default function OrderFab() {
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
          <Title>Order Bo'z</Title>
        </div>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <TableOrderFab />
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
