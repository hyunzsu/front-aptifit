"use client";

import { useEffect, useRef, useState } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import { DetailItem } from "@/lib/types";
import { convertTo100Scale } from "@/lib/utils/scoreConversion";
import s from "./ResultChart.module.css";

Chart.register(...registerables);

type ResultChartProps = {
  details: DetailItem[];
};

export default function ResultChart({ details }: ResultChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const chartConfig: ChartConfiguration = {
          type: "bar",
          data: {
            labels: details.map((detail) => detail.field),
            datasets: [
              {
                data: details.map((detail) => convertTo100Scale(detail.score)),
                backgroundColor: isMobile ? "#DEE7FC" : "#7685E5",
                borderColor: isMobile ? "#DEE7FC" : "#7685E5",
                borderWidth: 0,
                borderRadius: 10,
                barThickness: isMobile ? 40 : undefined,
              },
            ],
          },
          options: {
            indexAxis: isMobile ? "y" : "x",
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: { display: false },
                ticks: { display: false },
                border: { display: false },
              },
              y: {
                grid: { display: false },
                ticks: { display: false },
                border: { display: false },
                beginAtZero: true,
                max: 100,
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
            layout: {
              padding: { top: 30, right: 20, bottom: 36, left: 20 }, // bottom padding 증가
            },
          },
          plugins: [
            {
              id: "customLabels",
              afterDatasetsDraw(chart) {
                const ctx = chart.ctx;
                const chartArea = chart.chartArea;
                ctx.save();
                chart.data.datasets[0].data.forEach((datapoint, index) => {
                  const meta = chart.getDatasetMeta(0);
                  const xPos = meta.data[index].x;
                  const yPos = meta.data[index].y;
                  ctx.fillStyle = "#000";
                  ctx.textAlign = "center";
                  ctx.textBaseline = isMobile ? "middle" : "bottom";
                  ctx.font = "bold 16px Arial";
                  if (isMobile) {
                    ctx.fillText(`${datapoint}점`, chartArea.right, yPos);
                    ctx.textAlign = "left";
                    ctx.fillText(
                      chart.data.labels[index] as string,
                      chartArea.left + 13, // 모바일에서 제목 왼쪽에 13px 패딩 추가
                      yPos
                    );
                  } else {
                    ctx.fillText(`${datapoint}점`, xPos, chartArea.top - 10);
                    ctx.fillText(
                      chart.data.labels[index] as string,
                      xPos,
                      chartArea.bottom + 20 + 16 // 16px 추가
                    );
                  }
                });
                ctx.restore();
              },
            },
          ],
        };

        chartInstanceRef.current = new Chart(ctx, chartConfig);
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [details, isMobile]);

  return (
    <div className={s.chartContainer}>
      <canvas ref={chartRef} className={s.chartCanvas} />
    </div>
  );
}
