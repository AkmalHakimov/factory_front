import React, { useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  Input,
  Popconfirm,
  Table,
  Checkbox,
  Form,
  Select,
  DatePicker,
} from "antd";
import "./TableTool.scss";
import { expenseToolActions } from "../Redux/Reducers/ExpenseToolReducer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolActions } from "../../AdminBlog/Redux/Reducers/ToolReducer";
import dayjs from "dayjs";

const TableExpenseTool = (props) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const toolStates = useSelector((state) => state.tool);

  useEffect(() => {
    props.getExpenseTools();
    props.getCurrentDateTypes();
    dispatch(toolActions.getAllTools());
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
      toolId: {
        label: item.toolName,
        value: item.toolId,
      },
      // Ensure createdAt is formatted correctly
      createdAt: dayjs(item.createdAt).isValid() ? dayjs(item.createdAt) : null,
    });

    dispatch(
      toolActions.setToolsTypes([
        {
          label: item.toolTypeName,
          value: item.toolTypeId,
        },
      ])
    );
    props.setCurrentItm(item);
  }

  function formatNumber(num) {
    if (num == null) {
      return "0"; // or any placeholder you prefer, like an empty string
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function correctType(value) {
    if (value == "SUMKA") {
      return "Sumka";
    } else if (value == "CHOYSHAB") {
      return "Choyshab";
    } else {
      return "Salfetka";
    }
  }

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "10%",
    },
    {
      title: "Sana",
      dataIndex: "createdAt",
    },
    {
      title: "Tovar nomi",
      dataIndex: "toolName",
    },
    {
      title: "Tovar turi",
      dataIndex: "toolTypeName",
    },
    {
      title: "Chiqim turi",
      dataIndex: "expenseTypeName",
      // render: (text) => correctType(text)
    },
    {
      title: "Miqdori",
      dataIndex: "amount",
      render: (text) => formatNumber(text),
    },
    {
      title: "Chiqim narxi",
      dataIndex: "expensePrice",
      render: (text) => formatNumber(text),
    },
    {
      title: "Kirim narxi",
      dataIndex: "incomePrice",
      render: (text) => formatNumber(text),
    },
    {
      title: "Qoldiq",
      dataIndex: "leftAmount",
      render: (text) => formatNumber(text),
    },
    {
      title: "Summasi",
      dataIndex: "sumExpense",
      render: (text) => formatNumber(text),
    },
    {
      title: "Izoh",
      dataIndex: "description",
      width: "50%",
      render: (text) => (
        <div style={{ 
          whiteSpace: 'normal', // Allows text to wrap
          wordBreak: 'break-word', // Prevents text from overflowing
          maxHeight: '100px', // Limits the height
          overflow: 'auto', // Adds scroll if text exceeds height
          padding: '10px', // Adds some padding for better readability
          backgroundColor: '#f9f9f9', // Light background color
          borderRadius: '4px' // Softens the edges
        }}>
          {text}
        </div>
      )
    },
    {
  title: "Delete",
  dataIndex: "delete",
  render: (_, record) => {
    return props.dataSource?.length >= 1 ? (
      <Popconfirm
        title="Sure to delete?"
        onConfirm={() => props.handleDel(record.id)}
      >
        <Button type="primary">Delete</Button>
      </Popconfirm>
    ) : null;
  },
},

    {
      title: "Edit",
      dataIndex: "",
      render: (_, record) =>
        props.dataSource?.length >= 1 ? (
          <Button onClick={() => handleEdit(record)} type="primary">
            Edit
          </Button>
        ) : null,
    },
  ];

  const handleDateChange = (date, item) => {
    props.setDateVal(item);
  
    props.getExpenseTools();
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div
          style={{ width: 600 }}
          className="d-flex align-items-center justify-content-between"
        >
          <Button
            onClick={() => props.setModalVisible()}
            type="primary"
          >
            Add a row
          </Button>
          <Select
            defaultValue="Uskunalar"
            onChange={(val) => {
              props.setSelectVal(val);
              props.getExpenseTools();
            }}
            style={{
              width: 500,
              marginLeft: "20px"
            }}
            options={toolStates.toolOptions}
          />

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
            }}
          />
        </div>

        <div>
          <Input
            value={props.searchInp}
            onChange={(e) => {
              props.setSearchInp(e.target.value);
              props.getExpenseTools();
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
            props.getExpenseTools();
          },
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
        title="Chiqim qo'shish"
        width={1000}
        centered
        open={props.modalVisible}
        // onCancel={() => {
        //   form.resetFields();
        //   props.setModalVisible();
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
            form="toolExpenseForm" // ID of the form
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
            id="toolExpenseForm"
            initialValues={{
              toolId: "Uskunalar",
              expenseTypeId: "Chiqim turlari",
              toolTypeId: "Uskuna turi",
            }} // Set initial values here
            onFinish={(value) => props.handleSave({ value })}
          >
            <Form.Item
              name="toolId"
              rules={[{ required: true, message: "Uskunani tanlang" }]}
              required
              label="Uskunani tanlang"
              hasFeedback
            >
              <Select
                onChange={(value) => dispatch(toolActions.getOneTool(value))}
                optionFilterProp="label"
                showSearch
                placeholder="Search to Select"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={toolStates.toolOptions}
              />
            </Form.Item>

            <Form.Item
              name="toolTypeId"
              rules={[{ required: true, message: "Uskunani turini tanlang" }]}
              required
              label="Uskuna turini tanlang"
              hasFeedback
            >
              {toolStates.toolsToolTypes.length > 0 ? (
                <Select
                  onChange={(value) => props.getLeftAmount(value)}
                  optionFilterProp="label"
                showSearch
                placeholder="Search to Select"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                  options={toolStates.toolsToolTypes}
                />
              ) : (
                <Select disabled />
              )}
            </Form.Item>

            <Form.Item
              name="expenseTypeId"
              // rules={[{ required: true, message: "Chiqim turini tanlang" }]}
              required
              label="Chiqim turini tanlang"
              hasFeedback
            >
              <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={props.currentDateTypes} />
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
              label="Midori"
              rules={[{ required: true, message: "Miqdorni tanlash majburiy" }]}
              required
              validateStatus={
                props.leftAmount && props.leftAmount > 0 ? "warning" : ""
              }
              help={
                props.leftAmount && props.leftAmount > 0
                  ? `Miqdor ${props.leftAmount} dan oshmasligi kerak`
                  : ""
              }
              name="amount"
            >
              <Input placeholder="text" />
            </Form.Item>
            <Form.Item
              required
              // rules={[{ required: false, message: "Narxni tanlash majburiy" }]}
              name="price"
              label="Narxi"
            >
              <Input placeholder="text" />
            </Form.Item>

            <Form.Item
              // rules={[
              //   { required: fals3, message: "Uskuna markasini tanlash majburiy" },
              // ]}
              required
              label="Izoh"
              name="description"
            >
              <Input.TextArea placeholder="text" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default connect(
  (state) => state.expenseTool,
  expenseToolActions
)(TableExpenseTool);
