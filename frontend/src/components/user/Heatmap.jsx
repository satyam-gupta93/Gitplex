import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  while (currentDate <= end) {
    data.push({
      date: currentDate.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 50),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

const getPanelColors = (maxCount) => {
  const colors = { 0: "#161b22" };
  for (let i = 1; i <= maxCount; i++) {
    const intensity = Math.floor((i / maxCount) * 255);
    colors[i] = `rgb(0, ${Math.floor(intensity * 0.6 + 60)}, 0)`;
  }
  return colors;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});

  useEffect(() => {
    const data = generateActivityData("2024-01-01", "2024-12-31");
    setActivityData(data);
    setPanelColors(getPanelColors(Math.max(...data.map((d) => d.count))));
  }, []);

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold text-[#e6edf3] mb-3">
        Recent Contributions
      </h4>
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-4 overflow-x-auto">
        <HeatMap
          style={{ color: "#8b949e", width: "100%" }}
          value={activityData}
          weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          startDate={new Date("2024-01-01")}
          rectSize={12}
          space={3}
          rectProps={{ rx: 2 }}
          panelColors={panelColors}
        />
      </div>
    </div>
  );
};

export default HeatMapProfile;