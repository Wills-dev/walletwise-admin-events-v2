import React, { useState } from "react";

export const useGetCurrentEventChart = () => {
  const [filter, setFilter] = useState("");
  const [areaChartData, setAreaChartData] = useState([]);

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  return { handleFilterChange, filter };
};
