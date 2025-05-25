import React, { useEffect, useState, useRef } from "react";
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
import { reportActions } from "../Redux/Reducers/ReportReducer";
import DownloadExcel from "../../../utils/DownloadExcel/DownloadExcel";
import { Pie, DualAxes } from "@ant-design/plots";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import ApiRequest from "../../../configure/ApiRequestor/ApiRequest";

const TableSecondaryReport = (props) => {
  useEffect(() => {
    props.getReports();
    // props.getPieReport();
  }, []);

  const { Title, Paragraph, Text, Link } = Typography;

  const uvBillData = [
    { time: "2019-03", value: 350, type: "uv" },
    { time: "2019-04", value: 900, type: "uv" },
    { time: "2019-05", value: 300, type: "uv" },
    { time: "2019-06", value: 450, type: "uv" },
    { time: "2019-07", value: 470, type: "uv" },
    { time: "2019-03", value: 220, type: "bill" },
    { time: "2019-04", value: 300, type: "bill" },
    { time: "2019-05", value: 250, type: "bill" },
    { time: "2019-06", value: 220, type: "bill" },
    { time: "2019-07", value: 362, type: "bill" },
  ];

  const transformData = [
    { time: "2019-03", count: 800, name: "a" },
    { time: "2019-04", count: 600, name: "a" },
    { time: "2019-05", count: 400, name: "a" },
    { time: "2019-06", count: 380, name: "a" },
    { time: "2019-07", count: 220, name: "a" },
    { time: "2019-03", count: 750, name: "b" },
    { time: "2019-04", count: 650, name: "b" },
    { time: "2019-05", count: 450, name: "b" },
    { time: "2019-06", count: 400, name: "b" },
    { time: "2019-07", count: 320, name: "b" },
    { time: "2019-03", count: 900, name: "c" },
    { time: "2019-04", count: 600, name: "c" },
    { time: "2019-05", count: 450, name: "c" },
    { time: "2019-06", count: 300, name: "c" },
    { time: "2019-07", count: 200, name: "c" },
  ];

  const [editableStr, setEditableStr] = useState("This is an editable text.");

  const configDual = {
    xField: "time",
    children: [
      {
        data: uvBillData,
        type: "interval",
        yField: "value",
        colorField: "type",
        group: true,
        style: { maxWidth: 80 },
        interaction: { elementHighlightByColor: { background: true } },
      },
      {
        data: transformData,
        type: "line",
        yField: "count",
        colorField: "name",
        style: { lineWidth: 2 },
        axis: { y: { position: "right" } },
        scale: { series: { independent: true } },
        interaction: {
          tooltip: {
            crosshairs: false,
            marker: false,
          },
        },
      },
    ],
  };

  const reportStates = useSelector((state) => state.report);

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
      numStr = numStr.slice(0, 6);
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
      title: "Ismi",
      dataIndex: "name",
    },
    {
      title: "Marka",
      dataIndex: "marka",
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
      title: "Umumiy Chiqim narxi",
      dataIndex: "totalIncomePrice",
      render: (text) => formatNumber(text),
    },
    {
      title: "Umumiy Chiqim narxi(chiqim narxi bn)",
      dataIndex: "totalExpensePrice",
      render: (text) => formatNumber(text),
    },
    // {
    //   title: "%",
    //   dataIndex: "totalExpensePrice",
    //   render: (text) => {
    //     const total = toolStates.totalStatistic?.totalExpensePrice;
    //     const percentage = (text / total) * 100;
    //     return `${formatNumber(percentage.toFixed(3))}%`;
    //   },
    // },
  ];
  const columnsOfOneToolReport = [
    {
      title: "#",
      dataIndex: "id",
      width: "10%",
      // render: (index) => (props.pageSize * (props.page - 1)) + (index + 1),
    },
    {
      title: "Ismi",
      dataIndex: "name",
    },
    {
      title: "Chiqim miqdori",
      dataIndex: "amount",
      render: (text) => formatNumber(text),
    },
    {
      title: "Chiqim narxi",
      dataIndex: "price",
      render: (text) => formatNumber(text),
    },
    {
      title: "Umumiy chiqim narxi",
      dataIndex: "totalExpense",
      render: (text) => formatNumber(text),
    },
    {
      title: "Umumiy narxi",
      dataIndex: "totalIncome",
      render: (text) => formatNumber(text),
    },
    {
      title: "Nisbat",
      dataIndex: "ratio",
      render: (text) => formatNumber(text.toFixed(3)),
    },
    // {
    //   title: "%",
    //   dataIndex: "totalExpense",
    //   render: (text) => {
    //     const percentage = (text / total) * 100;
    //     return `${formatNumber(percentage.toFixed(3))}%`;
    //   },
    // },
  ];

  const isPieReportLoaded = true;

  function getTotalExpense() {
    props.oneToolReports.map((item, index) => {});

    let s = 0;
    for (let index = 0; index < props.oneToolReports.length; index++) {
      s += props.oneToolReports[index].totalExpense;
    }
    return s;
  }

  function calculatePieBalance(item) {
    const total = props.totalExpensePriceSum;
    return formatNumberForPie((item * total) / props.dateNum);
  }

  // function saveReportPie() {

  //   let obj = {
  //     createdAt: dayjs(reportStates.createdAt).format("DD-MM-YYYY"),
  //     monthDateNum: reportStates.dateNum,
  //     dateNumSal: parseInt(reportStates.salDateNum),
  //     dateNumChoy: parseInt(reportStates.choyDateNum),
  //     dateNumSumka: parseInt(reportStates.sumDateNum)
  //   };
  //   ApiRequest(`/report/`, "post", obj);
  // }

  const handleDateChange = (date, item) => {
    props.setDateVal(item);

    props.getReports();
  };

  return (
    <div>
      <div className="d-flex gap-5">
        <div style={{ width: 300, height: 300 }}>
          <div
            className="d-flex gap-5 align-items-center"
            style={{ width: "1000px" }}
          >
            <h3>Input dateNum here: </h3>
            <Paragraph
              style={{ marginBottom: 0 }}
              editable={{ onChange: (e) => props.setDateNum(e) }}
            >
              <strong style={{ color: "green", fontSize: "30px" }}>
                {props.dateNum}
              </strong>
            </Paragraph>
          </div>
          <div
            className="d-flex gap-5 align-items-center"
            style={{ width: "1000px" }}
          >
            <h3>Salfetka: </h3>
            <Paragraph
              style={{ marginBottom: 0 }}
              editable={{ onChange: (e) => props.setSalDateNum(e) }}
            >
              <strong style={{ color: "green", fontSize: "30px" }}>
                {props.salDateNum}
              </strong>
            </Paragraph>
            <h3>Qiymat: {calculatePieBalance(props.salDateNum)}</h3>
          </div>
          <div
            className="d-flex gap-5 align-items-center"
            style={{ width: "1000px" }}
          >
            <h3>Choyshab: </h3>
            <Paragraph
              style={{ marginBottom: 0 }}
              editable={{ onChange: (e) => props.setChoyDateNum(e) }}
            >
              <strong style={{ color: "green", fontSize: "30px" }}>
                {props.choyDateNum}
              </strong>
            </Paragraph>
            <h3>Qiymat: {calculatePieBalance(props.choyDateNum)}</h3>
          </div>
          <div
            className="d-flex gap-5 align-items-center"
            style={{ width: "1000px" }}
          >
            <h3>Sumka: </h3>
            <Paragraph
              style={{ marginBottom: 0 }}
              editable={{ onChange: (e) => props.setSumDateNum(e) }}
            >
              <strong style={{ color: "green", fontSize: "30px" }}>
                {props.sumDateNum}
              </strong>
            </Paragraph>
            <h3>Qiymat: {calculatePieBalance(props.sumDateNum)}</h3>
          </div>
          <DatePicker
            format={{
              format: "DD-MM-YYYY",
              type: "mask",
            }}
            onChange={(date, item) => {
              props.setCreatedAt(item);
            }}
            style={{
              width: "100%",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          />
          <div>
            <button onClick={props.saveReportPie} className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
        <div></div>
        {/* <DualAxes {...configDual}></DualAxes> */}
      </div>

      {/* {isPieReportLoaded ? (
       
      ) : (
        <div>Loading pie chart...</div>
      )} */}
      <div className="d-flex justify-content-between align-items-center">
        <div
          style={{ width: 600 }}
          className="d-flex align-items-center justify-content-between"
        >
          <Button
            onClick={DownloadExcel}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
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
              props.getReports();
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
            props.getReports();
          },
        }}
        loading={props.loading}
        bordered
        dataSource={props.reportSecondary.map((item) => ({
          ...item,
          key: item.id, // Assuming 'id' is a unique identifier for each item
          // Other properties...
        }))}
        columns={columns}
      />
    </div>
  );
};
export default connect(
  (state) => state.report,
  reportActions
)(TableSecondaryReport);
