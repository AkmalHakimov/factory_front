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
  DatePicker
} from "antd";
import "./TableReport.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolActions } from "../../AdminBlog/Redux/Reducers/ToolReducer";
import DownloadExcel from "../../../utils/DownloadExcel/DownloadExcel";
import { Pie, DualAxes } from "@ant-design/plots";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const TableReport = (props) => {
  useEffect(() => {
    props.getReports();
    props.getPieReport();
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
      title: "Ismi",
      dataIndex: "name",
    },
    {
      title: "Marka",
      dataIndex: "marka",
    },
    // {
    //   title: "Umumiy kirim",
    //   dataIndex: "totalIncomeAmount",
    //   render: (text) => formatNumber(text),
    // },
    {
      title: "Umumiy chiqim",
      dataIndex: "totalExpenseAmount",
      render: (text) => formatNumber(text),
    },
    // {
    //   title: "Umumiy Chiqim narxi(kirim narxi bilan)",
    //   dataIndex: "totalIncomePrice",
    //   render: (text) => formatNumber(text),
    // },
    {
      title: "Umumiy Chiqim narxi(chiqim miqdori bn)",
      dataIndex: "totalExpensePrice",
      render: (text) => formatNumber(text),
    },
    {
      title: "%",
      dataIndex: "totalExpensePrice",
      render: (text) => {
        const total = toolStates.totalStatistic?.totalExpensePrice;
        const percentage = (text / total) * 100;
        return `${formatNumber(percentage.toFixed(3))}%`;
      },
    },
    {
      title: "View Details",
      dataIndex: "id",
      render: (record) => (
        <Button onClick={() => props.getOneToolReport(record)} type="primary">
          View Details
        </Button>
      ),
    },
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
      dataIndex: "expensePrice",
      render: (text) => formatNumber(text),
    },
    {
      title: "Umumiy chiqim narxi",
      dataIndex: "totalExpense",
      render: (text) => formatNumber(text),
    },
    // {
    //   title: "Umumiy narxi",
    //   dataIndex: "totalIncome",
    //   render: (text) => formatNumber(text),
    // },
    {
      title: "Nisbat",
      dataIndex: "ratio",
      render: (text) => formatNumber(text.toFixed(3)),
    },
    {
      title: "%",
      dataIndex: "totalExpense",
      render: (text) => {
        const percentage = (text / total) * 100;
        return `${formatNumber(percentage.toFixed(3))}%`;
      },
    },
  ];

  const total =
    props.pieReports.salfetkaTotal +
    props.pieReports.sumkaTotal +
    props.pieReports.choyshabTotal;

  const isPieReportLoaded = true;

  function getTotalExpense() {
    props.oneToolReports.map((item, index) => {});

    let s = 0;
    for (let index = 0; index < props.oneToolReports.length; index++) {
      s += props.oneToolReports[index].totalExpense;
    }
    return s;
  }

  const config = {
    data: [
      {
        type: "Salfetka",
        value: parseFloat(  
          ((props.pieReports.salfetkaTotal / total) * 100).toFixed(2)
        ),
      },
      {
        type: "Sumka",
        value: parseFloat(
          ((props.pieReports.sumkaTotal / total) * 100).toFixed(2)
        ),
      },
      {
        type: "Choyshab",
        value: parseFloat(
          ((props.pieReports.choyshabTotal / total) * 100).toFixed(2)
        ),
      },
    ],
    // data: [
    //   { type: 'Salfetka', value: 100   },
    //   { type: 'Sumka', value:  20},
    //   { type: 'Choyshab', value: 30  },
    // ],
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };

  const   handleDateChange = (date, item) => {
    props.setDateVal(item);
  
    props.getReports();
    props.getPieReport();

  };
  return (
    <div>
      <div className="d-flex gap-5">
        <div style={{ width: 300, height: 300 }}>
          <Pie {...config} />
        </div>
        <div>
          <Paragraph>
            We supply a series of design principles, practical patterns and high
            quality design resources (<Text code>Sketch</Text> and{" "}
            <Text code>Axure</Text>), to help people create their product
            prototypes beautifully and efficiently.
          </Paragraph>
          <Paragraph>
            <ul>
              <li>
                <h5>Salfetka Xarajat: {formatNumberForPie(props.pieReports.salfetkaTotal)} </h5>
              </li>
              <li>
                <h5>Salfetka Narxi: {formatNumberForPie(props.pieReports.salfetkaTotalAm)} </h5>
              </li>
              <li>  
                <h5>Sumka Xarajat: {formatNumberForPie(props.pieReports.sumkaTotal)} </h5>
              </li>
              <li>
                <h5>Sumka Narxi: {formatNumberForPie(props.pieReports.sumkaTotalAm)}</h5>
              </li>
              <li>
                <h5>Choyshab Xarajat: {formatNumberForPie(props.pieReports.choyshabTotal)}</h5>
              </li>
              <li>
                <h5>Choyshab Narxi: {formatNumberForPie (props.pieReports.choyshabTotalAm)}</h5>
              </li>
            </ul>
          </Paragraph>
        </div>
        {/* <DualAxes {...configDual}></DualAxes> */}
      </div>

      {/* {isPieReportLoaded ? (
       
      ) : (
        <div>Loading pie chart...</div>
      )} */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center">
        <Button
          onClick={DownloadExcel}
          type="primary"
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
        dataSource={props.reports.map((item) => ({
          ...item,
          key: item.id, // Assuming 'id' is a unique identifier for each item
          // Other properties...
        }))}
        columns={columns}
      />

      <Modal
        title={toolStates.tool.name + " hisoboti"}
        width={1000}
        centered
        open={props.modalVisibleReport}
        // onCancel={() => {
        //   props.setModalVisibleReport();
        // }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              props.setModalVisibleReport();
            }}
          >
            Cancel
          </Button>,
        ]}
      >
        <div>
          <Table
            bordered
            dataSource={props.oneToolReports.map((item) => ({
              ...item,
              key: item.id, // Assuming 'id' is a unique identifier for each item
              // Other properties.. .
            }))}
            columns={columnsOfOneToolReport}
          />

          <div className="d-flex justify-content-around ">
            <Col style={{ width: 400 }}>
              <Card
                bordered={false}
                style={{ boxShadow: "2px 2px 5px 2px black" }}
              >
                <Statistic
                  title="Umumiy chiqim"
                  value={getTotalExpense()}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  // suffix="%"
                />
              </Card>
            </Col>
            <div style={{ width: 300, height: 200 }}>
              <Pie {...config} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default connect((state) => state.tool, toolActions)(TableReport);
