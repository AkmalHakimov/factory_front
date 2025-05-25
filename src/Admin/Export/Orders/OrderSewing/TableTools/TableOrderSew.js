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
import "./TableOrderSew.scss";
import "react-quill/dist/quill.snow.css";
import { orderSewActions } from "../Redux/Reducers/OrderSewReducer";
import dayjs from "dayjs";

const TableOrderSew = (props) => {
  useEffect(() => {
    props.getOrderSews();
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
      sewingPriceWithoutQQ: item.sewingPriceWithoutqq,
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
      title: "Id",
      dataIndex: "id", // Corresponds to `getId()`
      width: "100px", // Numeric field
    },
    {
      title: "Буюртма бўйича тикиш ипи ранги",
      dataIndex: "sewingColor", // Corresponds to `getSewingColor()`
      width: "200px", // Text field
    },
    {
      title: "1 дона сумка тикиш учун ишлатиладиган ип (метр)",
      dataIndex: "sewingAmount", // Corresponds to `getSewingAmount()`
      width: "150px", // Numeric field
    },
    {
      title: "Буюртма бўйича керакли тикиш ипи сон",
      dataIndex: "orderSewingAmount", // Corresponds to `getOrderSewingAmount()`
      width: "180px", // Derived field
    },
    {
      title: "Омбордаги тикиш ипи сони",
      dataIndex: "storeSewingAmount", // Corresponds to `getStoreSewingAmount()`
      width: "150px", // Numeric field
    },
    {
      title: "Буюртма учун керакли тикиш ипи сони",
      dataIndex: "neccSewingAmount", // Corresponds to `getNeccSewingAmount()`
      width: "180px", // Derived field
    },
    {
      title: "Тикиш ипи нархи (1 кг, сўмда) ҚҚҚ сиз",
      dataIndex: "sewingPriceWithoutqq", // Corresponds to `getSewingPriceWithoutQQ()`
      width: "180px", // Numeric field3
    },
    {
      title: "Тикиш ипи нархи (1 кг, сўмда) ҚҚҚC bilan",
      dataIndex: "sewingPriceWithqq", // Corresponds to `getSewingPriceWithQQ()`
      width: "180px", // Derived field
    },
    {
      title: "Тикиш ипи (керакли)  жами харажати (сўмда) ҚҚҚ сиз",
      dataIndex: "totalWithoutqq", // Corresponds to `getTotalWithoutQQ()`
      width: "180px", // Derived field
    },
    {
      title: "Тикиш ипи (керакли)  жами харажати (сўмда) ҚҚҚC bilan",
      dataIndex: "totalWithqq", // Corresponds to `getTotalWithQQ()`
      width: "180px", // Derived field
    },
    {
      title: "Ишончнома берилди (+/-)",
      dataIndex: "beliefCert", // Corresponds to `getBeliefCert()`
      width: "120px", // Status flag
      render: (text) =>
        text ? (
          <Badge className="custom-badge"  status="success" text="Yes" />
        ) : (
          <Badge className="custom-badge"  status="error" text="No" />
        ),
    },
    {
      title: "Фабрикадан тушган даромад (+/-)",
      dataIndex: "fabIncome", // Corresponds to `getFabIncome()`
      width: "150px", // Status flag
      render: (text) =>
        text ? (
          <Badge className="custom-badge"  status="success" text="Yes" />
        ) : (
          <Badge className="custom-badge"  status="error" text="No" />
        ),
    },
    {
      title: "Тўланган сумма (сўмда)",
      dataIndex: "paidAmount", // Corresponds to `getPaidAmount()`
      width: "150px", // Numeric field
    },
    {
      title: "Akt Golden (+/-)",
      dataIndex: "aktGolden", // Corresponds to `getAktGolden()`
      width: "120px", // Status flag
      render: (text) =>
        text ? (
          <Badge className="custom-badge"  status="success" text="Yes" />
        ) : (
          <Badge className="custom-badge"  status="error" text="No" />
        ),
    },
    {
      title: "Delete",
      fixed: "right",
      dataIndex: "delete",
      width: "80px", // Action button
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
      dataIndex: "edit",
      width: "80px", // Action button
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
              props.getOrderSews();
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
            props.getOrderSews();
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
        title="Order Tikish ipi"
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
            form="orderSewForm" // ID of the form
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
            id="orderSewForm"
            // initialValues={{ toolTypeId: "Uskuna turlari" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              label="Буюртма бўйича тикиш ипи ранги"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="sewingColor"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="1 дона сумка тикиш учун ишлатиладиган ип (метр)"
              rules={[
                {
                  required: true,
                  message:
                    "qiymat kiritish majburiy",
                },
              ]}
              required
              name="sewingAmount"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Sumk soni"
              rules={[
                {
                  required: true,
                  message: "Буюртма бўйича сумка сони kiritish majburiy",
                },
              ]}
              required
              name="orderSewingAmount"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Омбордаги тикиш ипи сони"
              rules={[
                {
                  required: true,
                  message: "1 дона целофан оғирлиги (кг) kiritish majburiy",
                },
              ]}
              required
              name="storeSewingAmount"
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
              label="Тикиш ипи нархи
              (1 кг, сўмда) ҚҚҚ сиз"
              rules={[
                {
                  required: true,
                  message: "qiymat kiritish majburiy",
                },
              ]}
              required
              name="sewingPriceWithoutQQ"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Ишончнома берилди"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
              required
              name="beliefCert"
            >
              <Checkbox>Ишончнома берилди</Checkbox>
            </Form.Item>

            <Form.Item
              label="Фактура кирими"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
              required
              name="fabIncome"
            >
              <Checkbox>Фактура кирими</Checkbox>
            </Form.Item>

            <Form.Item
              label="To'langan miqdor"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="paidAmount"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Акт Голденга"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
              required
              name="aktGolden"
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
  (state) => state.orderSew,
  orderSewActions
)(TableOrderSew);
