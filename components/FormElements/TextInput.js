import { Input } from "antd";
const textInputStyle = { marginBottom: "4px" };

const TextInput = ({ formik, englishValue, arabicValue }) => {
  return (
    <>
      <label htmlFor={englishValue} style={textInputStyle}>
        {arabicValue}
      </label>
      <Input
        id={englishValue}
        name={englishValue}
        type="text"
        placeholder={arabicValue}
        onChange={formik.handleChange}
        value={formik.values[englishValue]}
      />
    </>
  );
};

export default TextInput;
