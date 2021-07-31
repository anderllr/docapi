import { SearchOutlined, SettingTwoTone } from "@ant-design/icons";
import { Avatar, Button, Divider, Input, Layout, Menu, Row, Tabs } from "antd";

import { useAppState } from "components/shared/AppProvider";

const { Header } = Layout;
const TabPane = Tabs.TabPane;
const Search = Input.Search;

import Form from "./form";
import Grid from "./grid";

const Users = () => {
  const [state, dispatch] = useAppState();

  return (
    <Layout className="fill-workspace rounded shadow-sm overflow-hidden bg-white">
      <Header
        css={`
          display: flex;
          align-items: center;
          padding: 0.3rem 2rem;
          z-index: 1;
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02);
          height: auto;
          line-height: auto;
        `}
      >
        <Row type="flex" align="middle">
          <Avatar shape="circle" size={40} src="/images/system/users.jpg" />

          <span
            className="mx-3"
            css={`
              line-height: 1;
            `}
          >
            <span
              css={`
                display: block;
              `}
            >
              Cadastro de Usuários
            </span>
            <small className="text-muted">
              <span>{`Cadastro e Permissões de Acesso${
                state.mobile ? "" : " ao Sistema"
              }`}</span>
            </small>
          </span>
        </Row>
        <span className="mr-auto" />
        <Menu mode="horizontal" className="border-0">
          <Menu.Item>
            <SearchOutlined style={{ fontSize: "20px" }} />
          </Menu.Item>
          <Menu.Item>
            <SettingTwoTone style={{ fontSize: "20px" }} />
          </Menu.Item>
        </Menu>
      </Header>
      {/* AQUI COMEÇA O FORMULÁRIO DE FATO */}
      <div className="card-container p-4">
        <Tabs
          type="card"
          defaultActiveKey="1"
          tabBarExtraContent={<Button>Novo Lançamento</Button>}
        >
          <TabPane className="p-4" tab="Dados" key="1">
            <Search
              placeholder="Informe o dado que quer pesquisar"
              enterButton="Buscar"
              size="large"
              onSearch={(value) => console.log(value)}
            />
            <Divider />
            <Grid />
          </TabPane>
          <TabPane className="p-4" tab="Lançamento" key="2">
            <Form />
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Users;
