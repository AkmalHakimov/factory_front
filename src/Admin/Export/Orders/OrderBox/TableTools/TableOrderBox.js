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
import "./TableOrderBox.scss";
import "react-quill/dist/quill.snow.css";
import { orderBoxActions } from "../Redux/Reducers/OrderBoxReducer";
import dayjs from "dayjs";

const TableOrderBox = (props) => {
  useEffect(() => {
    props.getOrderBoxs();
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
      orderBoxAmount: item.orderBoxCount,
      boxPriceWithoutQQ: item.withoutQQ,
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
      title: "Коробка ўлчами (буюртма бўйича сумка учун)",
      dataIndex: "boxProp", // Corresponds to `getBoxProp()`
      width: "200px", // Text field
    },
    {
      title: "1 дона коробкага қадоқланадиган сумка сони",
      dataIndex: "bagAmount", // Corresponds to `getBagAmount()`
      width: "150px", // Numeric field
    },
    {
      title: "Буюртма бўйича керакли коробка сони ",
      dataIndex: "orderBoxCount", // Corresponds to `getOrderBoxCount()`
      width: "150px", // Numeric field
    },
    {
      title: "Омбордаги бирка сони",
      dataIndex: "storeBirkaAmount", // Corresponds to `getStoreBirkaAmount()`
      width: "150px", // Numeric field
    },
    {
      title: "Буюртма учун сотиб олинадиган коробка сони",
      dataIndex: "needBirkaAmount", // Corresponds to `getNeedBirkaAmount()`
      width: "150px", // Numeric field
    },
    {
      title: "Коробка нархи (1 дона, сўмда) ҚҚҚ сиз",
      dataIndex: "withoutQQ", // Corresponds to `getWithoutQQ()`
      width: "150px", // Numeric field
    },
    {
      title: "Коробка нархи (1 дона, сўмда) ҚҚС билан",
      dataIndex: "withQQ", // Corresponds to `getWithQQ()`
      width: "150px", // Numeric field
    },
    {
      title: "Коробка (керакли)  жами харажати (сўмда) ҚҚҚ сиз",
      dataIndex: "totalWithoutqq", // Corresponds to `getTotalWithoutQQ()`
      width: "150px", // Numeric field
    },
    {
      title: "Коробка (керакли)  жами харажати (сўмда) ҚҚҚC bilan",
      dataIndex: "totalWithqq", // Corresponds to `getTotalWithQQ()`
      width: "150px", // Numeric field
    },
    {
      title: "Ишончнома берилди (+/-)",
      dataIndex: "beliefCert", // Corresponds to `getBeliefCert()`
      width: "150px", // Status flag
      render: (text) =>
        text ? (
          <Badge className="custom-badge"  status="success" text="Yes" />
        ) : (
          <Badge className="custom-badge"  status="error" text="No" />
        ),
    },
    {
      title: "Фактура кирими",
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
      title: "Akt Golden",
      dataIndex: "aktGolden", // Corresponds to `getAktGolden()`
      width: "150px", // Status flag
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
              props.getOrderBoxs();
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
            props.getOrderBoxs();
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
        title="Order Box"
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
            form="orderBoxForm" // ID of the form
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
            id="orderBoxForm"
            // initialValues={{ toolTypeId: "Uskuna turlari" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              label="Коробка ўлчами (буюртма бўйича сумка учун)"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="boxProp"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="1 дона коробкага қадоқланадиган сумка сони"
              rules={[
                {
                  required: true,
                  message: "1 дона коробкага қадоқланадиган сумка сони kiritish majburiy",
                },
              ]}
              required
              name="bagAmount"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Омбордаги birka сони"
              rules={[
                {
                  required: true,
                  message: "Омбордаги birka сони kiritish majburiy",
                },
              ]}
              required
              name="storeBirkaAmount"
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
              name="orderBoxAmount"
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
              label="Коробка нархи
              (1 дона, сўмда) ҚҚҚ сиз"
              rules={[
                {
                  required: true,
                  message: "qiymat kiritish majburiy",
                },
              ]}
              required
              name="boxPriceWithoutQQ"
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
  (state) => state.orderBox,
  orderBoxActions
)(TableOrderBox);
