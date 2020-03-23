import { useEffect, useState } from "react";
import Axios from "axios";
import { Layout, message, Modal } from "antd";

const { Footer } = Layout;

import API_BASE_URL from "../api/url";

import Form from "../components/Forms/RegistrationForm";
import Table from "../components/Tables/RegistrationTable";
import NavigationBar from "../components/LayoutElements/NavigationBar";
import PageTitle from "../components/LayoutElements/PageTitle";
import TableButtonBar from "../components/TableElements/TableButtonsBar";

import "antd/dist/antd.css";

const manifest = {
  data: {
    applicationId: "",
    applicantName: "",
    applicantCivilNumber: "",
    applicantPhone: "",
    applicantGovernorate: "",
    applicantState: "",
    assistance: []
    // medicalTreatment: false,
    // medicalNeeds: false,
    // generalAssistance: false,
    // electronics: false,
    // education: false,
    // socialSupport: false
  }
};

const Registration = () => {
  const [formData, setFormData] = useState(manifest.data);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("DEFAULT");

  const fetchData = async () => {
    try {
      // loading while awaiting data fetching
      await setLoading(true);

      // fetch data
      let res = await Axios({
        method: "GET",
        url: API_BASE_URL
      });

      // if we get a 200 response
      if (res.status === 200) {
        // we take all the data and format it to fit the table schema
        let formattedData = [];

        res.data.applicants.forEach((applicant, index) => {
          let assistanceArr = [];

          for (let val in applicant.assistance) {
            if (applicant.assistance[val]) {
              assistanceArr.push(val);
            }
          }

          let tableSchema = {
            key: index,
            applicationId: applicant.applicationId,
            applicantName: applicant.applicantName,
            applicantCivilNumber: applicant.applicantCivilNumber,
            applicantPhone: applicant.applicantPhone,
            applicantGovernorate: applicant.applicantGovernorate,
            applicantState: applicant.applicantState,
            assistance: assistanceArr
          };

          formattedData.push(tableSchema);
        });

        setTableData(formattedData);
        setLoading(false);
        // message.success("تم تحميل البيانات");
      }
    } catch (error) {
      // console.log(error);
      message.error("فشل في تحميل البيانات");
    }
  };

  useEffect(() => {
    fetchData().then(() => message.success("تم تحميل البيانات"));
  }, []);

  const handleSubmit = async values => {
    try {
      await setLoading(true);
      let formattedData = await {
        applicationId: values.applicationId,
        applicantName: values.applicantName,
        applicantCivilNumber: values.applicantCivilNumber,
        applicantPhone: values.applicantPhone,
        applicantGovernorate: values.applicantGovernorate,
        applicantState: values.applicantState,
        assistance: {
          medicalTreatment: values.medicalTreatment ? true : false,
          medicalNeeds: values.medicalNeeds ? true : false,
          generalAssistance: values.generalAssistance ? true : false,
          electronics: values.electronics ? true : false,
          education: values.education ? true : false,
          socialSupport: values.socialSupport ? true : false
        }
      };

      if (mode === "DEFAULT") {
        let res = await Axios.post(API_BASE_URL, formattedData);
        if (res.status === 200) {
          setTableData(prevState => [...prevState, values]);
          message.success("تم اضافة حالة جديدة");
        }
      } else if (mode === "EDIT") {
        // get one based on civil id
        let res = await Axios({
          method: "GET",
          url: `${API_BASE_URL}/${values.applicantCivilNumber}`
        });

        if (res.status === 200) {
          let formattedEditData = await {
            applicationId: values.applicationId,
            applicantName: values.applicantName,
            applicantCivilNumber: values.applicantCivilNumber,
            applicantPhone: values.applicantPhone,
            applicantGovernorate: values.applicantGovernorate,
            applicantState: values.applicantState,
            assistance: {
              medicalTreatment: values.medicalTreatment ? true : false,
              medicalNeeds: values.medicalNeeds ? true : false,
              generalAssistance: values.generalAssistance ? true : false,
              electronics: values.electronics ? true : false,
              education: values.education ? true : false,
              socialSupport: values.socialSupport ? true : false
            }
          };

          let res2 = await Axios({
            method: "PATCH",
            url: `${API_BASE_URL}/${res.data.applicant[0]._id}`,
            data: formattedEditData
          });

          if (res2.status === 200) {
            await fetchData();
          }
        }
      }

      await setLoading(false);
      await setVisible(false);
      await setMode("DEFAULT");
      message.success("تم تعديل البيانات");
    } catch (error) {
      setLoading(false);
      // console.log(error);
      message.error("فشل في تعديل البيانات");
    }
  };

  const handleEdit = async rowValues => {
    try {
      await setMode("EDIT");

      await setFormData(rowValues);

      await showModal();

      await setLoading(true);
    } catch (error) {
      // console.log(error);
      message.error("فشل في تعديل البيانات");
    }
  };

  const handleDelete = async rowValues => {
    try {
      let res = await Axios({
        method: "DELETE",
        url: `${API_BASE_URL}/${rowValues.applicantCivilNumber}`
      });
      if (res.status === 200) {
        await setLoading(true);
        await fetchData();
        message.success("تم مسح الحالة");
      }
      await setLoading(false);
    } catch (error) {
      // console.log(error);
      message.error("فشل في مسح البيانات");
    }
  };

  const showModal = () => {
    setVisible(true);
    setLoading(true);
  };

  const handleOk = async () => {
    await setMode("DEFAULT");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = async () => {
    await setMode("DEFAULT");
    await setLoading(false);
    await setVisible(false);
    await setFormData(manifest.data);
  };

  return (
    <div dir="rtl">
      <Layout className="layout">
        <NavigationBar />
        <PageTitle />
        <TableButtonBar showModal={showModal} />
        {/* destroyOnClose is true to allow setting of form value on edit more */}
        <Modal
          visible={visible}
          title="استمارة التسجيل"
          onOk={handleOk}
          onCancel={handleCancel}
          width={620}
          footer={[]}
          // closable={false}
          afterClose={() => setMode("DEFAULT")}
          destroyOnClose={true}
        >
          <Form formData={formData} handleSubmit={handleSubmit} />
        </Modal>
        <Table
          data={tableData}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          loading={loading}
        />
        <Footer style={{ textAlign: "center" }}>صناعة شركة العنصر</Footer>
      </Layout>
    </div>
  );
};

export default Registration;
