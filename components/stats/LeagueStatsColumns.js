import PlayerFilterDropdown from "./PlayerFilterDropdown";
import PlayerLink from "./PlayerLink";
import WeeksPlayedFilterDropdown from "./WeeksPlayedFilterDropdown";
import { onFilterNumeric } from "../../lib/LeagueStatsUtils.js";

export const getColumns = (rankKeyMap) => [
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
        dataIndex: "totalPoints52",
        key: "totalPoints52",
        sorter: (a, b) =>
          b[rankKeyMap["totalPoints52"]] - a[rankKeyMap["totalPoints52"]],
        sortDirections: ["descend", "ascend", "descend"],
        align: "center",
        width: 100,
      },
      {
        title: "Weeks Played",
        dataIndex: "weeksPlayed52",
        key: "weeksPlayed52",
        sorter: (a, b) =>
          b[rankKeyMap["weeksPlayed52"]] - a[rankKeyMap["weeksPlayed52"]],
        sortDirections: ["descend", "ascend", "descend"],
        align: "center",
        width: 100,
        onFilter: (value, record) =>
          onFilterNumeric(value, record, "weeksPlayed52"),
        filterDropdown: WeeksPlayedFilterDropdown,
      },
      {
        title: "Avg. Points",
        dataIndex: "averagePoints52",
        key: "averagePoints52",
        sorter: (a, b) =>
          b[rankKeyMap["averagePoints52"]] - a[rankKeyMap["averagePoints52"]],
        sortDirections: ["descend", "ascend", "descend"],
        align: "center",
        width: 100,
      },
      {
        title: "Win %",
        dataIndex: "winPercentage52",
        key: "winPercentage52",
        sorter: (a, b) =>
          b[rankKeyMap["winPercentage52"]] - a[rankKeyMap["winPercentage52"]],
        sortDirections: ["descend", "ascend", "descend"],
        align: "center",
        width: 100,
      },
      {
        title: "Avg. Position",
        dataIndex: "averagePosition52",
        key: "averagePosition52",
        sorter: (a, b) =>
          a[rankKeyMap["averagePosition52"]] -
          b[rankKeyMap["averagePosition52"]],
        sortDirections: ["ascend", "descend", "ascend"],
        align: "center",
        width: 100,
      },
    ],
  },
];
