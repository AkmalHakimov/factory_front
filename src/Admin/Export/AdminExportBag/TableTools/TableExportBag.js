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
import "./TableExportBag.scss";
import "react-quill/dist/quill.snow.css";
import { exportBagActions } from "../Redux/Reducers/ExportBagReducer";
import dayjs from "dayjs";

const TableExportBag = (props) => {
  useEffect(() => {
    props.getExportBags();
    props.getFabOptions();
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
      title: "№ (код)",
      dataIndex: "code",
      width: "180px", // Increased width for longer codes
      fixed: "left",
    },
    {
      title: "Сана",
      dataIndex: "createdAt",
      width: "120px", // Date format width
    },
    {
      title: "БУЮРТМА РАҚАМИ",
      dataIndex: "orderNum",
      width: "140px", // Increased width for order numbers
    },
    {
      title: "Сумка ўлчами",
      dataIndex: "bagProp",
      width: "160px", // Increased width for bag property
    },
    {
      title: "Даста ўлчами",
      dataIndex: "gripProp",
      width: "160px", // Increased width for grip property
    },
    {
      title: "Гр",
      dataIndex: "fabGr",
      width: "100px", // Suitable for weight display
    },
    {
      title: "Ранги",
      dataIndex: "color",
      width: "100px", // Space for color name
    },
    {
      title: "Этикетка (номи ё коди)",
      dataIndex: "label",
      width: "150px", // Increased width for label text
    },
    {
      title: "Бирка (номи ё коди)",
      dataIndex: "birka",
      width: "150px", // Increased width for birka text
    },
    {
      title: "Донаси",
      dataIndex: "amount",
      width: "100px", // Space for numeric amount
    },
    {
      title: "Bir dona sumka tannarxi (dollar)",
      dataIndex: "costBagPrice",
      width: "180px", // Adjusted for price display
    },
    {
      title: "Bir dona sumka tannarxi ҚҚссиз (сўмда)",
      dataIndex: "priceWithoutqq",
      width: "220px", // Increased for clearer QQ price display
    },
    {
      title: "Жами сумка таннархи (dollar)",
      dataIndex: "costTotalBagPrice",
      width: "200px", // Increased width for total price
    },
    {
      title: "Жами сумка таннархи ҚҚссиз (сўмда)",
      dataIndex: "costTotalBagPriceWithoutqq",
      width: "220px", // Increased width for total price without QQ
    },
    {
      title: "1 дона сумка экспорт нархи (dollar)",
      dataIndex: "bagExportPrice",
      width: "180px", // Increased for export price
    },
    {
      title: "1 дона сумка экспорт нархи ҚҚссиз (сўмда)",
      dataIndex: "bagExportPriceWithoutqq",
      width: "220px", // Increased for clearer QQ price display
    },
    {
      title: "Фарқи АҚШ долларида ( $ )",
      dataIndex: "diffPrice",
      width: "180px", // Increased width for difference price
    },
    {
      title: "Фарқи ҚҚссиз (сўмда)",
      dataIndex: "diffPriceWithoutqq",
      width: "220px", // Increased for difference price without QQ
    },
    {
      title: "Жами сумка экспорт нархи (dollar)",
      dataIndex: "totalBagExportPrice",
      width: "200px", // Increased width for total export price
    },
    {
      title: "Жами сумка экспорт нархи ҚҚссиз (сўмда)",
      dataIndex: "totalBagExportPriceWithoutqq",
      width: "220px", // Increased for total export price without QQ
    },
    {
      title: "Umumiy farqi АҚШ долларида ( $ )",
      dataIndex: "totalDiff",
      width: "180px", // Increased width for total difference in USD
    },
    {
      title: "Umumiy farqi ҚҚссиз (сўмда)",
      dataIndex: "totalDiffWithoutqq",
      width: "220px", // Increased for total difference without QQ
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
              props.getExportBags();
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
            props.getExportBags();
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
        title="Export sumka qo'shish"
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
            form="exportBagForm" // ID of the form
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
            id="exportBagForm"
            initialValues={{ orderFabId: "Sumka order" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              name="orderFabId"
              rules={[{ required: true, message: "Sumka orderni tanlang" }]}
              required
              label="Sumka orderni tanlang"
              hasFeedback
            >
              <Select
              optionFilterProp="label"
              showSearch
              placeholder="Search to Select"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={props.fabOptions} />
            </Form.Item>

            <Form.Item
              label="Sanasi"
              rules={[{ required: true, message: "Sanani kiritish majburiy" }]}
              required
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
              label="Этикетка (номи ё коди)"
              rules={[
                { required: true, message: "Этикеткани кiritish majburiy" },
              ]}
              required
              name="label"
            >
              <Input placeholder="Этикеткани киритинг" />
            </Form.Item>

            <Form.Item
              label="Бирка (номи ё коди)"
              rules={[{ required: true, message: "Биркани киритиш majburiy" }]}
              required
              name="birka"
            >
              <Input placeholder="Биркани киритинг" />
            </Form.Item>

            <Form.Item
              label="Миқдори"
              rules={[{ required: true, message: "Миқдорни киритиш majburiy" }]}
              required
              name="amount"
            >
              <Input placeholder="Миқдорни киритинг" type="number" />
            </Form.Item>

            <Form.Item
              label="Сумка таннархи (dollar)"
              rules={[
                {
                  required: true,
                  message: "Сумка таннархини киритиш majburiy",
                },
              ]}
              required
              name="costBagPrice"
            >
              <Input placeholder="Сумка таннархини киритинг" type="number" />
            </Form.Item>

            <Form.Item
              label="Сумка экспорт нархи (dollar)"
              rules={[
                {
                  required: true,
                  message: "Сумка экспорт нархини киритиш majburiy",
                },
              ]}
              required
              name="bagExportPrice"
            >
              <Input
                placeholder="Сумка экспорт нархини киритинг"
                type="number"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default connect(
  (state) => state.exportBag,
  exportBagActions
)(TableExportBag);
