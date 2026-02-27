"use client";
import React, { useState, useMemo } from "react";
import { ConfigProvider, Table, theme } from "antd";
import SectionLabel from "./SectionLabel";
import { getColumns } from "./LeagueStatsColumns";
import { rankKeyMap } from "../../lib/LeaguePlayerSorter.js";

function getSortedPlayerStats(playerStats, sortedInfo) {
  if (!sortedInfo.columnKey) return playerStats;
  return playerStats.map((stat) => ({
    ...stat,
    rank: stat[rankKeyMap[sortedInfo.columnKey]],
  }));
}

function StatsTable({ playerStats }) {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const columns = useMemo(() => getColumns(rankKeyMap), []);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const sortedPlayerStats = useMemo(
    () => getSortedPlayerStats(playerStats, sortedInfo),
    [playerStats, sortedInfo],
  );

  return (
    <div className="flex flex-col h-dvh gap-2 w-full py-2">
      <SectionLabel>Stats Table</SectionLabel>
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
