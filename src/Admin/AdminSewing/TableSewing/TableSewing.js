import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
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
} from "antd";
import "./TableSewing.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { articleActions } from "../../AdminArticle/Redux/Reducers/ArticleReducer";
import { workerActions } from "../../AdminWorker/Redux/Reducers/WorkerReducer";
import { boxActions, sewingActions } from "../Redux/Reducers/SewingReducer";

const TableSewing = (props) => {
  const dispatch = useDispatch();
  const artStates = useSelector((state) => state.article);
  const workerStates = useSelector((state) => state.worker);

  useEffect(() => {
    props.getSewings();
    dispatch(articleActions.getAll());
    dispatch(workerActions.getAll());
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
      // articleId: {
      //   label: item.name,
      //   value: item.articleId,
      // },
      // workerId: {
      //   label: item.firstName + item.lastName,
      //   value: item.workerId,
      // },
      // Ensure createdAt is formatted correctly
      createdAt: dayjs(item.createdAt).isValid() ? dayjs(item.createdAt) : null,
    });

    dispatch(
      workerActions.setWorkerOptions([
        {
          label: item.firstName + item.lastName,
          value: item.workerId,
        },
      ])
    );

    dispatch(
      articleActions.setArticleOptions([
        {
          label: item.name,
          value: item.articleId,
        },
      ])
    );
    props.setCurrentItm(item);
  }
  function handleCopy(item) {
    props.setModalVisible();
    form.setFieldsValue({
      ...item,
      // articleId: {
      //   label: item.name,
      //   value: item.articleId,
      // },
      // workerId: {
      //   label: item.firstName + item.lastName,
      //   value: item.workerId,
      // },
      // Ensure createdAt is formatted correctly
      createdAt: dayjs(item.createdAt).isValid() ? dayjs(item.createdAt) : null,
    });

    // dispatch(
    //   workerActions.setWorkerOptions([
    //     {
    //       label: item.firstName + item.lastName,
    //       value: item.workerId,
    //     },
    //   ])
    // );

    // dispatch(
    //   articleActions.setArticleOptions([
    //     {
    //       label: item.name,
    //       value: item.articleId,
    //     },
    //   ])
    // );
  }

  function formatNumber(num) {
    if (num == null) {
      return "0"; // or any placeholder you prefer, like an empty string
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [form] = Form.useForm();

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: 80,
      fixed: "left",
    },
    {
      title: "Ismi",
      dataIndex: "firstName",
      fixed: "left",
      width: 120,
    },
    {
      title: "Familiyasi",
      dataIndex: "lastName",
      fixed: "left",
      width: 120,
    },
    {
      title: "Sana",
      dataIndex: "createdAt",
      width: 150,
    },
    {
      title: "Artikul",
      dataIndex: "name",
      width: 120,
    },
    {
      title: "Buyurtma raqami",
      dataIndex: "orderNum",
      width: 150,
    },
    {
      title: "Art.mater",
      dataIndex: "artMat",
      width: 120,
    },
    {
      title: "Artikul perimeter",
      dataIndex: "artPerimeter",
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: "Soni",
      dataIndex: "count",
      width: 100,
      render: (text) => formatNumber(text),
    },
    {
      title: "Umumiy perimeter ",
      dataIndex: "totalPerimeter",
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: "Tikish rascenkasi",
      dataIndex: "betPrice",
      width: 120,
      render: (text) => formatNumber(text),
    },
    {
      title: "Tikish summasi",
      dataIndex: "sewingPrice",
      width: 120,
      render: (text) => formatNumber(text),
    },
    {
      title: "Chip soni",
      dataIndex: "chipCount",
      width: 120,
      render: (text) => formatNumber(text),
    },
    {
      title: "Chip qo'yish summasi",
      dataIndex: "chipPrice",
      width: 150,
      render: (text) => formatNumber(text),
    },

    {
      title: "Chistka soni",
      dataIndex: "cleaningCount",
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: "Chistka summasi",
      dataIndex: "cleaningPrice",
      width: 120,
      render: (text) => formatNumber(text),
    },
    {
      title: "Tugma ochish soni",
      dataIndex: "buttonOpenCount",
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: "Tugma ochish summasi",
      dataIndex: "buttonOpenPrice",
      width: 120,
      render: (text) => formatNumber(text),
    },
    {
      title: "Ip ochish soni",
      dataIndex: "yarnOpenCount",
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: "Ip ochish summasi",
      dataIndex: "yarnOpenPrice",
      width: 100,
      render: (text) => formatNumber(text),
    },
    {
      title: "Ko'k etiketka ",
      dataIndex: "blueLabel",
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: "Etiketka urish summasi",
      dataIndex: "blueLabelPrice",
      width: 120,
      render: (text) => formatNumber(text),
    },
    {
      title: "Sariq chip",
      dataIndex: "yellowChip",
      width: 120,
      render: (text) => formatNumber(text),
    },
    {
      title: "Sariq chip summasi",
      dataIndex: "yellowChipPrice",
      width: 120,
      render: (text) => formatNumber(text),
    },
    {
      title: "Planka chizish",
      dataIndex: "plankDrawing",
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: "Planka chizish summasi",
      dataIndex: "plankPrice",
      width: 150,
      render: (text) => formatNumber(text),
    },

    {
      title: "Upakovka sumka",
      dataIndex: "packBag",
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: "Upakovka sumka summasi",
      dataIndex: "makePackPrice",
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      width: 80,
      fixed: "right",
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
      width: 80,
      fixed: "right",
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
      width: 80,
      fixed: "right",
      render: (_, record) =>
        props.dataSource?.length >= 1 ? (
          <Button onClick={() => handleCopy(record)} type="primary">
            Copy
          </Button>
        ) : null,
    },
  ];

  const handleDateChange = (date, item) => {
    props.setDateVal(item);
  
    props.getSewings();
  };

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

          <DatePicker
            format={{
              format: "DD-MM-YYYY",
              type: "mask",
            }}
            // defaultValue={getOneMonthAgo()}
            onChange={handleDateChange}
            style={{
              width: "100%",
              margin: "10px",
              marginTop: 0
            }}
          />
        </div>

        <div>
          <Input
            value={props.searchInp}
            onChange={(e) => {
              props.setSearchInp(e.target.value);
              props.getSewings();
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
            props.getSewings();
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
        title="Tikish qo'shish"
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
            form="sewingForm" // ID of the form
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
            id="sewingForm"
            initialValues={{
              articleId: "Artikulni turlari",
              workerId: "Mavjud ishchilar",
            }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              label="Sana"
              // rules={[{ required: true, message: "Sanani kiritish majburiy" }]}
              // required
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
              name="articleId"
              rules={[{ required: true, message: "Artikulni tanlang" }]}
              required
              label="Artikulni tanlang"
              hasFeedback
            >
              <Select
                // onChange={(value) => dispatch(articleActions.getOneTool(value))}
                optionFilterProp="label"
                showSearch
                placeholder="Search to Select"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={artStates.articleOptions}
              />
            </Form.Item>

            <Form.Item
              name="workerId"
              rules={[{ required: true, message: "Ishchi tanlang" }]}
              required
              label="Ischi tanlang"
              hasFeedback
            >
              <Select
                // onChange={(value) => dispatch(articleActions.getOneTool(value))}
                optionFilterProp="label"
                showSearch
                placeholder="Search to Select"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={workerStates.workerOptions}
              />
            </Form.Item>

            <Form.Item
              name="artMat"
              label="Art.Mater"
              // rules={[
              //   {
              //     required: true,
              //     message: "Art.Materni kiritish majburiy",
              //   },
              // ]}
              // required
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              name="orderNum"
              label="Buyurtma soni"
              // rules={[
              //   {
              //     required: true,
              //     message: "Buyurtma raqamini kiritish majburiy",
              //   },
              // ]}
              // required
            >
              <Input placeholder="text" />
            </Form.Item>  

            <Form.Item
              label="Soni"
              // rules={[{ required: true, message: "Sonini kiritish majburiy" }]}
              // required
              name="count"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              name="cleaningCount"
              label="Chistka soni"
              // rules={[
              //   {
              //     required: true,
              //     message: "Chistka sonini kiritish majburiy",
              //   },
              // ]}
              // required
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Chip soni"
              // rules={[
              //   {
              //     required: true,
              //     message: "Chip sonni kiritish majburiy",
              //   },
              // ]}
              // required
              name="chipCount"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              name="buttonOpenCount"
              label="Tugma ochish soni"
              // rules={[
              //   {
              //     required: true,
              //     message: "Tugma ochish sonini kiritish majburiy",
              //   },
              // ]}
              // required
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              name="yarnOpenCount"
              label="Ip ochish soni"
              // rules={[
              //   {
              //     required: true,
              //     message: "Ip ochish sonini kiritish majburiy",
              //   },
              // ]}
              // required
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              name="blueLabel"
              label="Ko'k etiketka"
              // rules={[
              //   {
              //     required: true,
              //     message: "Ko'k etiketkani kiritish majburiy",
              //   },
              // ]}
              // required
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              name="yellowChip"
              label="Sariq chip"
              // rules={[
              //   {
              //     required: true,
              //     message: "Sariq chipni kiritish majburiy",
              //   },
              // ]}
              // required
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              name="plankDrawing"
              label="Planka chizish"
              // rules={[
              //   {
              //     required: true,
              //     message: "Planka chizishni kiritish majburiy",
              //   },
              // ]}
              // required
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              name="packBag"
              label="Upakovka sumka"
              // rules={[
              //   {
              //     required: true,
              //     message: "Upakovka sumkani kiritish majburiy",
              //   },
              // ]}
              // required
            >
              <Input placeholder="text" />
            </Form.Item>

            

      
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default connect((state) => state.sewing, sewingActions)(TableSewing);
