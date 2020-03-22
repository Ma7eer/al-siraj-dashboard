const TextInputWrapper = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        flexGrow: 1
      }}
    >
      {children}
    </div>
  );
};

export default TextInputWrapper;
