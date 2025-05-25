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
  Badge

} from "antd";
import "./TableWorker.scss";
import { workerActions } from "../Redux/Reducers/WorkerReducer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const TableWorker = (props) => {
  useEffect(() => {
    props.getWorkers();
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
    });
    props.setCurrentItm(item);
  }

  const [form] = Form.useForm();

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "10%",
    },
    {
      title: "Ismi",
      dataIndex: "firstName",
    },
    {
      title: "Familiyasi",
      dataIndex: "lastName",
    },
    {
      title: "Mavjudligi",
      dataIndex: "sacked",
      width: "100px",  // Slightly more space for status flags
      render: (text) => (
        text == true ? (
          <Badge className="custom-badge" status="success" text="yes" />
        ) : (
          <Badge className="custom-badge" status="error" text="no" />
        )
      ),
    },
    // {
    //   title: "Lavozimi",
    //   dataIndex: "role",
    // },
    // {
    //   title: "Turi",
    //   dataIndex: "toolTypeName",
    // },
    {
      title: "Delete",
      dataIndex: "delete",
      width: "5%",
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
      width: "5%",
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
              props.getWorkers();
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
            props.getWorkers();
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
        title="Ishchi qo'shish"
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
            form="workerForm" // ID of the form
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
            id="workerForm"
            // initialValues={{ toolTypeId: "Uskuna turlari" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              label="Ismi"
              rules={[
                { required: true, message: "Ismini kiritish majburiy" },
              ]}
              required
              name="firstName"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Familiyasi"
              rules={[{ required: true, message: "Familiyasini kiritish majburiy" }]}
              required
              name="lastName"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Ishlayapti"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
              required
              name="sacked"
            >
              <Checkbox>Ishlayapti</Checkbox>
            </Form.Item>

            {/* <Form.Item
              label="Lavozimi"
              // rules={[{ required: true, message: "Lavozimini kiritish majburiy" }]}
              required
              name="role"
            >
              <Input placeholder="text" />
            </Form.Item> */}
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default connect((state) => state.worker, workerActions)(TableWorker);
