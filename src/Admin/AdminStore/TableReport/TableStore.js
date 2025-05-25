import React, { useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux";
import {
  Button,
  Modal,
  Input,
  Popconfirm,
  Table,
  Checkbox,
  Form,
  Select,
  Card,
  Col,
  Row,
  Statistic,
  theme,
  Typography,
  DatePicker,
} from "antd";
import "./TableReport.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolActions } from "../../AdminBlog/Redux/Reducers/ToolReducer";
import DownloadExcel from "../../../utils/DownloadExcel/DownloadExcel";
import { Pie, DualAxes } from "@ant-design/plots";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { reportActions } from "../../AdminSecondaryReport/Redux/Reducers/ReportReducer";

const TableStore = (props) => {
  useEffect(() => {
    props.getStoreReports();
  }, []);

  const { Title, Paragraph, Text, Link } = Typography;

  const toolStates = useSelector((state) => state.tool);

  function formatNumber(num) {
    if (num == null) {
      return "0"; // or any placeholder you prefer, like an empty string
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatNumberForPie(num) {
    if (num == null) {
      return "0"; // or any placeholder you prefer, like an empty string
    }

    // Convert the number to a string
    let numStr = num.toString();

    // Keep only the first 6 digits
    if (numStr.length > 6) {
      numStr = numStr.slice(0, 9);
    }

    // Add commas as thousands separators
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [form] = Form.useForm();

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      width: "10%",
      // render: (index) => (props.pageSize * (props.page - 1)) + (index + 1),
    },
    {
      title: "Uskuna nomi",
      dataIndex: "toolName",
    },
    {
      title: "Uskuna turi",
      dataIndex: "toolTypeName",
    },
    {
      title: "Umumiy kirim",
      dataIndex: "totalIncomeAmount",
      render: (text) => formatNumber(text),
    },
    {
      title: "Umumiy chiqim",
      dataIndex: "totalExpenseAmount",
      render: (text) => formatNumber(text),
    },
    {
      title: "Qoldiq",
      dataIndex: "leftAmount",
      render: (text) => formatNumber(text),
    },
  ];

  const handleDateChange = (date, item) => {
    props.setStoreDateVal(item);

    props.getStoreReports();
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center">
          <Button onClick={DownloadExcel} type="primary">
            Download Excel
          </Button>

          <DatePicker
            format={{
              format: "DD-MM-YYYY",
              type: "mask",
            }}
            // defaultValue={getOneMonthAgo()}
            onChange={handleDateChange}
            style={{
              width: "100%",
              margin: "10px",
            }}
          />
        </div>
        <div>
          <Input
            value={props.searchInp}
            onChange={(e) => {
              props.setSearchInp(e.target.value);
              props.getStoreReports();

              // props.getTools();
            }}
            placeholder="search by name"
          ></Input>
        </div>
      </div>
      <Table
        pagination={{
          pageSize: 6,
          total: props.totalPages,
          onChange: (page) => {
            props.setPage(page);
            props.getStoreReports();
          },
        }}
        loading={props.loading}
        bordered
        dataSource={props.storeReports.map((item) => ({
          ...item,
          key: item.id, // Assuming 'id' is a unique identifier for each item
          // Other properties...
        }))}
        columns={columns}
      />
    </div>
  );
};
export default connect((state) => state.report, reportActions)(TableStore);
