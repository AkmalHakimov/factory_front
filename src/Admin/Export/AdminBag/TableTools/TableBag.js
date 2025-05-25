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
import "./TableBag.scss";
import "react-quill/dist/quill.snow.css";
import { bagActions } from "../Redux/Reducers/BagReducer";
import dayjs from "dayjs";

const TableBag = (props) => {
  useEffect(() => {
    props.getBags();
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
        title: "Sana",
        dataIndex: "createdAt",
        width: "120px", // Slightly wider for date format
        fixed: "left",
    },
    {
        title: "Gr",
        dataIndex: "amountGr",
        width: "80px", // Slightly wider for better visibility
    },
    {
        title: "Eni",
        dataIndex: "width",
        width: "100px", // Moderate space for width
    },
    {
        title: "Ишлатилган бўз (п/м)",
        dataIndex: "exploitedFabricAm",
        width: "140px", // Increased width for detailed values
    },
    {
        title: "Сумка ўлчами",
        dataIndex: "property",
        width: "140px", // Increased width for detailed values
    },
    {
        title: "Бичилган сумка сони",
        dataIndex: "sewedBagAm",
        width: "140px", // Increased width for detailed values
    },
    {
        title: "Меъёр бўйича сумка сони",
        dataIndex: "limitedBagAm",
        width: "140px", // Increased width for detailed values
    },
    {
        title: "Фарқи (донада)",
        dataIndex: "diff",
        width: "140px", // Increased width for detailed values
    },
    {
        title: "Фарқи (п/м)",
        dataIndex: "diffPm",
        width: "140px", // Increased width for detailed values
    },
    {
        title: "Чиқим %и",
        dataIndex: "expense",
        width: "120px", // Slightly more space for percentage
    },
    {
        title: "Қирқиб олинган даста метри",
        dataIndex: "gripMr",
        width: "120px", // Slightly more space for detailed values
    },
    {
        title: "1 дона сумкага даста учун кетадиган метр",
        dataIndex: "gripForBagAm",
        width: "120px", // Slightly more space for detailed values
    },
    {
        title: "Меъёр бўйича етадиган сумка сони",
        dataIndex: "limitedGripAm",
        width: "160px", // More space for detailed values
    },
    {
        title: "Ҳақиқатда ",
        dataIndex: "realAm",
        width: "160px", // More space for detailed values
    },
    {
        title: "Dasta farqi",
        dataIndex: "diffGrip",
        width: "140px", // Increased width for detailed values
    },
    {
        title: "Dasta chiqimi %da",
        dataIndex: "expenseGrip",
        width: "140px", // Increased width for detailed values
    },
    {
        title: "Dasta umumiy farqi",
        dataIndex: "totalDiffGrip",
        width: "140px", // Increased width for detailed values
    },
    {
        title: "Яроқсиз сумка сони",
        dataIndex: "invalidAm",
        width: "140px", // Increased width for detailed values
    },
    {
        title: "Шу яроқсиз сумкадан ишлаб чиқарилган даста (метр)",
        dataIndex: "gripInvalidBag",
        width: "140px", // Increased width for detailed values
    },
    {
        title: "Код даста учун",
        dataIndex: "gripCode",
        width: "140px", // Increased width for detailed values
    },
    {
        title: "Жами ишлаб чиқарилган сумка сони",
        dataIndex: "totalBagAm",
        width: "140px", // Increased width for detailed values
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
              props.getBags();
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
            props.getBags();
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
        title="Sumka qo'shish"
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
            form="bagForm" // ID of the form
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
            id="bagForm"
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
            </Form.Item> */}

            <Form.Item
              label="Сумка ўлчами"
              rules={[
                { required: true, message: "propertyni kiritish majburiy" },
              ]}
              required
              name="property"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Ишлатилган бўз (п/м)"
              rules={[{ required: true, message: "qiymat kiritish majburiy" }]}
              required
              name="exploitedFabricAm"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Бичилган сумка сони"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="sewedBagAm"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Меъёр бўйича сумка сони  "
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="limitedBagAm"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="Қирқиб олинган даста метри  "
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="gripMr"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="1 дона сумкага даста учун кетадиган метр"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="gripForBagAm"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Ҳақиқатда "
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="realAm"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Яроқсиз сумка сони"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="invalidAm"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Шу яроқсиз сумкадан ишлаб чиқарилган даста (метр)"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="gripInvalidBag"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="GripCode"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="gripCode"
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
  (state) => state.bag,
  bagActions
)(TableBag);
