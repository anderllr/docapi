import { Popconfirm, Space, Table, Tag } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

const columns = [
  {
    title: "ID",
    dataIndex: "uid",
    key: "uid",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Arquivo",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Caminho",
    dataIndex: "path",
    key: "path",
  },
  {
    title: "Ações",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <EditTwoTone onClick={() => setFormData({ ...record })} />
        <Popconfirm
          title="Tem certeza que quer excluir esse registro?"
          onConfirm={() => onDelete(record.uid)}
          onCancel={() => console.log("Clicou no cancelar...")}
          okText="Sim"
          cancelText="Não"
        >
          <DeleteTwoTone twoToneColor="#FF0000" />
        </Popconfirm>
      </Space>
    ),
  },
];
const Component = ({ data }) => {
  console.log("Data (grid): ", data);
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ defaultCurrent: 1, pageSize: 5 }}
    />
  );
};
export default Component;
