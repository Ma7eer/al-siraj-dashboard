import { Button, Form, Select, Tag, Card } from "antd";
import { useFormik, Formik, Field } from "formik";

const { Option } = Select;

import FormRow from "../FormElements/FormRow";
import TextInputWrapper from "../FormElements/TextInputWrapper";
import TextInput from "../FormElements/TextInput";
import CheckboxInputWrapper from "../FormElements/CheckboxInputWrapper";
import CheckboxInput from "../FormElements/CheckboxInput";

import "../../public/css/form.css";

const RegistrationForm = ({ formData, formValidation, handleSubmit }) => {
  const formik = useFormik({
    initialValues: formData,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm({});
    },
    validationSchema: formValidation
  });

  return (
    <Form onSubmit={formik.handleSubmit} dir="rtl">
      <FormRow>
        <TextInputWrapper>
          <TextInput
            formik={formik}
            englishValue="applicationId"
            arabicValue="رقم الاستمارة"
          />
        </TextInputWrapper>
        <TextInputWrapper>
          <TextInput
            formik={formik}
            englishValue="applicantName"
            arabicValue="الاسم"
          />
        </TextInputWrapper>
        <TextInputWrapper>
          <TextInput
            formik={formik}
            englishValue="applicantCivilNumber"
            arabicValue="رقم البطاقة الشخصية"
          />
        </TextInputWrapper>
        <TextInputWrapper>
          <TextInput
            formik={formik}
            englishValue="applicantPhone"
            arabicValue="رقم الهاتف"
          />
        </TextInputWrapper>
      </FormRow>

      {/* next row */}

      <FormRow>
        <TextInputWrapper>
          <TextInput
            formik={formik}
            englishValue="applicantGovernorate"
            arabicValue="المحافظة"
          />
        </TextInputWrapper>
        <TextInputWrapper>
          <TextInput
            formik={formik}
            englishValue="applicantState"
            arabicValue="الولاية"
          />
        </TextInputWrapper>
      </FormRow>

      {/* next row */}

      <FormRow>
        <CheckboxInputWrapper>
          <CheckboxInput
            formik={formik}
            englishValue="medicalTreatment"
            arabicValue="مساعدة علاج"
          />
        </CheckboxInputWrapper>
        <CheckboxInputWrapper>
          <CheckboxInput
            formik={formik}
            englishValue="medicalNeeds"
            arabicValue="مساعدة طبية"
          />
        </CheckboxInputWrapper>
        <CheckboxInputWrapper>
          <CheckboxInput
            formik={formik}
            englishValue="generalAssistance"
            arabicValue="فك كربة"
          />
        </CheckboxInputWrapper>
      </FormRow>

      <FormRow>
        <CheckboxInputWrapper>
          <CheckboxInput
            formik={formik}
            englishValue="electronics"
            arabicValue="ادوات الكترونية"
          />
        </CheckboxInputWrapper>
        <CheckboxInputWrapper>
          <CheckboxInput
            formik={formik}
            englishValue="education"
            arabicValue="مساعدة دراسة"
          />
        </CheckboxInputWrapper>
        <CheckboxInputWrapper>
          <CheckboxInput
            formik={formik}
            englishValue="socialSupport"
            arabicValue="مساعدة اجتماعية"
          />
        </CheckboxInputWrapper>
      </FormRow>

      <Button type="primary" block htmlType="submit">
        ادخال البيانات
      </Button>
    </Form>
  );
};

export default RegistrationForm;

{
  /* <FormRow>
<select
  multiple="multiple"
  style={{ width: "100%" }}
  name="assistance"
  value={formik.values.assistance}
  placeholder="اختلر نوع المساعدة"
  onChange={evt =>
    setFieldValue(
      "names",
      [].slice
        .call(evt.target.selectedOptions)
        .map(option => option.value)
    )
  }
>
  <option value={"medicalTreatment"}>
    {/* <Tag color="blue"> */
}
//     medicalTreatment
//     {/* </Tag> */}
//   </option>
//   <option value="medicalNeeds">
//     {/* <Tag color="purple"> */}
//     medicalNeeds
//     {/* </Tag> */}
//   </option>
//   <option value="generalAssistance">
//     {/* <Tag color="red"> */}
//     generalAssistance
//     {/* </Tag> */}
//   </option>
//   <option value="electronics">
//     {/* <Tag color="volcano"> */}
//     electronics
//     {/* </Tag> */}
//   </option>
//   <option value="education">
//     {/* <Tag color="cyan"> */}
//     education
//     {/* </Tag> */}
//   </option>
//   <option value="socialSupport">
//     {/* <Tag color="magenta"> */}
//     socialSupport
//     {/* </Tag> */}
//   </option>
// </select>
// </FormRow> */}
