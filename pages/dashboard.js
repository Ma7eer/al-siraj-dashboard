import { Button } from "antd";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div>
      <p>This is the dashboard page</p>
      <Button type="primary">Submit</Button>
      <Link href="/registration">
        <a>Registration Page</a>
      </Link>
    </div>
  );
};

export default Dashboard;
