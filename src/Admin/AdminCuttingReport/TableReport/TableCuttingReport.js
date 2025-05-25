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
  DatePicker
} from "antd";
import "./TableCuttingReport.scss";
import ReactQuill from "react-quill";
import dayjs from "dayjs";
import "react-quill/dist/quill.snow.css";
import {cuttingActions} from "../../AdminCutting/Redux/Reducers/CuttingReducer"
import DownloadExcel from "../../../utils/DownloadExcel/DownloadExcel";
import { Pie, DualAxes } from "@ant-design/plots";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const TableCuttingReport = (props) => {
  useEffect(() => {
    props.getWorkerReports();
    // props.getPieReport();
  }, []);

  const states = useSelector((state) => state.cutting);

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


  function formatNumber(num) {
    if (num == null) {
      return "0"; // or any placeholder you prefer, like an empty string
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [form] = Form.useForm();

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      fixed: "left",
      width: 50, // Narrow column for the index
    },
    {
      title: "Ismi",
      dataIndex: "firstName",
      fixed: "left",
      width: 120, // Allocated space for short names
    },
    {
      title: "Familiyasi",
      dataIndex: "lastName",
      fixed: "left",
      width: 120, // Allocated space for potentially longer surnames
    },
    {
      title: "Umumiy qirqish dona soni",
      dataIndex: "totalCount",
      render: (text) => formatNumber(text),
      width: 150, // Slightly wider to accommodate the title and numeric content
    },
    {
      title: "Umumiy qirqish metr soni",
      dataIndex: "totalMeter",
      render: (text) => formatNumber(text),
      width: 180, // Wide enough for the title and numeric content
    },
    {
      title: "Umumiy qirqish summasi",
      dataIndex: "totalPrice",
      render: (text) => formatNumber(text),
      width: 180, // Wide enough for the title and numeric content
    },
    {
      title: "View Details",
      dataIndex: "id",
      fixed: "right",
      width: 120, // Space for the button
      render: (record) => (
        <Button onClick={() => props.getOneWorkerReports(record)} type="primary">
          View Details
        </Button>
      ),
    },
  ];
  
  const columnsOfOneWorkerReport = [
    {
      title: "Artikul ",
      dataIndex: "name",
    },
    {
      title: "Dona",
      dataIndex: "totalCount",
      render: (text) => formatNumber(text),
    },
    {
      title: "Metr",
      dataIndex: "totalMeter",
      render: (text) => formatNumber(text),
    },
    {
      title: "Summasi",
      dataIndex: "totalPrice",
      render: (text) => formatNumber(text),
    },
  ];

  // const total =
  //   props.pieReports.salfetkaTotal +
  //   props.pieReports.sumkaTotal +
  //   props.pieReports.choyshabTotal;

  // const isPieReportLoaded = true;

  // function getTotalExpense() {
  //   props.oneToolReports.map((item, index) => {});

  //   let s = 0;
  //   for (let index = 0; index < props.oneToolReports.length; index++) {
  //     s += props.oneToolReports[index].totalExpense;
  //   }
  //   return s;
  // }

  // const config = {
  //   data: [
  //     {
  //       type: "Salfetka",
  //       value: parseFloat(
  //         ((props.pieReports.salfetkaTotal / total) * 100).toFixed(2)
  //       ),
  //     },
  //     {
  //       type: "Sumka",
  //       value: parseFloat(
  //         ((props.pieReports.sumkaTotal / total) * 100).toFixed(2)
  //       ),
  //     },
  //     {
  //       type: "Choyshab",
  //       value: parseFloat(
  //         ((props.pieReports.choyshabTotal / total) * 100).toFixed(2)
  //       ),
  //     },
  //   ],
  //   // data: [
  //   //   { type: 'Salfetka', value: 100   },
  //   //   { type: 'Sumka', value:  20},
  //   //   { type: 'Choyshab', value: 30  },
  //   // ],
  //   angleField: "value",
  //   colorField: "type",
  //   label: {
  //     text: "value",
  //     style: {
  //       fontWeight: "bold",
  //     },
  //   },
  //   legend: {
  //     color: {
  //       title: false,
  //       position: "right",
  //       rowPadding: 5,
  //     },
  //   },
  // };

  const handleDateChange = (date, item) => {
    props.setDateVal(item);
  
    props.getWorkerReports();
    // props.getOneWorkerReports();
  };

  const dateVal = states.dateVal 
  ? dayjs(states.dateVal, "DD-MM-YYYY").format("YYYY-MM-DD") 
  : dayjs().format("YYYY-MM-DD");

  return (
    <div>
      <div className="d-flex ">
        <div style={{ width: 300, height: 300 }}>
          {/* <Pie {...config} /> */}
        </div>
        <DualAxes {...configDual}></DualAxes>
      </div>

      {/* {isPieReportLoaded ? (
       
      ) : (
        <div>Loading pie chart...</div>
      )} */}
      <div className="d-flex justify-content-between align-items-center">
        <Button
          onClick={()=>DownloadExcel(`api/sewing/report/excel/download?date=${dateVal}`, 'Hisobot Workers.xls')}
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
              width: "30%",
              margin: "10px",
              marginTop: 0
            }}
          />
        <div>
          <Input
            value={props.searchInp}
            onChange={(e) => {
              props.setSearchInp(e.target.value);
              props.getWorkerReports();
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
            props.getWorkerReports();
          },
        }}
        scroll={{
          x: 1300,
        }}
        loading={props.loading}
        bordered
        dataSource={props.workerReports.map((item) => ({
          ...item,
          key: item.id, // Assuming 'id' is a unique identifier for each item
          // Other properties...
        }))}
        columns={columns}
      />

      <Modal
        title={props.worker.firstName + " " + props.worker.lastName + " hisoboti"}  
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
            dataSource={props.oneWorkerReports.map((item) => ({
              ...item,
              key: item.id, // Assuming 'id' is a unique identifier for each item
              // Other properties.. .
            }))}
            columns={columnsOfOneWorkerReport}
          />

          {/* <div className="d-flex justify-content-around ">
            <Col  style={{width: 400}}>
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
          </div> */}
        </div>
      </Modal>
    </div>
  );
};
export default connect((state) => state.cutting, cuttingActions)(TableCuttingReport);
