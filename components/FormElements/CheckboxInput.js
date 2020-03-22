import { Checkbox } from "antd";
const checkboxLabelStyle = { marginBottom: "4px", marginLeft: "6px" };

const CheckboxInput = ({ formik, englishValue, arabicValue }) => {
  return (
    <>
      <label htmlFor={englishValue} style={checkboxLabelStyle}>
        {arabicValue}
      </label>
      <Checkbox
        id={englishValue}
        name={englishValue}
        checked={formik.values[englishValue]}
        onChange={formik.handleChange}
      />
    </>
  );
};

export default CheckboxInput;
