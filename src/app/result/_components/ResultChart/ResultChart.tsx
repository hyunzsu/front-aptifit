"use client";

import { useEffect, useRef, useState } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import { DetailItem } from "@/lib/types";
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

        const chartConfig: ChartConfiguration<"bar", number[], string> = {
          type: "bar",
          data: {
            labels: details.map((detail) => detail.field),
            datasets: [
              {
                data: details.map((detail) => detail.score),
                backgroundColor: "#7685E5",
                borderColor: "#7685E5",
                hoverBackgroundColor: "#1F4298",
                borderWidth: 0,
                borderRadius: 10,
                barThickness: isMobile ? 20 : undefined,
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
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
            layout: {
              padding: isMobile
                ? { top: 20, right: 80, bottom: 20, left: 10 }
                : { top: 30, right: 20, bottom: 50, left: 20 },
            },
          },
          plugins: [
            {
              id: "customLabels",
              afterDatasetsDraw(chart) {
                const ctx = chart.ctx;
                const chartArea = chart.chartArea;
                ctx.save();

                // 데이터 포인트 및 라벨 그리기
                chart.data.datasets[0].data.forEach((datapoint, index) => {
                  const meta = chart.getDatasetMeta(0);
                  const xPos = meta.data[index].x;
                  const yPos = meta.data[index].y;
                  ctx.fillStyle = "#000";
                  ctx.textAlign = "center";
                  ctx.textBaseline = isMobile ? "middle" : "bottom";
                  ctx.font = "600 16px Pretendard";
                  if (isMobile) {
                    ctx.fillText(`${datapoint}점`, chartArea.right + 30, yPos);
                    ctx.textAlign = "left";
                    const label = chart.data.labels && chart.data.labels[index];
                    if (typeof label === "string") {
                      ctx.fillText(label, chartArea.left + 10, yPos);
                    }
                  } else {
                    ctx.fillText(`${datapoint}점`, xPos, chartArea.top - 10);
                    const label = chart.data.labels && chart.data.labels[index];
                    if (typeof label === "string") {
                      ctx.fillText(label, xPos, chartArea.bottom + 20);
                    }
                  }
                });

                // 설명 텍스트 추가
                ctx.fillStyle = "#666";
                ctx.font = "300 12px Pretendard";
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";
                const description =
                  "여러분의 응답을 100점 만점으로 환산해서 계산한 점수입니다.";

                if (isMobile) {
                  const words = description.split(" ");
                  let line = "";
                  let y = chartArea.bottom + 20;
                  words.forEach((word) => {
                    const testLine = line + word + " ";
                    if (ctx.measureText(testLine).width > chartArea.width) {
                      ctx.fillText(
                        line,
                        chartArea.left + chartArea.width / 2,
                        y
                      );
                      line = word + " ";
                      y += 15;
                    } else {
                      line = testLine;
                    }
                  });
                  ctx.fillText(line, chartArea.left + chartArea.width / 2, y);
                } else {
                  ctx.fillText(
                    description,
                    chartArea.left + chartArea.width / 2,
                    chartArea.bottom + 50
                  );
                }

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
