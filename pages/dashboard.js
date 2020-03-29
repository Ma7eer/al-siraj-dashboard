import { useRouter } from "next/router";

import { Layout, Card, message } from "antd";
const { Header, Content, Footer } = Layout;
const { Meta } = Card;

import "antd/dist/antd.css";
import "../public/css/dashboardCard.css";

const Dashboard = () => {
  const router = useRouter();
  return (
    <Layout className="layout">
      <Header style={{ marginBottom: "24px" }}>
        <div className="logo" />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div
          className="site-layout-content"
          style={{
            background: "#fff",
            padding: "24px",
            minHeight: "280px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          <Card
            hoverable
            style={{
              width: 340,
              backgroundColor: "#f0f2f5",
              padding: "20px",
              margin: "20px"
            }}
            className="dashboard-card"
            cover={
              <img
                className="stage-img"
                alt="stage1"
                src="/images/undraw_stage_1.svg"
              />
            }
            onClick={e => {
              e.preventDefault();
              router.push("/registration");
            }}
          >
            <Meta title="STAGE 1" description="Register new case" />
          </Card>
          <Card
            hoverable
            style={{
              width: 340,
              backgroundColor: "#f0f2f5",
              padding: "20px",
              margin: "20px"
            }}
            className="dashboard-card"
            cover={
              <img
                className="stage-img"
                alt="stage2"
                src="/images/undraw_stage_2.svg"
              />
            }
            onClick={() => message.warn("لا تملك الصلاحية للدخول الصفحة")}
          >
            <Meta title="STAGE 2" description="Study case" />
          </Card>
          <Card
            hoverable
            style={{
              width: 340,
              backgroundColor: "#f0f2f5",
              padding: "20px",
              margin: "20px"
            }}
            className="dashboard-card"
            cover={
              <img
                className="stage-img"
                alt="stage3"
                src="/images/undraw_stage_3.svg"
              />
            }
            onClick={() => message.warn("لا تملك الصلاحية للدخول الصفحة")}
          >
            <Meta title="STAGE 3" description="Final review" className="meta" />
          </Card>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center"
          // position: "fixed",
          // left: 0,
          // bottom: 0
          // width: "100%"
          // backgroundColor: "red",
          // color: "white"
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Dashboard;
