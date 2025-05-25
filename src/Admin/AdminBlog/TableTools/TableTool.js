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
} from "antd";
import "./TableTool.scss";
import { toolActions } from "../Redux/Reducers/ToolReducer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TableTool = (props) => {
  useEffect(() => {
    props.getToolTypes();
    props.getTools();
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
      toolTypeId: item.toolTypeId
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
      title: "id",
      dataIndex: "id",
      width: "10%",
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
      title: "Kod",
      dataIndex: "code",
      render: (text) => formatNumber(text),
    },
    {
      title: "O'lchami",
      dataIndex: "dimension",
    },
    // {
    //   title: "Turi",
    //   dataIndex: "toolTypeName",
    // },
    {
      title: "Razmer",
      dataIndex: "size",
    },
    {
      title: "Rangi",
      dataIndex: "color",
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
          <Select
            defaultValue="Uskuna turlari"
            onChange={(val) => {
              props.setSelectVal(val);
              props.getTools();
            }}
            
            style={{
              width: 300,
            }}
            options={props.options}
          />
        </div>

        <div>
          <Input
            value={props.searchInp}
            onChange={(e) => {
              props.setSearchInp(e.target.value);
              props.getToolTypes();
              props.getTools();
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
            props.getTools();
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
        title="Adabiyot qo'shish"
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
            form="toolForm" // ID of the form
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
            id="toolForm"
            // initialValues={{ toolTypeId: "Uskuna turlari" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              name="toolTypeId"
              rules={[
                { required: true, message: "Uskuna turini tanlash majburiy" },
              ]}
              required
              label="Uskuna turini tanlang"
              hasFeedback
            >
              <Select
                mode="multiple"
                style={{
                  width: "100%",
                }}
                placeholder="select one country"
                options={props.options}
                optionFilterProp="label"
                optionRender={(option) => (
                  <Space>
                    <span role="img" aria-label={option.data.label}>
                      {option.data.label}
                    </span>
                    {/* {option.data.label} */}
                  </Space>
                )}
              />
            </Form.Item>
            <Form.Item
              label="Uskuna nomi"
              rules={[
                { required: true, message: "Uskuna nomi tanlash majburiy" },
              ]}
              required
              name="name"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Razmer"
              rules={[{ required: true, message: "razmer tanlash majburiy" }]}
              required
              name="size"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Rangi"
              rules={[{ required: true, message: "Rangini tanlash majburiy" }]}
              required
              name="color"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              required
              rules={[
                { required: true, message: "Uskuna kodini tanlash majburiy" },
              ]}
              name="code"
              label="Kodi"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Uskuna markasini tanlash majburiy",
                },
              ]}
              required
              label="Marka"
              name="marka"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Uskuna o'lchamini tanlash majburiy",
                },
              ]}
              required
              label="O'lchami"
              name="dimension"
            >
              <Input placeholder="text" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default connect((state) => state.tool, toolActions)(TableTool);
