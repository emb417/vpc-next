import { Button, Input, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";

export default function WeeksPlayedFilterDropdown({ setSelectedKeys, selectedKeys, confirm, clearFilters }) {
    return (
      <div style={{ padding: 8 }}>
        <Select
          value={selectedKeys[0] ? selectedKeys[0].split(",")[0] : "gt"}
          onChange={(value) => {
            setSelectedKeys([
              `${value},${selectedKeys[0] ? selectedKeys[0].split(",")[1] : ""}`,
            ]);
          }}
          style={{ width: 130, marginRight: 8 }}
        >
          <Select.Option value="gt">Greater than</Select.Option>
          <Select.Option value="lt">Less than</Select.Option>
          <Select.Option value="eq">Equals</Select.Option>
        </Select>
        <Input
          type="number"
          placeholder="# of weeks"
          value={selectedKeys[0] ? selectedKeys[0].split(",")[1] : ""}
          onChange={(e) => {
            setSelectedKeys([
              `${selectedKeys[0] ? selectedKeys[0].split(",")[0] : "gt"},${e.target.value}`,
            ]);
          }}
          onPressEnter={() => confirm()}
          style={{ width: 110, marginRight: 8 }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<FilterOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Filter
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