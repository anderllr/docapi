import { Button, Col, Divider, Form, Input, Row, Space, Tooltip } from "antd";
import React, { useState } from "react";

import { QuestionCircleOutlined } from "@ant-design/icons";
import ImgUpload from "common/ImgUpload";

const UserForm = () => {
  const [img, setImg] = useState(null);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  function handleUpload(file) {
    setImg(file);
  }

  function handleRemove() {
    setImg(null);
  }

  return (
    <Form form={form} name="userForm" onFinish={onFinish} scrollToFirstError>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            name="username"
            label={
              <span>
                Usuário&nbsp;
                <Tooltip title="Usuário/Login que será usado para acesso ao sistema!">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: "Por favor informe o nome do usuário!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Nome"
            rules={[
              {
                required: true,
                message: "O nome é obrigatório!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="status" label="Status">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={10}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "O E-mail informado não é válido!",
              },
              {
                required: true,
                message: "Por favor informe seu E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            name="password"
            label="Senha"
            rules={[
              {
                required: true,
                message: "Por favor informe a senha!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            name="confirm"
            label="Confirme a Senha"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Confirme sua senha!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor={"imgSection"}>Foto</label> <br />
          <ImgUpload
            name="imgFoto"
            handleUpload={handleUpload}
            handleRemove={handleRemove}
            imgUrl={"" /* TODO linkar a imagem*/}
          />
        </Col>
      </Row>
      <Divider />

      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Space>
            <Button>Limpar Campos</Button>

            <Button type="primary" htmlType="submit">
              Salvar Dados
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default UserForm;
