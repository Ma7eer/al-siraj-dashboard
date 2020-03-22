import PropTypes from "prop-types";
import { Button } from "antd";
import {
  PlusOutlined,
  PlusCircleOutlined,
  PlusSquareFilled,
  PrinterFilled
} from "@ant-design/icons";

import "../../public/css/buttons.css";

const TableButtonBar = ({ showModal }) => {
  return (
    <div style={{ marginRight: "20px" }}>
      <Button
        onClick={showModal}
        // size="small"
        type="primary"
        id="btn-custom-green"
      >
        <PlusSquareFilled style={{ marginLeft: "4px" }} />
        <span>جديد</span>
      </Button>
      <Button
        onClick={showModal}
        // size="small"
        type="primary"
        id="btn-custom-blue"
      >
        <PrinterFilled style={{ marginLeft: "4px" }} />
        <span>طباعة</span>
      </Button>
    </div>
  );
};

TableButtonBar.propTypes = {
  showModal: PropTypes.func
};

export default TableButtonBar;
