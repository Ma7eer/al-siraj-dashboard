import Link from "next/link";
import "antd/dist/antd.css";

const Index = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <Link href="/dashboard">
        <a>Dashboard Page</a>
      </Link>
    </div>
  );
};

export default Index;
