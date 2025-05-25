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
import "./TablePrint.scss";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";
import { printActions } from "../Redux/Reducers/PrintReducer";

const TablePrint = (props) => {
  useEffect(() => {
    props.getPrints();
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
        title: "Id",
        dataIndex: "id",
        width: "60px", // Adjusted for better visibility
        fixed: "left",
    },
    {
        title: "Code",
        dataIndex: "code",
        width: "200px", // Increased width for longer codes
        fixed: "left",
    },
    {
        title: "Sumka o'lchami",
        dataIndex: "bagProp",
        width: "140px", // Adjusted for detailed values
    },
    {
        title: "Dasta o'lchami",
        dataIndex: "gripProp",
        width: "140px", // Adjusted for detailed values
    },
    {
        title: "Donasi",
        dataIndex: "amount",
        width: "120px", // Slightly more space for amount
    },
    {
        title: "Gr",
        dataIndex: "gr",
        width: "80px", // Slightly more space for better visibility
    },
    {
        title: "Rangi",
        dataIndex: "color",
        width: "120px", // Adjusted for color values
    },
    {
        title: "PRINT КОРХОНАСИ НОМИ",
        dataIndex: "cpName",
        width: "140px", // Increased width for CP Name
    },
    {
        title: "PRINT дизайн номи",
        dataIndex: "designName",
        width: "140px", // Increased width for design names
    },
    {
        title: "1 п/м print нархи Aqsh dollarda",
        dataIndex: "pmPrice",
        width: "120px", // Adjusted for price values
    },
    {
        title: "1 п/м print нархи QQc siz so'mda",
        dataIndex: "pmPriceWithoutqq",
        width: "160px", // Slightly wider for calculated values
    },
    {
        title: "1 п/м print нархи QQc bilan so'mda",
        dataIndex: "pmPriceWithqq",
        width: "160px", // Slightly wider for calculated values
    },
    { 
        title: "Жами print нархи Aqsh dollarda",
        dataIndex: "totalPrice",
        width: "140px", // Increased width for detailed values
    },
    {
        title: "Жами print нархи QQc siz so'mda",
        dataIndex: "totalPriceWithoutqq",
        width: "180px", // Increased width for calculated total
    },
    {
        title: "Жами print нархи QQs bilan so'mda",
        dataIndex: "totalPriceWithqq",
        width: "180px", // Increased width for calculated total
    },
    {
        title: "Akt Golden",
        dataIndex: "aktGolden",
        width: "100px", // Adjusted for boolean status
        render: (text) =>
        text ? (
          <Badge className="custom-badge" status="success" text="Yes" />
        ) : (
          <Badge className="custom-badge" status="error" text="No" />
        ),
    },
    {
        title: "Fabric Income",
        dataIndex: "fabIncome",
        width: "120px", // Adjusted for boolean status
        render: (text) =>
        text ? (
          <Badge className="custom-badge" status="success" text="Yes" />
        ) : (
          <Badge className="custom-badge" status="error" text="No" />
        ),
    },
    {
        title: "Paid Amount",
        dataIndex: "paidAmount",
        width: "140px", // Increased width for amount
    },
    {
        title: "Delete",
        fixed: "right",
        dataIndex: "delete",
        width: "90px", // Space for action button
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
        width: "90px", // Space for action button
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
              props.getPrints();
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
            props.getPrints();
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
        title="Print xizmat"
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
            form="printForm" // ID of the form
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
            id="printForm"
            // initialValues={{ toolTypeId: "Uskuna turlari" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            {/* <Form.Item
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
            </Form.Item>*/}

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
              label="Сумка ўлчами"
              rules={[
                { required: true, message: "propertyni kiritish majburiy" },
              ]}
              required
              name="bagProp"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Даста ўлчами"
              rules={[{ required: true, message: "qiymat kiritish majburiy" }]}
              required
              name="gripProp"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Donasi"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="amount"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Rangi"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="color"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="Gr"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="gr"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="PRINT КОРХОНАСИ НОМИ"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="cpName"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="PRINT дизайн номи"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="designName"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="1 п/м print нархи АҚШ долларида ( $ ) "
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="pmPrice"
            >
              <Input placeholder="text" />
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
  (state) => state.print,
  printActions
)(TablePrint);
