import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  Input,
  Popconfirm,
  Table,
  Checkbox,
  Form,
  Space,
  Select,
  DatePicker,
  Badge,
} from "antd";
import "./TableStoreFab.scss";
import "react-quill/dist/quill.snow.css";
import { storeFabActions } from "../Redux/Reducers/StoreFabReducer";
import dayjs from "dayjs";

const TableStoreFab = (props) => {
  useEffect(() => {
    props.getStoreFabs();
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
      createdAt: dayjs(item.createdAt).isValid() ? dayjs(item.createdAt) : null,
    });
    props.setCurrentItm(item);
  }

  const [form] = Form.useForm();

  function formatNumber(num) {
    if (num == null) {
      return "0"; // or any placeholder you prefer, like an empty string
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "50px", // Short and precise
      fixed: "left",
    },
    {
      title: "Code",
      dataIndex: "code",
      width: "150px", // Code might be longer, so allowing more space
      fixed: "left",
    },
    {
      title: "Sana",
      dataIndex: "createdAt",
      width: "100px", // Date field, moderate width
      fixed: "left",
    },
    {
      title: "Ishlab chiqaruvchi korxona nomi",
      dataIndex: "producerCpName",
      width: "250px", // Longer company names, more space needed
    },
    {
      title: "БЎЁҚ КОРХОНАСИ НОМИ",
      dataIndex: "painterCpName",
      width: "250px", // Longer company names, more space needed
    },
    {
      title: "Gr",
      dataIndex: "amountGr",
      width: "70px", // Smaller width for numeric value
    },
    {
      title: "P/M",
      dataIndex: "pm",
      width: "70px", // Smaller width for numeric value
    },
    {
      title: "Rangi",
      dataIndex: "color",
      width: "80px", // Moderate space for color names
    },
    {
      title: "AQSH dollarida ( $ )",
      dataIndex: "priceUs",
      width: "120px", // Prices, moderate width
    },
    {
      title: "Delete",
      fixed: "right",
      dataIndex: "delete",
      width: "80px", // Space for action button
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
      fixed: "right",
      width: "80px", // Space for action button
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
              props.getStoreFabs();
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
            props.getStoreFabs();
          },
        }}
        loading={props.loading}
        scroll={{
          x: 1300,
        }}
        bordered
        dataSource={props.dataSource.map((item) => ({
          ...item,
          key: item.id, // Assuming 'id' is a unique identifier for each item
          // Other properties...
        }))}
        columns={columns}
      />
      <Modal
        title="Omborga qo'shish"
        width={1000}
        centered
        open={props.modalVisible}
        // onCancel={() => {
        //   props.setModalVisible();
        //   form.resetFields();
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
            form="storeFabForm" // ID of the form
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
            id="storeFabForm"
            // initialValues={{ toolTypeId: "Uskuna turlari" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              label="БЎЁҚ КОРХОНАСИ НОМИ"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="painterCpName"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Ishlab chiqaruvchi korxona nomi"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="producerCpName"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Gr"
              rules={[{ required: true, message: "Gr kiritish majburiy" }]}
              required
              name="amountGr"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Eni"
              rules={[{ required: true, message: "Enini kiritish majburiy" }]}
              required
              name="width"
            >
              <Input placeholder="text" />
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
              label="P/M"
              rules={[{ required: true, message: "P/Mni kiritish majburiy" }]}
              required
              name="pm"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Rang"
              rules={[{ required: true, message: "Rang kiritish majburiy" }]}
              required
              name="color"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="АҚШ долларида ( $ )"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="priceUS"
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
  (state) => state.storeFab,
  storeFabActions
)(TableStoreFab);
