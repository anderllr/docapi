import { HomeTwoTone, ShoppingTwoTone, DiffTwoTone } from "@ant-design/icons";

export default [
  {
    path: "/",
    name: "Home",
    icon: <HomeTwoTone style={{ fontSize: "16px" }} />,
  },
  {
    name: "Cadastros",
    icon: <ShoppingTwoTone style={{ fontSize: "16px" }} />,
    children: [
      {
        path: "/cadastros/users",
        name: "Usuários",
      },
      {
        path: "/cadastros/configuracao",
        name: "Configuração",
      },
    ],
  },
  {
    name: "Lançamentos",
    icon: <DiffTwoTone style={{ fontSize: "16px" }} />,
    children: [
      {
        path: "/lancamentos/upload",
        name: "Upload",
      },
      {
        path: "/lancamentos/monitor",
        name: "Monitor",
        badge: {
          value: "7",
        },
      },
    ],
  },
];
