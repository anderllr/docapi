import { Popconfirm, Space, Table, Tag } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

const columns = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Usuário",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (status) => (
      <span>
        <Tag color={status === "ATIVO" ? "blue" : "red"} key={status}>
          {status}
        </Tag>
      </span>
    ),
  },
  {
    title: "Ações",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <EditTwoTone onClick={() => setFormData({ ...record })} />
        <Popconfirm
          title="Tem certeza que quer excluir esse registro?"
          onConfirm={() => onDelete(record.name)}
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

const data = [
  {
    key: "1",
    name: "João Neto",
    username: "joao",
    email: "joao@docapi.com",
    status: "ATIVO",
  },
  {
    key: "2",
    name: "Romario Silva",
    username: "romario",
    email: "romario@docapi.com",
    status: "ATIVO",
  },
  {
    key: "3",
    name: "Maria Joana",
    username: "maria",
    email: "maria@docapi.com",
    status: "CANCELADO",
  },
];

const Component = () => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={{ defaultCurrent: 1, pageSize: 5 }}
  />
);
export default Component;
