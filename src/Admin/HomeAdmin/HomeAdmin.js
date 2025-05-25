import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineArticle } from "react-icons/md";
import { MdOutlineAudioFile } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { IoHomeOutline, IoTimeOutline } from "react-icons/io5";
import { PiBookOpen } from "react-icons/pi";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const HomeAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
 

  function handleClickMenu(item) {
    navigate(item.key);
  }
  return (
    <>
      <Header style={{display: "flex", justifyContent: "center",alignItems: "center", color: "white" }}><h1>BOSSO TEKS</h1></Header>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={[""]}
            mode="inline"
            onClick={(item) => handleClickMenu(item)}
            items={[
              // {
              //   label: "Dashboard",
              //   key: "dashboard",
              //   icon: <IoHomeOutline />              
              // },
              {
                label: "Asosiy",
                key: "main",
                icon: <IoHomeOutline />,
                children: [
                  // {
                  //   label: "Dashboard",
                  //   key: "deshboard",
                  //   icon: <PiBookOpen />,
                  // },
                  {
                    label: "Uskunalar",
                    key: "uskunalar",
                    icon: <PiBookOpen />,
                  },
                  {
                    label: "Uskunalar kirimi",
                    key: "uskunalar kirimi",
                    icon: <MdOutlineArticle />,
                  },
                  {
                    label: "Uskunalar chiqimi",
                    key: "uskunalar chiqimi",
                    icon: <PiBookOpen />,
                  },
                  {
                    label: "Uskunalar turlari",
                    key: "uskunalar turlari",
                    icon: <MdOutlineArticle />,
                  },
                  {
                    label: "Ombor",
                    key: "store",
                    icon: <MdOutlineArticle />,
                  },
                  {
                    label: "Chiqim turlari",
                    key: "chiqim turlari",
                    icon: <MdOutlineArticle />,
                  },
                  {
                    label: "Hisobot",
                    key: "hisobot",
                    icon: <MdOutlineArticle />,
                  },
                  {
                    label: "Asosiy Xarajatlar",
                    key: "secondaryReport",
                    icon: <MdOutlineArticle />,
                  }
        
                ],
              },
              {
                label: "Ishchilar",
                key: "workers",   
                icon: <FaRegUser />,
                children: [
                  {
                    label: "Ishchilar ro'yxati",
                    key: "workers",
                    icon: <CgProfile />,
                  },
                  {
                    label: "Artikul",
                    key: "article",
                    icon: <FaUserEdit />,
                  },
                  {
                    label: "Karobka",
                    key: "box",
                    icon: <FaUserEdit />,
                  },
                  {
                    label: "Tikish",
                    key: "sewing",
                    icon: <FaUserEdit />,
                  },
                  {
                    label: "Qirqish, bichish",
                    key: "cutting",
                    icon: <FaUserEdit />,
                  },

                  {
                    label: "Tikish hisobot",
                    key: "workerReport",
                    icon: <FaUserEdit />,
                  },
                  {
                    label: "Qirqish,bichish hisobot",
                    key: "cuttingReport",
                    icon: <FaUserEdit />,
                  },
                ],
              },
              {
                label: "Eksport Ombor",
                key: "export",   
                icon: <FaRegUser />,
                children: [
                  {
                    label: "Bo'z kirim",
                    key: "fabricIncome",
                    icon: <CgProfile />,
                  },
                  {
                    label: "Ishlab chiqarish sumka",
                    key: "bag",
                    icon: <CgProfile />,
                  },
                  {
                    label: "Bo'yash xizmati",
                    key: "Paingting service",
                    icon: <CgProfile />,
                    children: [
                      {
                        label: "Asosiy",
                        key: "paintServ",
                        icon: <CgProfile />,
                      },
                      {
                        label: "Qabul qilib olingan bo'yalgan mato",
                        key: "paintedFabric",
                        icon: <CgProfile />,
                      },
                    ]
                  },
                  {
                    label: "Ombor Mato",
                    key: "storeFabric",
                    icon: <CgProfile />,
                  },
                  {
                    label: "Ombor Sumka",
                    key: "storeBag",
                    icon: <CgProfile />,
                  },
                  {
                    label: "Eksport sumka",
                    key: "exportBag",
                    icon: <CgProfile />,
                  },
                  {
                    label: "Print xizmati",
                    key: "print",
                    icon: <CgProfile />,
                  },
                  {
                    label: "Orders",
                    key: "Orders",
                    icon: <CgProfile />,
                    children: [
                      {
                        label: "Bo'z",
                        key: "orderFab",
                        icon: <CgProfile />,
                      },
                      {
                        label: "Etiketka",
                        key: "orderLab",
                        icon: <CgProfile />,
                      },
                      {
                        label: "Birka",
                        key: "orderBirka",
                        icon: <CgProfile />,
                      },
                      {
                        label: "Karobka",
                        key: "orderBox",
                        icon: <CgProfile />,
                      },
                      {
                        label: "ЦЕЛОФАН",
                        key: "orderPack",
                        icon: <CgProfile />,
                      },
                      {
                        label: "Tikish ipi",
                        key: "orderSewing",
                        icon: <CgProfile />,
                      },
                    ]
                  },
                ],
              }
            ]}
          />
        </Sider>
        <Outlet></Outlet>
      </Layout>
    </>
  );
};
export default HomeAdmin;
