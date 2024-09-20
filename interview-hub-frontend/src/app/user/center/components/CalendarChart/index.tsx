import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import { message, Spin } from "antd";
import { getUserSignInRecordUsingGet } from "@/api/userController";
import "./index.css";

const CalendarChart = (props: Props) => {
  // 签到日期列表（[1, 200]，表示第 1 和第 200 天有签到记录）
  const [dataList, setDataList] = useState<number[]>([]);
  // 加载状态
  const [loading, setLoading] = useState<boolean>(false);
  // 当前年份
  const year = new Date().getFullYear();

  // 请求后端获取数据
  const fetchDataList = async () => {
    setLoading(true);
    try {
      const res = await getUserSignInRecordUsingGet({ year });
      setDataList(res.data);
    } catch (e) {
      message.error("获取刷题签到记录失败，" + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  // 计算图表所需的数据
  const optionsData = dataList.map((dayOfYear) => {
    const dateStr = dayjs(`${year}-01-01`)
      .add(dayOfYear - 1, "day")
      .format("YYYY-MM-DD");
    return [dateStr, 1];
  });

  // 图表配置
  const options = {
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        // 更明显的颜色渐变，从浅灰色到深绿色
        color: ["#eeeeee", "#90ee90"],
      },
    },
    calendar: {
      range: [`${year}-01-01`, `${year}-12-31`], // 修改为具体的日期范围
      left: 20,
      top: 20,
      cellSize: ["auto", 20], // 调整单元格高度
      itemStyle: {
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 4, // 圆角
        shadowColor: "rgba(0, 0, 0, 0.1)", // 阴影效果
        shadowBlur: 5,
      },
      yearLabel: {
        position: "top",
        formatter: `${year} 年刷题记录`,
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
      },
      dayLabel: {
        firstDay: 1,
        nameMap: "cn",
        color: "#333",
      },
      monthLabel: {
        nameMap: "cn",
        fontSize: 12,
        color: "#333",
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionsData,
      label: {
        show: false, // 隐藏深绿色方块上的数字
      },
    },
    tooltip: {
      position: "top",
      formatter: (params: any) => {
        // 格式化提示信息
        const date = dayjs(params.value[0]).format("YYYY-MM-DD");
        return `${date}<br/>签到状态: ${params.value[1] ? "已签到" : "未签到"}`;
      },
    },
  };

  return (
    <div
      className="calendar-chart-container"
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {year} 年刷题记录
      </h2>{" "}
      {/* 恢复标题 */}
      {loading ? (
        <Spin
          size="large"
          tip="加载中..."
          style={{ display: "flex", justifyContent: "center" }}
        />
      ) : (
        <ReactECharts
          className="calendar-chart"
          option={options}
          style={{ height: "300px" }}
        />
      )}
    </div>
  );
};

export default CalendarChart;
