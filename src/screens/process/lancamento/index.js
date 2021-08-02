import { useState } from "react";
import {
  SearchOutlined,
  SettingTwoTone,
  CloudUploadOutlined,
  UploadOutlined,
  EditTwoTone,
  DeleteTwoTone,
  EyeTwoTone,
  SecurityScanTwoTone,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Layout,
  Menu,
  Modal,
  Popconfirm,
  Upload,
  Row,
  Space,
  Spin,
  Table,
  Tabs,
  Tooltip,
} from "antd";

import { useAppState } from "components/shared/AppProvider";

import { uploadFile } from "utils/functions";

const { Header } = Layout;
const TabPane = Tabs.TabPane;

import Form from "./form";

const Lancamento = () => {
  const [state, dispatch] = useAppState();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dataGrid, setDataGrid] = useState([]);
  const [tab, setTab] = useState("1");
  const [previewProps, setPreviewProps] = useState({
    previewImage: "",
    previewVisible: false,
    previewTitle: "",
  });
  const [scanProps, setScanProps] = useState({
    uid: "",
    name: "",
    path: "",
  });

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
      render: (text) => <span>{text.substring(0, 18)}</span>,
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
          <Tooltip title="Visualizar a imagem!">
            <EyeTwoTone
              twoToneColor="#3F7875"
              onClick={() => onPreview({ ...record })}
            />
          </Tooltip>
          <Tooltip title="Clique para excluir!">
            <Popconfirm
              title="Tem certeza que quer excluir esse registro?"
              onConfirm={() => onDelete(record.uid)}
              onCancel={() => console.log("Clicou no cancelar...")}
              okText="Sim"
              cancelText="Não"
            >
              <DeleteTwoTone twoToneColor="#FF0000" />
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Escanear imagem!">
            <SecurityScanTwoTone onClick={() => onScan({ ...record })} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const onChangeTab = (activeKey) => {
    setTab(activeKey);
  };
  const handleRemove = (file) => {
    setFileList((fileList) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      return [...newFileList];
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setDataGrid((dataGrid) => {
      return [];
    });

    setUploading(true);

    fileList.map(async (f) => {
      const { uid, name } = f;
      const { path } = await uploadFile(f, `doc_${uid}`, "docapi");
      const arq = {
        uid,
        name,
        path,
      };

      setDataGrid((dataGrid) => {
        const newData = [...dataGrid, arq];
        return [...newData];
      });
    });

    setTimeout(() => {
      setFileList(() => []);
      setUploading(false);
    }, 2000);
  };

  const onPreview = ({ path, name }) => {
    setPreviewProps({
      previewImage: path,
      previewVisible: true,
      previewTitle: name,
    });
  };

  const onDelete = (uid) => {
    setDataGrid((dataGrid) => {
      const newData = [...dataGrid.filter((item) => item.uid !== uid)];
      return [...newData];
    });
  };

  const onScan = async ({ uid, name, path }) => {
    //TODO --> Connect with microsoft API
    const res = await fetch("/api/docrecognize", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path }),
    });

    const result = await res.text();

    const { text } = JSON.parse(result);

    setScanProps({
      uid,
      name,
      path,
      text,
    });
    setTab("2");
  };

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
          <Avatar shape="circle" size={40} src="/images/system/upload.png" />

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
              Upload de Documentos
            </span>
            <small className="text-muted">
              <span>{`Upload e reconhecimento ${
                state.mobile ? "" : " de documentos"
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
        <Modal
          visible={previewProps.previewVisible}
          title={previewProps.previewTitle}
          footer={null}
          onCancel={() =>
            setPreviewProps({ ...previewProps, previewVisible: false })
          }
        >
          <img
            alt="imageUploaded"
            style={{ width: "100%" }}
            src={previewProps.previewImage}
          />
        </Modal>
        <Spin tip={"Carregando arquivo..."} spinning={uploading}>
          <Tabs
            type="card"
            activeKey={tab}
            onChange={onChangeTab}
            tabBarExtraContent={
              <Button onClick={() => console.log("Data: ", dataGrid)}>
                Novo Lançamento
              </Button>
            }
          >
            <TabPane className="p-4" tab="Dados" key="1">
              <Row
                style={{
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <Col span={18}>
                  <Upload
                    onRemove={handleRemove}
                    beforeUpload={(file) => setFileList([...fileList, file])}
                    fileList={fileList}
                  >
                    <Button>
                      <UploadOutlined />
                      Selecione o Arquivo
                    </Button>
                  </Upload>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    onClick={(e) => handleUpload(e)}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                  >
                    <CloudUploadOutlined />
                    {uploading ? "Subindo os arquivos" : "Fazer Upload"}
                  </Button>
                </Col>
              </Row>
              <Divider />
              <Table
                columns={columns}
                dataSource={dataGrid}
                pagination={{ defaultCurrent: 1, pageSize: 5 }}
              />
            </TabPane>
            <TabPane className="p-4" tab="Scan da Imagem" key="2">
              <Form scanProps={scanProps} />
            </TabPane>
          </Tabs>
        </Spin>
      </div>
    </Layout>
  );
};

export default Lancamento;
