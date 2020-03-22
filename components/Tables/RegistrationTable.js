import { useState, useRef } from "react";
import Link from "next/link";
import { Layout, Typography, Button, Table, Input, Tag } from "antd";
import { SearchOutlined, FileFilled } from "@ant-design/icons";

const RegistrationTable = ({ data, handleEdit, handleDelete, loading }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={"SearchOutlined"}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: () => <span>رقم الاستمارة</span>,
      dataIndex: "applicationId",
      key: "applicationId",
      ...getColumnSearchProps("applicationId"),
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },

    {
      title: "الاسم",
      dataIndex: "applicantName",
      key: "applicantName",
      // width: "30%",
      ...getColumnSearchProps("applicantName"),
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: "رقم البطاقة الشخصية",
      dataIndex: "applicantCivilNumber",
      key: "applicantCivilNumber",
      // width: "30%",
      ...getColumnSearchProps("applicantCivilNumber"),
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: "رقم الهاتف",
      dataIndex: "applicantPhone",
      key: "applicantPhone",
      // width: "30%",
      ...getColumnSearchProps("applicantPhone"),
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>{text}</div>
      )
    },
    {
      title: "نوع المساعدة",
      dataIndex: "assistance",
      key: "assistance",
      // width: "30%",
      ...getColumnSearchProps("assistance"),
      render: (text, record) => {
        console.log(text);
        return (
          <div
          // style={{ textAlign: "center" }}
          >
            {text.map(t => (
              <Tag color="blue">{t}</Tag>
            ))}
          </div>
        );
      }
    },
    {
      title: "",
      key: "action",
      render: (row, record) => {
        return (
          <span>
            <Button size="small">
              <Link
                href={`/files?applicantCivilNumber=${row.applicantCivilNumber}`}
                as={`/files`}
              >
                <a>
                  المرفقات <FileFilled />
                </a>
              </Link>
            </Button>

            <Button
              onClick={() => handleEdit(row)}
              id="btn-custom-yellow"
              type="primary"
              size="small"
            >
              تعديل
            </Button>
            <Button
              onClick={() => handleDelete(row)}
              type="danger"
              size="small"
            >
              حذف
            </Button>
          </span>
        );
      }
    }
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      style={{ margin: "20px", textAlign: "center" }}
      bordered={true}
      loading={loading}
    />
  );
};

export default RegistrationTable;
