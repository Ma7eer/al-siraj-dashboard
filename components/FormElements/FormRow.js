const formRowStyle = {
  display: "flex",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  marginBottom: "20px"
};
const FormRow = ({ children }) => {
  return <div style={formRowStyle}>{children}</div>;
};

export default FormRow;
