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
import "./TableOrderFab.scss";
import "react-quill/dist/quill.snow.css";
import { orderFabActions } from "../Redux/Reducers/OrderFabReducer";
import dayjs from "dayjs";

const TableOrderFab = (props) => {
  useEffect(() => {
    props.getOrderFabs();
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
      title: "Сана",
      dataIndex: "createdAt",  // Corresponds to `getCreatedAt()`
      width: "150px",  // Date field, moderate width
    },
    {
      title: "Харидор номи",
      dataIndex: "clientName",  // Corresponds to `getClientName()`
      width: "200px",  // Name field, moderate to long width
    },
    {
      title: "Буюртма рақами",
      dataIndex: "orderNum",  // Corresponds to `getOrderNum()`
      width: "120px",  // Moderate width for order numbers
    },
    {
      title: "Сумка ўлчами",
      dataIndex: "bagProp",  // Corresponds to `getBagProp()`
      width: "150px",  // Moderate width
    },
    {
      title: "даста ўлчами",
      dataIndex: "gripProp",  // Corresponds to `getGripProp()`
      width: "150px",  // Moderate width
    },
    {
      title: "Буюртма бўйича сумка сони",
      dataIndex: "bagCount",  // Corresponds to `getBagCount()`
      width: "100px",  // Numeric field
    },
    {
      title: "Бўз гр",
      dataIndex: "fabGr",  // Corresponds to `getFabGr()`
      width: "100px",  // Numeric field
    },
    {
      title: "1 та сумка м2",
      dataIndex: "bagM2",  // Corresponds to `getBagM2()`
      width: "100px",  // Numeric field
    },
    {
      title: "Жами м2",
      dataIndex: "totalBagM2",  // Calculated field `getTotalBagM2()`
      width: "150px",  // Numeric field
    },
    {
      title: "Жами керак бўладиган мато п/м (ўртача)",
      dataIndex: "totalFabPm",  // Calculated field `getTotalFabPm()`
      width: "150px",  // Numeric field
    },
    {
      title: "Омборда мавжуд мато п/м",
      dataIndex: "availableFabPm",  // Corresponds to `getAvailableFabPm()`
      width: "150px",  // Numeric field
    },
    {
      title: "Буюртма бериш керак бўлган бўз ё мато PM",
      dataIndex: "mustOrPm",  // Calculated field `getMustOrPm()`
      width: "150px",  // Numeric field
    },
    {
      title: "Буюртма бериш керак бўлган бўз ё мато Gr",
      dataIndex: "mustOrGr",  // Corresponds to `getMustOrGr()`
      width: "150px",  // Numeric field
    },
    {
      title: "Буюртма бериш керак бўлган бўз ё мато Eni",
      dataIndex: "mustOrWidth",  // Corresponds to `getMustOrWidth()`
      width: "150px",  // Numeric field
    },
    {
      title: "Буюртма бериш керак бўлган бўз ё мато rangi",
      dataIndex: "mustOrColor",  // Corresponds to `getMustOrColor()`
      width: "120px",  // Moderate width for color
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
      fixed: "right",
      width: "80px",  // Space for action button
      render: (_, record) =>
        props.dataSource?.length >= 1 ? (
          <Button onClick={() => handleEdit(record)} type="primary">
            Edit
          </Button>
        ) : null,
    }
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
              props.getFab();
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
            props.getOrderFabs();
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
        title="Order Bo'z"
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
            form="orderFabForm" // ID of the form
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
            id="orderFabForm"
            // initialValues={{ toolTypeId: "Uskuna turlari" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              label="Харидор номи"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="clientName"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Буюртма рақами"
              rules={[
                { required: true, message: "Буюртма рақами kiritish majburiy" },
              ]}
              required
              name="orderNum"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Сумка ўлчами"
              rules={[
                { required: true, message: "Сумка ўлчами kiritish majburiy" },
              ]}
              required
              name="bagProp"
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
              label="даста ўлчами"
              rules={[
                { required: true, message: "даста ўлчами kiritish majburiy" },
              ]}
              required
              name="gripProp"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Буюртма бўйича сумка сони"
              rules={[
                { required: true, message: "Буюртма бўйича сумка сони kiritish majburiy" },
              ]}
              required
              name="bagCount"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Бўз гр"
              rules={[
                { required: true, message: "Qiymat kiritish majburiy" },
              ]}
              required
              name="fabGr"
            >
              <Input placeholder="text" />
            </Form.Item>


            <Form.Item
              label="1 та сумка м2"
              rules={[
                { required: true, message: "Qiymat kiritish majburiy" },
              ]}
              required
              name="bagM2"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="Омборда мавжуд мато п/м"
              rules={[
                { required: true, message: "Qiymat kiritish majburiy" },
              ]}
              required
              name="availableFabPm"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Буюртма бериш керак бўлган бўз ё мато Eni"
              rules={[
                { required: true, message: "Qiymat kiritish majburiy" },
              ]}
              required
              name="width"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Буюртма бериш керак бўлган бўз ё мато Rangi"
              rules={[
                { required: true, message: "Qiymat kiritish majburiy" },
              ]}
              required
              name="color"
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
  (state) => state.orderFab,
  orderFabActions
)(TableOrderFab);
