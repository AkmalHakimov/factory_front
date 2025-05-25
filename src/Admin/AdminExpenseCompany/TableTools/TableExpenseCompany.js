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
import { expenseCompanyActions } from "../Redux/Reducers/expenseCompanyReducer";
import dayjs from "dayjs";

const TableExpenseCompany = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    props.getExpenseCompany();
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
    props.setCurrentItm(item);
  }

  function formatNumber(num) {
    if (num == null) {
      return "0";  // or any placeholder you prefer, like an empty string
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
      dataIndex: "name",
    },
    {
      title: "Tovar turi",
      dataIndex: "type",
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
      dataIndex: "sumExpense",
      render: (_, record) => formatNumber(record.price * record.amount),
    },
    {
      title: "Izoh",
      dataIndex: "description",
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
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div
          style={{ width: 450 }}
          className="d-flex align-items-center justify-content-between"
        >
          <Button
            onClick={() => props.setModalVisible()}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            Add a row
          </Button>
        </div>

        <div>
          <Input
            value={props.searchInp}
            onChange={(e) => {
              props.setSearchInp(e.target.value);
              props.getExpenseCompany();
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
            props.getExpenseCompany();
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
        title="Korxona chiqimini qo'shish"
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
            form="expenseCompanyForm" // ID of the form
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
            id="expenseCompanyForm"
            // initialValues={{ toolId: "Uskunalar", paymentType: "To'lov turi" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >

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

            <Form.Item
              required
              rules={[{ required: true, message: "Tovar ismini kiriting" }]}
              name="name"
              label="Nomi"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              required
              rules={[{ required: true, message: "Tovar turini kiriting" }]}
              name="type"
              label="Turi"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              required
              rules={[{ required: true, message: "Izohni kiriting" }]}
              name="description"
              label="Izoh"
            >
              <Input.TextArea placeholder="text" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default connect(
  (state) => state.expenseCompany,
  expenseCompanyActions
)(TableExpenseCompany);
