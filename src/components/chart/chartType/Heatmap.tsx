import cn from "classnames";
import * as d3 from "d3";
import { MutableRefObject, useEffect, useRef } from "react";

import styles from "./styles.module.css";
import { DataColumn, EDataType } from "@/types/table";

type HeatmapProps = {
  columns: DataColumn[];
};

export default function Heatmap({ columns }: HeatmapProps) {
  const rootRef = useRef<SVGSVGElement>() as MutableRefObject<SVGSVGElement>;

  function transformData(columns: DataColumn[]) {
    const transformed: { x: number; y: number }[] = [];
    const xColumn = columns.find((col) => col.dataType === EDataType.NUMBER);
    const yColumn = columns.find((col) => col.dataType === EDataType.NUMBER);

    if (xColumn && yColumn) {
      const xValues = xColumn.value as number[];
      const yValues = yColumn.value as number[];
      for (let i = 0; i < Math.min(xValues.length, yValues.length); i++) {
        transformed.push({ x: xValues[i], y: yValues[i] });
      }
    }

    return transformed;
  }

  async function render(root: SVGSVGElement) {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 460 - margin.top - margin.bottom;

    const svg = d3
      .select(root)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.selectAll("*").remove();

    const data = transformData(columns);

    if (!data.length) return;

    const x = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.x) || 0, d3.max(data, (d) => d.x) || 1])
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.y) || 0, d3.max(data, (d) => d.y) || 1])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .attr("r", 5)
      .style("fill", "steelblue");
  }

  useEffect(() => {
    render(rootRef.current);
  }, [columns]);

  return (
    <div className={cn(styles.heatmap)}>
      <svg className={styles.svgRoot} ref={rootRef} />
    </div>
  );
}
