import { Layout } from "antd";
const { Header } = Layout;

import "../../public/css/navigationBar.css";

const NavigationBar = () => {
  return (
    <Header>
      <div className="logo" />
    </Header>
  );
};

export default NavigationBar;
