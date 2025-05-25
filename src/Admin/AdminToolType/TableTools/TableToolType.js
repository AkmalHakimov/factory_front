import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Button, Modal, Input, Popconfirm, Table, Checkbox,Form,Select } from "antd";
import "./TableToolType.scss";
import { toolTypeActions } from "../Redux/Reducers/ToolTypeReducer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TableToolType = (props) => {
  useEffect(() => {
    props.getToolTypes();
  }, []);

  const [form] = Form.useForm();

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "10%",
    },
    {
      title: "Ismi",
      dataIndex: "name",
      with: "70%"
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (_, record) =>
        props.dataSource?.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => props.delItem(record.id)}
          >
            <Button type="primary">Delete</Button>
          </Popconfirm>
        ) : null,
    },
    {
      title: "Edit",
      dataIndex: "",
      render: (_, record) =>
        props.dataSource?.length >= 1 ? (
          <Button onClick={() => props.handleEdit(record)} type="primary">  
            Edit
          </Button>
        ) : null,
    },
  ];
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <Button
          onClick={() => props.setTypeModalVisible()}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <div>
          <Input
            value={props.searchInp}
            onChange={(e) => {
              props.setSearchInp(e.target.value);
              props.getToolTypes();
              // props.getTools();
            }}
            placeholder="search by name"
          ></Input>
        </div>
      </div>
      <Table
        pagination={{
          pageSize: 6,
          total: props.totalPages,
          onChange: (page)=>{
            props.setPage(page  )
            props.getToolTypes()
          }
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
         title="Yo'nalish"
         open={props.typeModalVisible}
         onOk={()=>props.handleSave()}
         onCancel={()=>props.setTypeModalVisible()}
      >
         <Input
          value={props.nameInp}
          onChange={(e) =>props.setName(e.target.value)}
          placeholder="name"
        ></Input>
        
      </Modal>
    </div>
  );
};
export default connect((state) => state.toolType, toolTypeActions)(TableToolType);
