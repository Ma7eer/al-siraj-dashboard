import { useRouter } from "next/router";
import { Layout, Table, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

import { useState, useEffect } from "react";
import Axios from "axios";
import download from "downloadjs";

import "antd/dist/antd.css";
import "../public/css/table.css";

const url = "http://localhost:3001";

const Files = () => {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { applicantCivilNumber } = router.query;

  const fetchData = async () => {
    await setLoading(true);
    let res = await Axios({
      method: "GET",
      url: `${url}/documents/${applicantCivilNumber}`
    });

    if (res.status === 200) {
      let formattedData = [];
      res.data.fileList.forEach((file, index) => {
        formattedData.push({
          fileName: file,
          key: index + 1
        });
      });

      await setFileData(formattedData);
      await setLoading(false);
    } else {
      await message.error("فشل في تحميل البيانات");
    }
  };

  useEffect(() => {
    fetchData().then(() => message.success("نم تحميل البيانات"));
  }, []);

  const columns = [
    {
      title: "رقم",
      dataIndex: "key",
      key: "key",
      render: text => <div style={{ textAlign: "center" }}>{text}</div>
    },
    {
      title: "اسم الملف",
      dataIndex: "fileName",
      key: "fileName",
      render: text => (
        <div style={{ textAlign: "center" }}>
          <a
            href="#"
            onClick={async e => {
              try {
                e.preventDefault();
                const res2 = await Axios({
                  method: "get",
                  url: `${url}/documents/${applicantCivilNumber}/${text}`,
                  responseType: "blob"
                });
                const blob = await new Blob([res2.data]);
                download(blob, text);
              } catch (error) {
                // console.log(error);
                await message.error("فشل في تحميل البيانات");
              }
            }}
          >
            {text}
          </a>
        </div>
      )
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <Button
            type="danger"
            onClick={async () => {
              try {
                await setLoading(true);
                if (await confirm("هل تريد مسح الملف؟")) {
                  let res = await Axios({
                    method: "delete",
                    url: `${url}/documents/${applicantCivilNumber}/${text.fileName}`
                  });
                  if (res.status === 200) {
                    await fetchData();
                    await setLoading(false);
                    await message.success("تم مسح الملف");
                  }
                } else {
                  // Do nothing!
                  setLoading(false);
                }
              } catch (error) {
                // console.log(error);
                setLoading("فشل في مسح الملف");
              }
              await fetchData();
            }}
          >
            حذف
          </Button>
        </div>
      )
    }
  ];

  return (
    <div dir="rtl">
      <Layout className="layout">
        <Header>
          <div
            className="logo"
            style={{
              width: "120px",
              height: "31px",
              background: "rgba(255, 255, 255, 0.2)",
              margin: "16px 24px 16px 0",
              float: "left"
            }}
          />
        </Header>
        <Content
          style={{ padding: "20px", background: "#fff", margin: "20px" }}
        >
          <form
            onSubmit={async e => {
              try {
                e.preventDefault();
                await setLoading(true);
                const data = await new FormData();
                await data.append("file", file);

                let res = await Axios({
                  method: "post",
                  url: `${url}/documents/${applicantCivilNumber}`,
                  data: data
                });

                if (res.status === 200) {
                  await fetchData();
                  await setFile(null);
                  await setLoading(false);
                  await message.success("تم رفع الملف");
                }
              } catch (error) {
                // console.log(error);
                await setFile(null);
                await message.error("فشل في رفع الملف");
              }
            }}
          >
            <input
              type="file"
              name="file"
              onChange={e => setFile(e.target.files[0])}
            />
            <input
              type="text"
              value={applicantCivilNumber}
              style={{ display: "none" }}
            />
            <Button htmlType="submit">
              <UploadOutlined style={{ marginLeft: "5px" }} />
              رفع الملف
            </Button>
          </form>

          <Table
            columns={columns}
            dataSource={fileData}
            bordered={true}
            loading={loading}
          />
        </Content>
        <Footer style={{ textAlign: "center" }}>صناعة شركة العنصر</Footer>
      </Layout>
    </div>
  );
};

export default Files;
