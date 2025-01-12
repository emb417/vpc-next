"use client";
import React, { useState } from "react";
import Link from "next/link";
import PlayerImage from "@/components/player/PlayerImage";
import { ConfigProvider, Input, Button, Select, Table, theme } from "antd";
import { FilterOutlined } from "@ant-design/icons";

function StatsTable({ playerStats }) {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      align: "center",
      width: 40,
      fixed: "left",
    },
    {
      title: "Players",
      children: [
        {
          title: "Name",
          dataIndex: "username",
          key: "username",
          sorter: (a, b) => a.username.localeCompare(b.username),
          align: "left",
          width: 100,
          fixed: "left",
          onFilter: (value, record) => record.username.includes(value),
          filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
          }) => (
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
          ),
          render: (text, record) => (
            <Link href={`/player/${text}`} className="hover:text-orange-300">
              <div className="flex items-center">
                <PlayerImage
                  src={record.userAvatarUrl}
                  alt={record.username}
                  width={16}
                  height={16}
                />
                <div className="truncate pl-1">{text}</div>
              </div>
            </Link>
          ),
        },
      ],
    },
    {
      title: "13-Week Statistics",
      children: [
        {
          title: "Total Points",
          dataIndex: "recentTotalPoints",
          key: "recentTotalPoints",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.recentTotalPoints - b.recentTotalPoints,
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
        },
        {
          title: "Weeks Played",
          dataIndex: "recentWeeksPlayed",
          key: "recentWeeksPlayed",
          sorter: (a, b) => a.recentWeeksPlayed - b.recentWeeksPlayed,
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
          onFilter: (value, record) => {
            const [operator, filterValue] = value.split(",");
            const recentWeeksPlayed = record.recentWeeksPlayed;
            switch (operator) {
              case "gt":
                return recentWeeksPlayed > Number(filterValue);
              case "lt":
                return recentWeeksPlayed < Number(filterValue);
              case "eq":
                return recentWeeksPlayed === Number(filterValue);
              default:
                return true;
            }
          },
          filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
          }) => (
            <div style={{ padding: 8 }}>
              <Select
                value={selectedKeys[0] ? selectedKeys[0].split(",")[0] : "gt"}
                onChange={(value) => {
                  setSelectedKeys([
                    `${value},${
                      selectedKeys[0] ? selectedKeys[0].split(",")[1] : ""
                    }`,
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
                    `${
                      selectedKeys[0] ? selectedKeys[0].split(",")[0] : "gt"
                    },${e.target.value}`,
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
          ),
        },
        {
          title: "Avg. Points",
          dataIndex: "recentAveragePoints",
          key: "recentAveragePoints",
          sorter: (a, b) => a.recentAveragePoints - b.recentAveragePoints,
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
        },
        {
          title: "Win %",
          dataIndex: "recentWinPercentage",
          key: "recentWinPercentage",
          sorter: (a, b) => a.recentWinPercentage - b.recentWinPercentage,
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
        },
        {
          title: "Avg. Position",
          dataIndex: "recentAveragePosition",
          key: "recentAveragePosition",
          sorter: (a, b) => a.recentAveragePosition - b.recentAveragePosition,
          sortDirections: ["ascend", "descend", "ascend"],
          align: "center",
          width: 100,
        },
      ],
    },
    {
      title: "52-Week Statistics",
      children: [
        {
          title: "Total Points",
          dataIndex: "totalPoints",
          key: "totalPoints",
          sorter: (a, b) => a.totalPoints - b.totalPoints,
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
        },
        {
          title: "Weeks Played",
          dataIndex: "weeksPlayed",
          key: "weeksPlayed",
          sorter: (a, b) => a.weeksPlayed - b.weeksPlayed,
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
          onFilter: (value, record) => {
            const [operator, filterValue] = value.split(",");
            const weeksPlayed = record.weeksPlayed;
            switch (operator) {
              case "gt":
                return weeksPlayed > Number(filterValue);
              case "lt":
                return weeksPlayed < Number(filterValue);
              case "eq":
                return weeksPlayed === Number(filterValue);
              default:
                return true;
            }
          },
          filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
          }) => (
            <div style={{ padding: 8 }}>
              <Select
                value={selectedKeys[0] ? selectedKeys[0].split(",")[0] : "gt"}
                onChange={(value) => {
                  setSelectedKeys([
                    `${value},${
                      selectedKeys[0] ? selectedKeys[0].split(",")[1] : ""
                    }`,
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
                    `${
                      selectedKeys[0] ? selectedKeys[0].split(",")[0] : "gt"
                    },${e.target.value}`,
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
          ),
        },
        {
          title: "Avg. Points",
          dataIndex: "averagePoints",
          key: "averagePoints",
          sorter: (a, b) => a.averagePoints - b.averagePoints,
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
        },
        {
          title: "Win %",
          dataIndex: "winPercentage",
          key: "winPercentage",
          sorter: (a, b) => a.winPercentage - b.winPercentage,
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
        },
        {
          title: "Avg. Position",
          dataIndex: "averagePosition",
          key: "averagePosition",
          sorter: (a, b) => a.averagePosition - b.averagePosition,
          sortDirections: ["ascend", "descend", "ascend"],
          align: "center",
          width: 100,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-dvh gap-2 w-full py-2">
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Table
          bordered={true}
          colorBgContainer="#111111"
          size="small"
          rowKey={"username"}
          columns={columns}
          filteredInfo={filteredInfo}
          onFilterChange={handleChange}
          dataSource={playerStats}
          pagination={false}
          scroll={{ x: "max-content" }}
          sticky
        />
      </ConfigProvider>
      <hr className="border-1 border-orange-900" />
    </div>
  );
}

export default StatsTable;
