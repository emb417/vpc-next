import { FilterOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

export default function PlayerFilterDropdown({ setSelectedKeys, selectedKeys, confirm, clearFilters }) {
    return (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search"
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<FilterOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            clearFilters();
            confirm();
          }}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    );
  }