import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  Input,
  Popconfirm,
  Table,
  Checkbox,
  Form,
  Select,
  DatePicker,
} from "antd";
import "./TableTool.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolActions } from "../../AdminBlog/Redux/Reducers/ToolReducer";
import { incomeToolActions } from "../Redux/Reducers/IncomeToolReducer";
import dayjs from "dayjs";
import moment from 'moment';

const TableIncomeTool = (props) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const toolStates = useSelector((state) => state.tool);

  useEffect(() => {
    props.getIncomeTools();
    dispatch(toolActions.getAllTools());
  }, []);

  useEffect(() => {
    if (!props.modalVisible) {
      form.resetFields();
    }
  }, [props.modalVisible]);

  function handleEdit(item) {
    props.setModalVisible();
    form.setFieldsValue({
      ...item,
      toolId: {
        label: item.toolName,
        value: item.toolId,
      },
      // Ensure createdAt is formatted correctly
      createdAt: dayjs(item.createdAt).isValid() ? dayjs(item.createdAt) : null,
    });

    dispatch(
      toolActions.setToolsTypes([
        {
          label: item.toolTypeName,
          value: item.toolTypeId,
        },
      ])
    );
    props.setCurrentItm(item);
  }

  function formatNumber(num) {
    if (num == null) {
      return "0"; // or any placeholder you prefer, like an empty string
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "10%",
    },
    {
      title: "Sana",
      dataIndex: "createdAt",
    },
    {
      title: "Tovar nomi",
      dataIndex: "toolName",
    },
    {
      title: "Tovar turi",
      dataIndex: "toolTypeName",
    },
    {
      title: "Miqdori",
      dataIndex: "amount",
      render: (text) => formatNumber(text),
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (text) => formatNumber(text),
    },
    {
      title: "Summasi",
      dataIndex: "sumIncome",
      render: (text) => formatNumber(text),
    },
    {
      title: "To'lov turi",
      dataIndex: "paymentType",
      render: (text) => (text === "PERECH" ? "Karta" : "Cash"),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (_, record) =>
        props.dataSource?.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => props.handleDel(record.id)}
          >
            <Button type="primary">Delete</Button>
          </Popconfirm>
        ) : null,
    },
    {
      title: "Edit",
      dataIndex: "",
      render: (_, record) =>
        props.dataSource?.length >= 1 ? (
          <Button onClick={() => handleEdit(record)} type="primary">
            Edit
          </Button>
        ) : null,
    },
  ];

  const handleDateChange = (date, item) => {
    props.setDateVal(item);
  
    props.getIncomeTools();
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center" >
        <div
          style={{ width: 600 }}
          className="d-flex align-items-center justify-content-between"
        >
          <Button
            onClick={() => props.setModalVisible()}
            type="primary"
            // style={{
            //   marginBottom: 16,
            // }}
          >
            Add a row
          </Button>
          <Select
            defaultValue="Uskunalar"
            onChange={(val) => {
              props.setSelectVal(val);
              props.getIncomeTools();
            }}
            style={{
              width: 500,
              marginLeft: "20px"
            }}
            options={toolStates.toolOptions}
          />

          <DatePicker
            format={{
              format: "DD-MM-YYYY",
              type: "mask",
            }}
            // defaultValue={getOneMonthAgo()}
            onChange={handleDateChange}
            style={{
              width: "100%",
              margin: "10px"
            }}
          />
        </div>

        <div>
          <Input
            value={props.searchInp}
            onChange={(e) => {
              props.setSearchInp(e.target.value);
              props.getIncomeTools();
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
            props.getIncomeTools();
          },
        }}
        loading={props.loading}
        bordered
        dataSource={props.dataSource.map((item) => ({
          ...item,
          key: item.id, // Assuming 'id' is a unique identifier for each item
          // Other properties...
        }))}
        columns={columns}
      />
      <Modal
        title="Kirim qo'shish"
        width={1000}
        centered
        open={props.modalVisible}
        // onCancel={() => {
        //   form.resetFields();
        //   props.setModalVisible();
        // }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              props.setModalVisible();
              form.resetFields();
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            form="toolIncomeForm" // ID of the form
            htmlType="submit"
            type="primary"
          >
            Submit
          </Button>,
        ]}
      >
        <div>
          <Form
            form={form}
            layout="vertical"
            id="toolIncomeForm"
            initialValues={{
              toolId: "Uskunalar",
              paymentType: "To'lov turi",
              toolTypeId: "Uskuna turi",
            }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              name="toolId"
              rules={[{ required: true, message: "Uskunani tanlang" }]}
              required
              label="Uskunani tanlang"
              hasFeedback
            >
              <Select
                onChange={(value) => dispatch(toolActions.getOneTool(value))}
                optionFilterProp="label"
                showSearch
                placeholder="Search to Select"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={toolStates.toolOptions}
              />
            </Form.Item>

            <Form.Item
              name="toolTypeId"
              rules={[{ required: true, message: "Uskunani turini tanlang" }]}
              required
              label="Uskuna turini tanlang"
              hasFeedback
            >
              {toolStates.toolsToolTypes.length > 0 ? (
                <Select
                
                options={toolStates.toolsToolTypes} />
              ) : (
                <Select disabled />
              )}
            </Form.Item>

            <Form.Item
              name="paymentType"
              rules={[{ required: true, message: "To'lov turini tanlang" }]}
              required
              label="To'lov turini tanlang"
              hasFeedback
            >
              <Select
                options={[
                  {
                    label: "Narx",
                    value: "CASH",
                  },
                  {
                    label: "Karta",
                    value: "PERECH",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              rules={[{ required: true, message: "Sana tanlash majburiy" }]}
              required
              label="Sanasi"
              name="createdAt"
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
                format={{
                  format: "DD-MM-YYYY",
                  type: "mask",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Midori"
              rules={[{ required: true, message: "Miqdorni tanlash majburiy" }]}
              required
              name="amount"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              required
              rules={[{ required: true, message: "Narxni tanlash majburiy" }]}
              name="price"
              label="Narxi"
            >
              <Input placeholder="text" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default connect(
  (state) => state.incomeTool,
  incomeToolActions
)(TableIncomeTool);
