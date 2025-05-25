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
import "./TableOrderPack.scss";
import "react-quill/dist/quill.snow.css";
import { orderPackActions } from "../Redux/Reducers/OrderPackReducer";
import dayjs from "dayjs";

const TableOrderPack = (props) => {
  useEffect(() => {
    props.getOrderPacks();
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
      packPriceWithoutQQ: item.packPriceWithoutqq,
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
      title: "Целофан ўлчами (буюртма бўйича сумка учун)",
      dataIndex: "packProp", // Corresponds to `getPackProp()`
      width: "200px", // Text field
    },
    {
      title: "1 дона целофанга қадоқланадиган сумка сони",
      dataIndex: "packAmount", // Corresponds to `getBagAmount()`
      width: "150px", // Numeric field
    },
    {
      title: "Буюртма бўйича керакли целофан сони ",
      dataIndex: "orderPackAmount", // Corresponds to `getOrderPackAmount()`
      width: "150px", // Numeric field
    },
    {
      title: "1 дона целофан оғирлиги (кг)",
      dataIndex: "weight", // Corresponds to `getWeight()`
      width: "150px", // Numeric field
    },
    {
      title: "Буюртма бўйича керакли целофан оғирлиги (кг)",
      dataIndex: "orderPackWeight", // Corresponds to `getOrderPackWeight()`
      width: "180px", // Derived field
    },
    {
      title: "Омбордаги целофан оғирлиги (кг)",
      dataIndex: "storeWeight", // Corresponds to `getStoreWeight()`
      width: "150px", // Numeric field
    },
    {
      title: "Буюртма учун сотиб олинадиган целофан оғирлиги (кг)",
      dataIndex: "buyPackWeight", // Corresponds to `getBuyPackWeight()`
      width: "150px", // Derived field
    },
    {
      title: "Целофан нархи (1 кг, сўмда)) ҚҚҚ сиз",
      dataIndex: "packPriceWithoutqq", // Corresponds to `getPackPriceWithoutQq()`
      width: "150px", // Numeric field
    },
    {
      title: "Целофан нархи (1 кг, сўмда)) ҚҚС билан",
      dataIndex: "packPriceWithqq", // Corresponds to `getPackPriceWithQq()`
      width: "150px", // Derived field
    },
    {
      title: "Целофан (керакли)  жами харажати (сўмда) ҚҚҚ сиз",
      dataIndex: "totalWithoutqq", // Corresponds to `getTotalWithoutQq()`
      width: "150px", // Derived field
    },
    {
      title: "Целофан (керакли)  жами харажати (сўмда) ҚҚҚC bilan",
      dataIndex: "totalWithqq", // Corresponds to `getTotalWithQq()`
      width: "150px", // Derived field
    },
    {
      title: "Ишончнома берилди (+/-)",
      dataIndex: "beliefCert", // Corresponds to `getBeliefCert()`
      width: "100px", // Status flag
      render: (text) =>
        text ? (
          <Badge className="custom-badge"  status="success" text="Yes" />
        ) : (
          <Badge className="custom-badge"  status="error" text="No" />
        ),
    },
    {
      title: "Фабрикадан тушган даромад",
      dataIndex: "fabIncome", // Corresponds to `getFabIncome()`
      width: "150px", // Numeric field
      render: (text) =>
      text ? (
        <Badge className="custom-badge"  status="success" text="Yes" />
      ) : (
        <Badge className="custom-badge"  status="error" text="No" />
      ),
    },
    {
      title: "Тўланган сумма",
      dataIndex: "paidAmount", // Corresponds to `getPaidAmount()`
      width: "150px", // Numeric field
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
              props.getOrderPacks();
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
            props.getOrderPacks();
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
        title="Order Selofan"
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
            form="orderPackForm" // ID of the form
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
            id="orderPackForm"
            // initialValues={{ toolTypeId: "Uskuna turlari" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              label="Целофан ўлчами (буюртма бўйича сумка учун)"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="packProp"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="1 дона целофанга қадоқланадиган сумка сони"
              rules={[
                {
                  required: true,
                  message:
                    "1 дона целофанга қадоқланадиган сумка сони kiritish majburiy",
                },
              ]}
              required
              name="packAmount"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Буюртма бўйича сумка сони"
              rules={[
                {
                  required: true,
                  message: "Буюртма бўйича сумка сони kiritish majburiy",
                },
              ]}
              required
              name="orderPackAmount"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="1 дона целофан оғирлиги (кг)"
              rules={[
                {
                  required: true,
                  message: "1 дона целофан оғирлиги (кг) kiritish majburiy",
                },
              ]}
              required
              name="weight"
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
              label="Омбордаги целофан оғирлиги (кг)"
              rules={[
                {
                  required: true,
                  message: "qiymat kiritish majburiy",
                },
              ]}
              required
              name="storeWeight"
            >
              <Input placeholder="text" />
            </Form.Item>
            
            <Form.Item
              label="Целофан нархи
              (1 кг, сўмда) ҚҚҚ сиз"
              rules={[
                {
                  required: true,
                  message: "qiymat kiritish majburiy",
                },
              ]}
              required
              name="packPriceWithoutQQ"
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
  (state) => state.orderPack,
  orderPackActions
)(TableOrderPack);
