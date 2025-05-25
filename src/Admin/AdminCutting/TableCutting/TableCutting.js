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
import "./TableCutting.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { articleActions } from "../../AdminArticle/Redux/Reducers/ArticleReducer";
import { workerActions } from "../../AdminWorker/Redux/Reducers/WorkerReducer";
import { boxActions, sewingActions } from "../Redux/Reducers/CuttingReducer";
import { cuttingActions } from "../Redux/Reducers/CuttingReducer";

const TableCutting = (props) => {
  const dispatch = useDispatch();
  const artStates = useSelector((state) => state.article);
  const workerStates = useSelector((state) => state.worker);

  useEffect(() => {
    props.getCuttings();
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
      title: "Eni",
      dataIndex: "width",
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: "Bo'yi",
      dataIndex: "height",
      width: 100,
      render: (text) => formatNumber(text),
    },
    {
      title: "Tanlash, eni va bo'yi",
      dataIndex: "sideOption",
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: "Tayyor mahsulot soni",
      dataIndex: "readyProdCount",
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: "Perimeter",
      dataIndex: "perimeter",
      width: 120,
      render: (text) => formatNumber(text),
    },
    {
      title: "Tayyor mahsulot jami perimeter",
      dataIndex: "totalPerimeter  ",
      width: 150,
      render: (text) => formatNumber(text),
    },
    {
      title: "Rascenkasi",
      dataIndex: "rascenka",
      width: 150,
      render: (text) => formatNumber(text),
    },

    {
      title: "Qirqish summasi",
      dataIndex: "cuttingPrice",
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
  
    props.getCuttings();
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
              props.getCuttings();
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
            props.getCuttings();
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
        title="Qirqish qo'shish"
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
            form="cuttingForm" // ID of the form
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
            id="cuttingForm"
            initialValues={{
              // articleId: "Artikulni turlari",
              // workerId: "Mavjud ishchilar",
              sideOption: "Eni yoki bo'yi",
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
              label="Tayyor mahsulot soni"
              // rules={[{ required: true, message: "Tayyor mahsulot sonini kiritish majburiy" }]}
              // required
              name="readyProdCount"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              label="Eni yoki bo'yi"
              // rules={[
              //   {
              //     required: true,
              //     message: "Eni yoki bo'yini kiritish majburiy",
              //   },
              // ]}
              // required
              name="sideOption"
            >
              <Select
                options={[
                  {
                    label: "Eni",
                    value: "WIDTH",
                  },
                  {
                    label: "Bo'yi",
                    value: "HEIGHT",
                  },
                ]}
              />
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
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default connect((state) => state.cutting, cuttingActions)(TableCutting);
