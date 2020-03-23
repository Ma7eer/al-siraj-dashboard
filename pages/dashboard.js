import { Button } from "antd";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Dashboard page is under construction</h1>
      <Link href="/registration">
        <a>Go to Registration Page</a>
      </Link>
    </div>
  );
};

export default Dashboard;
