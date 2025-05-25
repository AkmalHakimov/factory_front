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
import "./TableOrderLab.scss";
import "react-quill/dist/quill.snow.css";
import { orderLabActions } from "../Redux/Reducers/OrderLabReducer";
import dayjs from "dayjs";

const TableOrderLab = (props) => {
  useEffect(() => {
    props.getOrderLabs();
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
      title: "Этикетка рақами (номи)",
      dataIndex: "code",  // Corresponds to `getCode()`
      fixed: "left",
      width: "150px",  // Moderate width for code
    },
    {
      title: "Буюртмадаги этикетка сони",
      dataIndex: "orderLabAmount",  // Corresponds to `getOrderLabAmount()`
      width: "150px",  // Numeric field
    },
    {
      title: "Омбордаги этикетка сони",
      dataIndex: "storeLabAmount",  // Corresponds to `getStoreLabAmount()`
      width: "150px",  // Numeric field
    },
    {
      title: "Буюртма учун керакли этикетка сони",
      dataIndex: "needLabAmount",  // Calculated field `getNeedLabAmount()`
      width: "150px",  // Numeric field
    },
    {
      title: "Этикетка нархи (1 дона, сўмда)",
      dataIndex: "labPrice",  // Corresponds to `getLabPrice()`
      width: "150px",  // Numeric field
    },
    {
      title: "Этикетка (керакли)  жами харажати (сўмда)",
      dataIndex: "totalExpense",  // Calculated field `getTotalExpense()`
      width: "150px",  // Numeric field
    },
    {
      title: "Ишончнома берилди (+/-)",
      dataIndex: "beliefCert",  // Corresponds to `getBeliefCert()`
      width: "100px",  // Status flag
      render: (text) => (
        text ? <Badge className="custom-badge"  status="success" text="Yes" /> : <Badge className="custom-badge"  status="error" text="No" />
      ),
    },
    {
      title: "Фактура кирими",
      dataIndex: "fabIncome",  // Corresponds to `getFabIncome()`
      width: "100px",  // Status flag
      render: (text) => (
        text ? <Badge className="custom-badge"  status="success" text="Yes" /> : <Badge className="custom-badge"  status="error" text="No" />
      ),
    },
    {
      title: "Тўланди so'mda",
      dataIndex: "paidAmount",  // Corresponds to `getPaidAmount()`
      width: "150px",  // Numeric field
      render: (text) => <Badge status="success" text={text} />,
    },
    {
      title: "Akt Golden",
      dataIndex: "aktGolden",  // Corresponds to `getAktGolden()`
      width: "100px",  // Status flag
      render: (text) => (
        text ? <Badge className="custom-badge"  status="success" text="Yes" /> : <Badge className="custom-badge"  status="error" text="No" />
      ),
    },
    {
      title: "Delete",
      fixed: "right",
      dataIndex: "delete",
      width: "80px",  // Action button
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
      width: "80px",  // Action button
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
              props.getOrderLabs();
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
            props.getOrderLabs();
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
        title="Order Etiketka"
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
            form="orderLabForm" // ID of the form
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
            id="orderLabForm"
            // initialValues={{ toolTypeId: "Uskuna turlari" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              label="Kod"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="code"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Буюртмадаги этикетка сони"
              rules={[
                { required: true, message: "Буюртмадаги этикетка сони kiritish majburiy" },
              ]}
              required
              name="orderLabAmount"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Омбордаги этикетка сони"
              rules={[
                { required: true, message: "Омбордаги этикетка сони kiritish majburiy" },
              ]}
              required
              name="storeLabAmount"
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
              label="Этикетка нархи
              (1 дона, сўмда)"
              rules={[
                { required: true, message: "Этикетка нархи (1 дона, сўмда) kiritish majburiy" },
              ]}
              required
              name="labPrice"
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
              rules={[
                { required: true, message: "Qiymat kiritish majburiy" },
              ]}
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
  (state) => state.orderLab,
  orderLabActions
)(TableOrderLab);
