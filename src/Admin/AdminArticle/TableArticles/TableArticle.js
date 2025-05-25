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
} from "antd";
import "./TableArticle.scss";
import { articleActions } from "../Redux/Reducers/ArticleReducer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TableArticle = (props) => {
  useEffect(() => {
    props.getArticles();
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
    });
    props.setCurrentItm(item);
  }
  function handleCopy(item) {
    props.setModalVisible();
    form.setFieldsValue({
      ...item,
    });
  }

  const [form] = Form.useForm();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 80,
    },
    {
      title: "Artikul ismi",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 150,
    },
    {
      title: "Eni",
      dataIndex: "width",
      width: 100,
    },
    {
      title: "Bo'yi",
      dataIndex: "height",
      width: 100,
    },
    {
      title: "Tomonlar soni",
      dataIndex: "sideNum",
      width: 100,
    },
    {
      title: "Tikish umumiy perimetr",
      dataIndex: "sewingPerimeter",
      width: 150,
    },
    {
      title: "Qirqish umumiy perimetr",
      dataIndex: "cuttingPerimeter",
      width: 150,
    },
    {
      title: "Kvadrati",
      dataIndex: "square",
      width: 100,
    },
    {
      title: "Tikish summasi",
      dataIndex: "betPrice",
      width: 120,
    },
    {
      title: "Qirqish bichish summasi",
      dataIndex: "cuttingPrice",
      width: 150,
    },
    {
      title: "Karobka summasi",
      dataIndex: "packPrice",
      width: 120,
    },
    {
      title: "Ip ochish summasi",
      dataIndex: "yarnPrice",
      width: 150,
    },
    {
      title: "Chip soni narxi",
      dataIndex: "chipPrice",
      width: 120,
    },
    {
      title: "Chistka soni narxi",
      dataIndex: "cleaningPrice",
      width: 150,
    },
    {
      title: "Tugma ochish narxi",
      dataIndex: "buttonOpenPrice",
      width: 150,
    },
    // {
    //   title: "Ip ochish soni narxi",
    //   dataIndex: "yarnOpenPrice",
    //   width: 150,
    // },
    {
      title: "Ko'k etiketka",
      dataIndex: "blueLabelPrice",
      width: 120,
    },
    {
      title: "Sariq chip narxi",
      dataIndex: "yellowChipPrice",
      width: 120,
    },
    {
      title: "Planka chizish",
      dataIndex: "plankPrice",
      width: 120,
    },
    {
      title: "Upakovka sumka narxi",
      dataIndex: "makePackPrice",
      width: 150,
    },
    {
      title: "Delete",
      dataIndex: "delete",
      fixed: 'right',
      width: 80,
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
      fixed: 'right',
      width: 80,
      render: (_, record) =>
        props.dataSource?.length >= 1 ? (
          <Button onClick={() => handleEdit(record)} type="primary">
            Edit
          </Button>
        ) : null,
    },
    {
      title: "Copy",
      dataIndex: "",
      fixed: 'right',
      width: 80,
      render: (_, record) =>
        props.dataSource?.length >= 1 ? (
          <Button onClick={() => handleCopy(record)} type="primary">
            Copy
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
              props.getArticles();
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
            props.getArticles();
          },
        }}
        scroll={{
          x: 1300,
        }}
        loading={props.loading}
        bordered
        dataSource={props.dataSource.map((item) => ({
          ...item,
          key: item.id, // Assuming 'id' is a unique identifier for each item
          // Other properties...
        }))}
        columns={columns}
      />
      <Modal
        title="Ishchi qo'shish"
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
            form="workerForm" // ID of the form
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
            id="workerForm"
            // initialValues={{ toolTypeId: "Uskuna turlari" }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              label="Ismi"
              // rules={[{ required: true, message: "Ismini kiritish majburiy" }]}
              // required
              name="name"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Eni"
              // rules={[{ required: true, message: "enini kiritish majburiy" }]}
              // required
              name="width"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Bo'yi"
              // rules={[{ required: true, message: "bo'yini kiritish majburiy" }]}
              // required
              name="height"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Tomonlar soni"
              // rules={[
              //   {
              //     required: true,
              //     message: "Tomonlar sonini kiritish majburiy",
              //   },
              // ]}
              // required
              name="sideNum"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Tikish rascenkasi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Tikish rascenkasini kiritish majburiy",
              //   },
              // ]}
              // required
              name="betPrice"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Qirqish, bichish rascenkasi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Qirqish, bichish rascenkasini kiritish majburiy",
              //   },
              // ]}
              // required
              name="cuttingPrice"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Ip ochish rascenkasi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Ip ochish rascenkasini kiritish majburiy",
              //   },
              // ]}
              // required
              name="yarnPrice"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Karobka rascenkasi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Karobka rascenkasini kiritish majburiy",
              //   },
              // ]}
              // required
              name="packPrice"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Chip soni narxi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Chip soni narxini kiritish majburiy",
              //   },
              // ]}
              // required
              name="chipPrice"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Chistka soni narxi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Chistka soni narxini kiritish majburiy",
              //   },
              // ]}
              // required
              name="cleaningPrice"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Tugma ochish soni narxi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Tugma ochish soni narxini kiritish majburiy",
              //   },
              // ]}
              // required
              name="buttonOpenPrice"
            >
              <Input placeholder="text" />
            </Form.Item>

            {/* <Form.Item
              label="Ip ochish soni narxi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Ip ochish soni narxini kiritish majburiy",
              //   },
              // ]}
              // required
              name="yarnOpenPrice"
            >
              <Input placeholder="text" />
            </Form.Item> */}

            <Form.Item
              label="Ko'k etiketka narxi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Ko'k etiketka narxini kiritish majburiy",
              //   },
              // ]}
              // required
              name="blueLabelPrice"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Etiketka narxi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Etiketka narxini kiritish majburiy",
              //   },
              // ]}
              // required
              name="labelPrice"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Sariq chip narxi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Sariq chip narxini kiritish majburiy",
              //   },
              // ]}
              // required
              name="yellowChipPrice"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Planka chizish narxi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Planka chizish narxini kiritish majburiy",
              //   },
              // ]}
              // required
              name="plankPrice"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Upakovka sumka narxi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Upakovka sumka narxini kiritish majburiy",
              //   },
              // ]}
              // required
              name="makePackPrice"
            >
              <Input placeholder="text" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default connect((state) => state.article, articleActions)(TableArticle);
