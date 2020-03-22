const CheckboxInputWrapper = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        padding: "5px",
        margin: "10px",
        flexGrow: 1
      }}
    >
      {children}
    </div>
  );
};

export default CheckboxInputWrapper;
