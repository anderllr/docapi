import { Button, Col, Divider, Form, Input, Row, Popover, Tooltip } from "antd";
import React, { useRef, useState, useEffect } from "react";

import { QuestionCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const UserForm = ({ scanProps }) => {
  const { uid, name, path, text } = scanProps;
  const [popover, setPopover] = useState(false);
  const [textPretty, setTextPretty] = useState("");
  const textAreaRef = useRef(null);

  const [form] = Form.useForm();

  useEffect(() => {
    const t = JSON.stringify(JSON.parse(text), undefined, 4);
    setTextPretty(t);
  }, [text]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const copyToClipboard = () => {
    setPopover(true);
    navigator.clipboard.writeText(text);

    setTimeout(() => {
      setPopover(false);
    }, 2000);
  };

  return (
    <Form
      form={form}
      initialValues={(uid, name, path, text)}
      name="userForm"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Row gutter={16}>
        <Col span={8}>
          <label htmlFor={"textTranslated"}>
            <span>
              ID&nbsp;
              <Tooltip title="ID único do arquivo!">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          </label>
          <br />
          <Input name="uid" value={uid} disabled />
        </Col>
        <Col span={16}>
          <label htmlFor={"textTranslated"}>Nome do Arquivo</label>
          <br />
          <Input name="name" value={name} disabled />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <label htmlFor={"textTranslated"}>Caminho do Arquivo</label>
          <br />
          <Input name="path" value={path} disabled />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <label htmlFor={"textTranslated"}>Resultado da API</label> <br />
          <TextArea
            ref={textAreaRef}
            showCount
            readOnly
            autoSize={{ minRows: 5 }}
            value={textPretty}
          />
        </Col>
      </Row>
      <Divider />

      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Popover
            trigger="click"
            visible={popover}
            content={"Texto copiado para a área de transferência!"}
          >
            <Button onClick={() => copyToClipboard()} type="primary">
              Copiar para área de transferência
            </Button>
          </Popover>
        </Col>
      </Row>
    </Form>
  );
};

export default UserForm;
