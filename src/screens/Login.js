import { Button, Checkbox, Form, Image, Input, Message, Row } from "antd";
import {
  UnlockTwoTone,
  IdcardTwoTone,
  SnippetsTwoTone,
} from "@ant-design/icons";

import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { useAppState } from "components/shared/AppProvider";

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const Login = ({ form }) => {
  const [state] = useAppState();
  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      className="px-3 bg-white mh-page"
      style={{ minHeight: "100vh" }}
    >
      <Content>
        <div className="text-center mb-5">
          <Link href="/login">
            <a className="brand mr-0">
              {/*  <Image
                preview={false}
                width={state.mobile ? "100%" : "55%"}
                src="/images/normal_logo.png" 
                alt={`logo`}
             /> */}
              <SnippetsTwoTone style={{ fontSize: "20px" }} />
              <strong className="text-black">docApi</strong>
            </a>
          </Link>
        </div>

        <Form
          layout="vertical"
          onFinish={() => {
            console.log("Submeteu...");
            Message.success("Login efetuado. Você será redirecionado!");
            Router.push("/");
          }}
        >
          <FormItem
            label="Usuário"
            name="username"
            rules={[
              {
                required: true,
                message: "Por favor informe o usuário!",
              },
            ]}
          >
            <Input
              prefix={<IdcardTwoTone style={{ fontSize: "16px" }} />}
              type="text"
              placeholder="Usuário"
            />
          </FormItem>

          <FormItem
            label="Senha"
            name="password"
            rules={[
              { required: true, message: "Por favor informe sua senha!" },
            ]}
          >
            <Input
              prefix={<UnlockTwoTone style={{ fontSize: "16px" }} />}
              type="password"
              placeholder="Senha"
            />
          </FormItem>

          <FormItem name="remember" valuePropName="checked" initialValue={true}>
            <Checkbox>Lembrar-me</Checkbox>
            <Link href="/forgot">
              <a
                className={`${
                  state.direction === "rtl" ? "text-xs-left" : "text-xs-right"
                }`}
              >
                <small>Esqueci minha senha</small>
              </a>
            </Link>
            <Button type="primary" htmlType="submit" block className="mt-3">
              Acessar o Sistema
            </Button>
          </FormItem>
        </Form>
      </Content>
    </Row>
  );
};

export default Login;
