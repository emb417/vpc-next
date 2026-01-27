"use client";
import React, { useState, useMemo } from "react";
import PlayerFilterDropdown from "@/components/stats/PlayerFilterDropdown";
import PlayerLink from "@/components/stats/PlayerLink";
import WeeksPlayedFilterDropdown from "@/components/stats/WeeksPlayedFilterDropdown";
import { ConfigProvider, Table, theme } from "antd";

function onFilterNumeric(value, record, operator) {
  const [op, filterValue] = value.split(",");
  const numberValue = record[operator];
  switch (op) {
    case "gt":
      return numberValue > Number(filterValue);
    case "lt":
      return numberValue < Number(filterValue);
    case "eq":
      return numberValue === Number(filterValue);
    default:
      return true;
  }
}

function getSortedPlayerStats(playerStats, sortedInfo, rankKeyMap) {
  if (!sortedInfo.columnKey) return playerStats;

  return playerStats.map((stat) => ({
    ...stat,
    rank: stat[rankKeyMap[sortedInfo.columnKey]],
  }));
}

function StatsTable({ playerStats, rankKeyMap }) {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const columns = [
    {
      title: "#",
      dataIndex: "rank",
      key: "rank",
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
          filterDropdown: PlayerFilterDropdown,
          render: PlayerLink,
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
          sorter: (a, b) =>
            b[rankKeyMap["recentTotalPoints"]] -
            a[rankKeyMap["recentTotalPoints"]],
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
        },
        {
          title: "Weeks Played",
          dataIndex: "recentWeeksPlayed",
          key: "recentWeeksPlayed",
          sorter: (a, b) =>
            b[rankKeyMap["recentWeeksPlayed"]] -
            a[rankKeyMap["recentWeeksPlayed"]],
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
          onFilter: (value, record) =>
            onFilterNumeric(value, record, "recentWeeksPlayed"),
          filterDropdown: WeeksPlayedFilterDropdown,
        },
        {
          title: "Avg. Points",
          dataIndex: "recentAveragePoints",
          key: "recentAveragePoints",
          sorter: (a, b) =>
            b[rankKeyMap["recentAveragePoints"]] -
            a[rankKeyMap["recentAveragePoints"]],
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
        },
        {
          title: "Win %",
          dataIndex: "recentWinPercentage",
          key: "recentWinPercentage",
          sorter: (a, b) =>
            b[rankKeyMap["recentWinPercentage"]] -
            a[rankKeyMap["recentWinPercentage"]],
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
        },
        {
          title: "Avg. Position",
          dataIndex: "recentAveragePosition",
          key: "recentAveragePosition",
          sorter: (a, b) =>
            a[rankKeyMap["recentAveragePosition"]] -
            b[rankKeyMap["recentAveragePosition"]],
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
          sorter: (a, b) =>
            b[rankKeyMap["totalPoints"]] - a[rankKeyMap["totalPoints"]],
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
        },
        {
          title: "Weeks Played",
          dataIndex: "weeksPlayed",
          key: "weeksPlayed",
          sorter: (a, b) =>
            b[rankKeyMap["weeksPlayed"]] - a[rankKeyMap["weeksPlayed"]],
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
          onFilter: (value, record) =>
            onFilterNumeric(value, record, "weeksPlayed"),
          filterDropdown: WeeksPlayedFilterDropdown,
        },
        {
          title: "Avg. Points",
          dataIndex: "averagePoints",
          key: "averagePoints",
          sorter: (a, b) =>
            b[rankKeyMap["averagePoints"]] - a[rankKeyMap["averagePoints"]],
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
        },
        {
          title: "Win %",
          dataIndex: "winPercentage",
          key: "winPercentage",
          sorter: (a, b) =>
            b[rankKeyMap["winPercentage"]] - a[rankKeyMap["winPercentage"]],
          sortDirections: ["descend", "ascend", "descend"],
          align: "center",
          width: 100,
        },
        {
          title: "Avg. Position",
          dataIndex: "averagePosition",
          key: "averagePosition",
          sorter: (a, b) =>
            a[rankKeyMap["averagePosition"]] - b[rankKeyMap["averagePosition"]],
          sortDirections: ["ascend", "descend", "ascend"],
          align: "center",
          width: 100,
        },
      ],
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const sortedPlayerStats = useMemo(
    () => getSortedPlayerStats(playerStats, sortedInfo, rankKeyMap),
    [playerStats, sortedInfo, rankKeyMap],
  );

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
          onChange={handleChange}
          dataSource={sortedPlayerStats}
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
