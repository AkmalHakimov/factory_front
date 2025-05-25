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
import "./TableStoreBag.scss";
import "react-quill/dist/quill.snow.css";
import { storeBagActions } from "../Redux/Reducers/StoreBagReducer";
import dayjs from "dayjs";

const TableStoreBag = (props) => {
  useEffect(() => {
    props.getStoreBags();
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
      totalPrice: item.totalSewingPriceUs,
      priceUS: item.priceUs,
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
      width: "50px", // Short and precise
      fixed: "left",
    },
    {
      title: "Code",
      dataIndex: "code",
      width: "150px", // Code might be longer, so allowing more space
      fixed: "left",
    },
    {
      title: "Sana",
      dataIndex: "createdAt",
      width: "100px", // Date field, moderate width
      fixed: "left",
    },
    {
      title: "Сумка ўлчами",
      dataIndex: "propertyBag",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Даста ўлчами",
      dataIndex: "propertyGrip",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Этикетка (номи ё коди)",
      dataIndex: "label",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Этикетка donasi",
      dataIndex: "labelAm",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Ранги",
      dataIndex: "color",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Rangi",
      dataIndex: "color",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Gr",
      dataIndex: "amountGr",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Бирка (номи ё коди)",
      dataIndex: "birka",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Бирка donasi",
      dataIndex: "birkaAm",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "1 ta korobkadagi sumka soni",
      dataIndex: "boxBagAm",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Jami korobka sonii",
      dataIndex: "totalBoxAm",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Ishlab chiqarilgan sumka soni",
      dataIndex: "amount",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "АҚШ долларида( $ )(1 дона сумка тикиш нархи)",
      dataIndex: "priceUs",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "ҚҚс сиз(сўмда)",
      dataIndex: "priceUz",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Жами тикиш харажати АҚШ долларида( $ ) ",
      dataIndex: "totalSewingPriceUs",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "ҚҚс сиз(сўмда)",
      dataIndex: "totalSewingPriceUz",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "ҚҚс bilan(сўмда)",
      dataIndex: "totalSewingPriceUzWithqq",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "№ (код) Bo'z",
      dataIndex: "fabCode",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Gr Bo'z",
      dataIndex: "fabAmountGr",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Эни Bo'z",
      dataIndex: "fabWidth",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Ранги Bo'z",
      dataIndex: "fabColor",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Ишлатилган бўз (мато) п/м",
      dataIndex: "exploitedFabPm",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "1 дона сумка учун ишлатилган бўз (м2)да",
      dataIndex: "exploitedBag",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Жами ишлатилган бўз нархи",
      dataIndex: "totalExploitedFab",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "АҚШ долларида( $ )",
      dataIndex: "totalPriceUsFab",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "ҚҚС сиз(сўмда)",
      dataIndex: "withoutQqUzFab",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "ҚҚС билан (сўмда)",
      dataIndex: "withQqUzFab",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "АҚШ долларида( $ ) (Жами бўз харажати)",
      dataIndex: "totalExpenseFab",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "ҚҚС сиз(сўмда)",
      dataIndex: "totalExpenseUzFab",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "ҚҚС билан(сўмда)",
      dataIndex: "totalExpenseWithQqUzFab",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "АҚШ долларида( $ ) (1 дона сумка ТАННАРХИ)",
      dataIndex: "costPriceUs",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "ҚҚС сиз(сўмда)",
      dataIndex: "costWithoutQqUz",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "ҚҚС билан(сўмда)",
      dataIndex: "costWithQqUz",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Сумка ўлчами",
      dataIndex: "limitedBagProp",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Даста ўлчами",
      dataIndex: "limitedGripProp",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "М2",
      dataIndex: "limitedM2",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Фарқи",
      dataIndex: "limitedDiff",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "ИЗОҲ",
      dataIndex: "description",
      width: "120px", // Adjusted for moderate space
    },
    {
      title: "Delete",
      fixed: "right",
      dataIndex: "delete",
      width: "80px", // Space for action button
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
      width: "80px", // Space for action button
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
              props.getStoreBags();
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
            props.getStoreBags();
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
        title="Omborga qo'shish"
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
            form="storeBagForm" // ID of the form
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
            id="storeBagForm"
            // initialValues={{ toolTypeId: "Uskuna turlari" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              label="Сумка ўлчами"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="propertyBag"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Даста ўлчами"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="propertyGrip"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Gr"
              rules={[{ required: true, message: "Gr kiritish majburiy" }]}
              required
              name="amountGr"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Ранги"
              rules={[{ required: true, message: "Ранги kiritish majburiy" }]}
              required
              name="color"
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
              label="Этикетка donasi"
              rules={[{ required: true, message: "Etiketkani kiritish majburiy" }]}
              required
              name="labelAm"
            >
              <Input placeholder="text" />
            </Form.Item>
           
            <Form.Item
              label="Этикетка (номи ё коди)"
              rules={[{ required: true, message: "Etiketkani kiritish majburiy" }]}
              required
              name="label"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Rang"
              rules={[{ required: true, message: "Rang kiritish majburiy" }]}
              required
              name="color"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Бирка (номи ё коди)"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="birka"
            >
              <Input placeholder="text" />
            </Form.Item>
            
            <Form.Item
              label="Бирка donasi"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="birkaAm"
            >
              <Input placeholder="text" />
            </Form.Item>
            
            <Form.Item
              label="Ishlab chiqarilgan sumka soni"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="amount"
            >
              <Input placeholder="text" />
            </Form.Item>
            
            <Form.Item
              label="1 ta korobkadagi sumka soni"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="boxBagAm"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="1 дона сумка тикиш нархи"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="priceUS"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="Umumiy tikish narxi"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="totalPrice"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="Bo'z kodi"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="fabCode"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="Gr Bo'z"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="fabAmountGr"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="Bo'z eni"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="fabWidth"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="Ранги Bo'z"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="fabColor"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="Ишлатилган бўз (мато) п/м"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="exploitedFabPm"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="Сумка ўлчами (МЕЪЁР БЎЙИЧА)"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="limitedBagProp"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="Даста ўлчами (МЕЪЁР БЎЙИЧА)"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="limitedGripProp"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="М2 (МЕЪЁР БЎЙИЧА)"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="limitedM2"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              label="Izoh"
              rules={[{ required: true, message: "Qiymat kiritish majburiy" }]}
              required
              name="description"
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
  (state) => state.storeBag,
  storeBagActions
)(TableStoreBag);
