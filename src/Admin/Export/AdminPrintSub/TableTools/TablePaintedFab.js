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
  Badge
} from "antd";
import "./TablePaintedFab.scss";
import "react-quill/dist/quill.snow.css";
import { paintedFabActions } from "../Redux/Reducers/PaintedFabReducer";
import dayjs from "dayjs";

const TablePaintedFab = (props) => {
  useEffect(() => {
    props.getPaintedFabs();
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
      width: "50px",  // Short and precise
      fixed: "left"
    },
    {
      title: "Code",
      dataIndex: "code",
      width: "150px",  // Code might be longer, so allowing more space
      fixed: "left"
    },
    {
      title: "Sana",
      dataIndex: "createdAt",
      width: "100px",  // Date field, moderate width
      fixed: "left"
    },
    {
      title: "Gr",
      dataIndex: "amountGr",
      width: "70px",  // Smaller width for numeric value
    },
    {
      title: "P/M",
      dataIndex: "pm",
      width: "70px",  // Smaller width for numeric value
    },
    {
      title: "Rangi",
      dataIndex: "color",
      width: "80px",  // Moderate space for color names
    },
    {
      title: "Тикиш учун берилди",
      dataIndex: "submittedToCp",
      width: "120px",  // Moderate space for status
    },
    {
      title: "Акт Голденга",
      dataIndex: "akt",
      width: "120px",  // Moderate space for status
      render: (text) => (
        text == true ? (
          <Badge className="custom-badge" status="success" text="yes" />
        ) : (
          <Badge className="custom-badge" status="error" text="no" />
        )
      ),
    },
    {
      title: "Delete",
      fixed: "right",
      dataIndex: "delete",
      width: "80px",  // Space for action button
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
      width: "80px",  // Space for action button
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
              props.getPaintedFabs();
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
            props.getPaintedFabs();
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
        title="Mato qo'shish"
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
            form="paintedFabForm" // ID of the form
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
            id="paintedFabForm"
            // initialValues={{ toolTypeId: "Uskuna turlari" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >

            <Form.Item
              label="Gr"
              rules={[
                { required: true, message: "Gr kiritish majburiy" },
              ]}
              required
              name="amountGr"
            >
              <Input placeholder="text" />
            </Form.Item>
            
            <Form.Item
              label="Bo'yalgan mato Id raqami"
              rules={[
                { required: true, message: "Qiymat kiritish majburiy" },
              ]}
              required
              name="paintServId"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Eni"
              rules={[
                { required: true, message: "Enini kiritish majburiy" },
              ]}
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
              rules={[
                { required: true, message: "P/Mni kiritish majburiy" },
              ]}
              required
              name="pm"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Rang"
              rules={[
                { required: true, message: "Rang kiritish majburiy" },
              ]}
              required
              name="color"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Тикиш учун берилди"
              rules={[
                { required: true, message: "Qiymat kiritish majburiy" },
              ]}
              required
              name="submittedToCp"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Акт Голденга"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
              required
              name="akt"
            >
              <Checkbox>Акт Голденга</Checkbox>
            </Form.Item>
            
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default connect(
  (state) => state.paintedFab,
  paintedFabActions
)(TablePaintedFab);
