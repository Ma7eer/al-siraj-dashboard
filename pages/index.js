import Link from "next/link";
import Head from "next/head";
import { useFormik } from "formik";

import { Button, Form, Card } from "antd";

import FormRow from "../components/FormElements/FormRow";
import TextInputWrapper from "../components/FormElements/TextInputWrapper";
import TextInput from "../components/FormElements/TextInput";

import "antd/dist/antd.css";
import "../public/css/indexPage.css";

const Index = () => {
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: (values, { resetForm }) => {
      // handleSubmit(values);
      resetForm({});
    }
  });
  return (
    <>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Amiri|Mada|Markazi+Text&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      <div
        className="container"
        // style={{
        //   display: "flex",
        //   justifyContent: "center",
        //   // marginTop: "6rem"
        //   padding: "100px 0"
        // }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // marginTop: "6rem"
            padding: "100px 0"
          }}
        >
          <Card hoverable style={{ width: "400px" }}>
            <h1 style={{ textAlign: "center" }}>تسجيل الدخول</h1>
            {/* <Link href="/dashboard">
        <a>Dashboard Page</a>
      </Link> */}
            <Form onSubmit={formik.handleSubmit} dir="rtl">
              <FormRow>
                <TextInputWrapper>
                  <TextInput
                    formik={formik}
                    englishValue="username"
                    arabicValue="اسم المستخدم"
                  />
                </TextInputWrapper>
              </FormRow>

              <FormRow>
                <TextInputWrapper>
                  <TextInput
                    formik={formik}
                    englishValue="password"
                    arabicValue="كلمة السر"
                  />
                </TextInputWrapper>
              </FormRow>

              <Button type="primary" block>
                <Link href="/dashboard">
                  <a>ادخال البيانات</a>
                </Link>
              </Button>
              <p style={{ textAlign: "center" }}>
                Click on button to navigate to dashboard page. The login is not
                yet functional
              </p>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Index;
